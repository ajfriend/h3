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
 * The algorithm walks the boundary by tracking position in an 18-element
 * cycle per resolution level. Each cycle encodes 6 edges with 3 child
 * positions each. Transitions between resolution levels are coordinated
 * so the walk produces edges in geometric order around the outline.
 */

#include "gosperIter.h"

#include <stdbool.h>
#include <stdint.h>

#include "h3Index.h"
#include "mathExtensions.h"

// Mapping from 18-element boundary walk positions to H3 digit values.
// 6 groups of 3: each group corresponds to one edge of the hexagon.
static const int8_t base[] = {1, 1, 1, 5, 5, 5, 4, 4, 4,
                              6, 6, 6, 2, 2, 2, 3, 3, 3};

// Sequence of edge directions stored in the H3 reserved bits.
static const int8_t edge_seq[] = {3, 1, 5, 4, 6, 2};

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
static bool stepBoundaryCell(int8_t *I, H3Index *h, int8_t r,
                             int8_t parentRes) {
    int prevDigit = H3_GET_INDEX_DIGIT(*h, r);

    // At transition points, advance the parent resolution first
    if ((r > parentRes + 1) && (I[r] % 3 == r % 2)) {
        bool parentChanged = stepBoundaryCell(I, h, r - 1, parentRes);
        if (parentChanged) {
            I[r] -= 6;
        }
    }

    // Advance to next position: +19 ≡ +1 (mod 18), stays positive after -6
    I[r] = (I[r] + 19) % 18;

    // Update the H3 digit from the base mapping
    int8_t newDigit = base[I[r]];
    H3_SET_INDEX_DIGIT(*h, r, newDigit);

    return newDigit != prevDigit;
}

/**
 * Internal step: advance the boundary cell and update edge direction.
 */
static void stepInternal(IterGosper *iter) {
    H3Index prev = iter->e;
    stepBoundaryCell(iter->_I, &(iter->e), iter->_childRes, iter->_parentRes);

    // When the boundary cell changes, offset the edge index by -2 to
    // account for the new cell's edge alignment relative to the previous.
    if (prev != iter->e) {
        iter->_i -= 2;
    }
    // Advance to next edge: +7 ≡ +1 (mod 6), stays positive after -2
    iter->_i = (iter->_i + 7) % 6;

    H3_SET_RESERVED_BITS(iter->e, edge_seq[iter->_i]);
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
        iter->_i++;
        if (iter->_isPentagon && iter->_i == 1) iter->_i = 2;

        H3_SET_RESERVED_BITS(iter->e, edge_seq[iter->_i]);
    } else {
        // Multi-resolution: walk boundary cells
        stepInternal(iter);
        skipPentagonEdges(iter);
    }
}

IterGosper iterInitGosper(H3Index h, int childRes) {
    int parentRes = H3_EXPORT(getResolution)(h);
    bool pent = H3_EXPORT(isPentagon)(h);

    IterGosper iter = {
        .e = h,
        ._numEdges = 0,
        ._I = {0},
        ._parentRes = parentRes,
        ._childRes = childRes,
        ._i = 0,
        ._isPentagon = pent,
    };

    // Same-resolution fast path: no digit/resolution setup needed
    if (parentRes == childRes) {
        H3_SET_MODE(iter.e, H3_DIRECTEDEDGE_MODE);
        H3_SET_RESERVED_BITS(iter.e, edge_seq[0]);
        iter._numEdges = pent ? 5 : 6;
        return iter;
    }

    // Set resolution to child level and initialize boundary walk
    H3_SET_RESOLUTION(iter.e, childRes);
    for (int r = parentRes + 1; r <= childRes; r++) {
        if (r == parentRes + 1) {
            iter._I[r] = 0;
        } else {
            iter._I[r] = (r % 2 == 0) ? 16 : 14;
        }
        H3_SET_INDEX_DIGIT(iter.e, r, base[iter._I[r]]);
    }

    // Set edge mode and initial direction
    H3_SET_MODE(iter.e, H3_DIRECTEDEDGE_MODE);
    H3_SET_RESERVED_BITS(iter.e, edge_seq[iter._i]);

    // Skip invalid pentagon edges at start
    skipPentagonEdges(&iter);

    // Total edges: faces * 3^(childRes - parentRes)
    int edgesPerFace = pent ? 5 : 6;
    iter._numEdges = edgesPerFace * _ipow(3, childRes - parentRes);

    return iter;
}
