/*
 * Copyright 2026 Uber Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** @file gosperIter.c
 * @brief Iterator for the directed edges forming the Gosper island outline
 * of a cell's child set at a given resolution.
 *
 * The boundary of a cell's children at resolution R forms a closed loop of
 * directed edges (the Gosper island). For a hexagon this is 6 * 3^(R - r)
 * edges; for a pentagon, 5 * 3^(R - r).
 *
 * ## Geometric model
 *
 * A hexagon has 6 faces. Each face's boundary segment subdivides into 3
 * segments at the next finer resolution (the Gosper fractal property).
 * This gives 6 × 3 = 18 walk positions per resolution level.
 *
 * The `walk_digit` table maps these 18 positions to H3 digit values:
 * the 6 non-center digits {1,5,4,6,2,3} in geometric order around the
 * hexagon, each repeated 3× for the subdivision.
 *
 * The `edge_dir` table maps 6 edge indices to H3 edge direction values,
 * also in geometric order around the hexagon.
 *
 * ## Multi-resolution coordination
 *
 * For gaps > 1 resolution level, each level maintains its own walk
 * position. The levels coordinate via recursive advancement: when a
 * child level reaches a face boundary (a transition between groups of
 * 3), it first advances its parent level. If the parent's digit changed,
 * the child rewinds by 6 positions (one face group) to stay aligned.
 */

#include "gosperIter.h"

#include <stdbool.h>
#include <stdint.h>

#include "h3Index.h"
#include "mathExtensions.h"

// H3 digit at each of the 18 boundary walk positions.
// The 6 non-center digits {1,5,4,6,2,3} in geometric order around the
// hexagon, each repeated 3× for the fractal subdivision at each face.
static const int8_t walk_digit[] = {1, 1, 1, 5, 5, 5, 4, 4, 4,
                                    6, 6, 6, 2, 2, 2, 3, 3, 3};

// H3 edge direction at each edge index, in geometric order around the
// hexagon. Stored in the directed edge's reserved bits.
static const int8_t edge_dir[] = {3, 1, 5, 4, 6, 2};

/**
 * Advance the boundary walk at resolution r.
 *
 * The walk cycles through 18 positions per resolution level (6 edges x 3
 * children each). At transition points between groups of 3, the parent
 * resolution is advanced first, and the current position is offset by -6
 * to stay aligned.
 *
 * @return true if the H3 digit at this resolution changed.
 */
static bool stepBoundaryCell(int8_t *walkPos, H3Index *h, int8_t r,
                             int8_t parentRes) {
    int prevDigit = H3_GET_INDEX_DIGIT(*h, r);

    // At transition points, advance the parent resolution first
    if ((r > parentRes + 1) && (walkPos[r] % 3 == r % 2)) {
        bool parentChanged = stepBoundaryCell(walkPos, h, r - 1, parentRes);
        if (parentChanged) {
            // Parent digit changed → new face. Rewind one face group.
            walkPos[r] -= 6;
        }
    }

    // Advance to next position: +19 ≡ +1 (mod 18), stays positive after -6
    walkPos[r] = (walkPos[r] + 19) % 18;

    // Update the H3 digit from the base mapping
    int8_t newDigit = walk_digit[walkPos[r]];
    H3_SET_INDEX_DIGIT(*h, r, newDigit);

    return newDigit != prevDigit;
}

/**
 * Internal step: advance the boundary cell and update edge direction.
 */
static void stepInternal(IterGosper *iter) {
    H3Index prev = iter->e;
    stepBoundaryCell(iter->_walkPos, &(iter->e), iter->_childRes,
                     iter->_parentRes);

    // When the walk moves to a new cell, its edges are rotated ~120°
    // relative to the previous cell — offset by 2 edge positions.
    if (prev != iter->e) {
        iter->_edgeIdx -= 2;
    }
    // Advance to next edge: +7 ≡ +1 (mod 6), stays positive after -2
    iter->_edgeIdx = (iter->_edgeIdx + 7) % 6;

    H3_SET_RESERVED_BITS(iter->e, edge_dir[iter->_edgeIdx]);
}

/**
 * Skip edges at pentagon vertex 1 (the K-axis), which don't exist.
 */
static void skipPentagonEdges(IterGosper *iter) {
    while (iter->_isPentagon && iter->e != H3_NULL &&
           H3_GET_INDEX_DIGIT(iter->e, iter->_parentRes + 1) == 1) {
        stepInternal(iter);
    }
}

void iterStepGosper(IterGosper *iter) {
    if (iter->e == H3_NULL) return;

    iter->_numEdges--;
    if (iter->_numEdges <= 0) {
        iter->e = H3_NULL;
        return;
    }

    if (iter->_parentRes == iter->_childRes) {
        // Same-resolution: simple increment with pentagon skip
        iter->_edgeIdx++;
        if (iter->_isPentagon && iter->_edgeIdx == 1) iter->_edgeIdx = 2;

        H3_SET_RESERVED_BITS(iter->e, edge_dir[iter->_edgeIdx]);
    } else {
        // Multi-resolution: walk boundary cells
        stepInternal(iter);
        skipPentagonEdges(iter);
    }
}

IterGosper iterInitGosper(H3Index h, int childRes) {
    int parentRes = H3_GET_RESOLUTION(h);
    bool pent = H3_EXPORT(isPentagon)(h);

    IterGosper iter = {
        .e = h,
        ._numEdges = 0,
        ._walkPos = {0},
        ._parentRes = parentRes,
        ._childRes = childRes,
        ._edgeIdx = 0,
        ._isPentagon = pent,
    };

    // Same-resolution fast path: no digit/resolution setup needed
    if (parentRes == childRes) {
        H3_SET_MODE(iter.e, H3_DIRECTEDEDGE_MODE);
        H3_SET_RESERVED_BITS(iter.e, edge_dir[0]);
        iter._numEdges = pent ? 5 : 6;
        return iter;
    }

    // Set resolution to child level and initialize boundary walk.
    // The first child level starts at walk position 0. Deeper levels
    // start pre-wound so the first stepBoundaryCell lands them at the
    // correct starting position. Even/odd distinction matches H3's
    // alternating Class II/III orientations: 16 = 18-2, 14 = 18-4.
    H3_SET_RESOLUTION(iter.e, childRes);
    for (int r = parentRes + 1; r <= childRes; r++) {
        if (r == parentRes + 1) {
            iter._walkPos[r] = 0;
        } else {
            iter._walkPos[r] = (r % 2 == 0) ? 16 : 14;
        }
        H3_SET_INDEX_DIGIT(iter.e, r, walk_digit[iter._walkPos[r]]);
    }

    // Set edge mode and initial direction
    H3_SET_MODE(iter.e, H3_DIRECTEDEDGE_MODE);
    H3_SET_RESERVED_BITS(iter.e, edge_dir[iter._edgeIdx]);

    // Skip invalid pentagon edges at start
    skipPentagonEdges(&iter);

    // Total edges: faces * 3^(childRes - parentRes)
    int edgesPerFace = pent ? 5 : 6;
    iter._numEdges = edgesPerFace * _ipow(3, childRes - parentRes);

    return iter;
}
