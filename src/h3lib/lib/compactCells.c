/*
 * Copyright 2025 Uber Technologies, Inc.
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
/**
 * @file compactCells.c
 * @brief In-place cell compaction algorithm.
 *
 * The algorithm has three phases:
 * 1. Sort by lower 52 bits (groups siblings, children before parents)
 * 2. Canonicalize (remove duplicates and descendants)
 * 3. Compact (merge complete sibling sets into parents)
 */

#include "h3Index.h"
#include "h3api.h"
#include "sortH3.h"

// ============================================================================
// Helpers
// ============================================================================

/** Get parent at a specific resolution (returns the cell, not an error). */
static H3Index getParent(H3Index cell, int parentRes) {
    H3Index out;
    H3_EXPORT(cellToParent)(cell, parentRes, &out);
    return out;
}

/** Return cell with digit at resolution r changed to d. */
static H3Index withDigit(H3Index cell, int r, int d) {
    H3_SET_INDEX_DIGIT(cell, r, d);
    return cell;
}

/**
 * Rich comparison for ancestor/descendant relationship.
 *   0 if a == b
 *  -1 if a is a descendant of b
 *  +1 if unrelated
 */
static int cmp_canon(H3Index a, H3Index b) {
    if (a == b) return 0;

    int resA = H3_GET_RESOLUTION(a);
    int resB = H3_GET_RESOLUTION(b);

    if (resA > resB && getParent(a, resB) == b) return -1;

    return +1;
}

static bool is_descendant(H3Index child, H3Index parent) {
    int cmp = cmp_canon(child, parent);
    return cmp == 0 || cmp == -1;
}

/** The next sibling (cell with next digit). Skips digit 1 for pentagons. */
static H3Index next_sibling(H3Index cell) {
    int r = H3_GET_RESOLUTION(cell);
    int next = H3_GET_INDEX_DIGIT(cell, r) + 1;

    if (next == 1 && H3_EXPORT(isPentagon)(getParent(cell, r - 1))) {
        next = 2;
    }

    return withDigit(cell, r, next);
}

/** Can this cell start a compactable sibling set? (res >= 1, digit 0) */
static bool is_first_child(H3Index cell) {
    int r = H3_GET_RESOLUTION(cell);
    return r >= 1 && H3_GET_INDEX_DIGIT(cell, r) == 0;
}

/** Is this cell the last sibling? (digit 6) */
static bool is_last_child(H3Index cell) {
    int r = H3_GET_RESOLUTION(cell);
    return H3_GET_INDEX_DIGIT(cell, r) == 6;
}

/** Get immediate parent (one resolution coarser). */
static H3Index parent(H3Index cell) {
    return getParent(cell, H3_GET_RESOLUTION(cell) - 1);
}

/** Number of children (6 for pentagons, 7 for hexagons). */
static int num_children(H3Index cell) {
    return H3_EXPORT(isPentagon)(cell) ? 6 : 7;
}

/** Is cur the first descendant of target? (descendant with all-zero path) */
static bool is_first_descendant_of(H3Index cur, H3Index target) {
    if (cmp_canon(cur, target) != -1) return false;

    int targetRes = H3_GET_RESOLUTION(target);
    int curRes = H3_GET_RESOLUTION(cur);

    for (int r = targetRes + 1; r <= curRes; r++) {
        if (H3_GET_INDEX_DIGIT(cur, r) != 0) return false;
    }
    return true;
}

// ============================================================================
// Phase 2: Canonicalize
// ============================================================================

/**
 * Remove duplicates and descendants.
 * Walking right-to-left, parents come first; remove any children we see.
 */
static void remove_descendants(H3Index *cells, int64_t n) {
    H3Index ancestor = H3_NULL;

    for (int64_t i = n - 1; i >= 0; i--) {
        if (cells[i] == H3_NULL) continue;

        if (ancestor == H3_NULL) {
            ancestor = cells[i];
        } else if (is_descendant(cells[i], ancestor)) {
            cells[i] = H3_NULL;
        } else {
            ancestor = cells[i];
        }
    }
}

// ============================================================================
// Phase 3: Compact
// ============================================================================

/**
 * Single-pass compaction.
 *
 * | done... | pending... |  junk  | to process... |
 *           ^            ^        ^
 *           i            j        k
 */
static int64_t compact_single_pass(H3Index *cells, int64_t n) {
    int64_t i = 0;  // end of "done"
    int64_t j = 0;  // end of "pending"
    int64_t k = 0;  // next to process

    while (k < n) {
        H3Index cur = cells[k];

        // Skip over 0 (H3_NULL) values
        if (cur == H3_NULL) {
            k++;
            continue;
        }

        // Try to extend pending set
        if (i < j) {
            H3Index sib = next_sibling(cells[j - 1]);
            if (cur == sib) {
                cells[j++] = cur;  // Add to pending.
                if (is_last_child(cur)) {
                    // Compact siblings, replace with parent
                    H3Index p = parent(cur);
                    cells[k] = p;          // Put parent as next "to process".
                    j -= num_children(p);  // Clear these children from pending.
                } else {
                    // Middle sibling, move along.
                    k++;
                }
                continue;
            } else if (is_first_descendant_of(cur, sib)) {
                cells[j++] = cur;  // Add to pending.
                k++;
                continue;
            } else {
                // `cur` is not the next sibling or descendent of.
                i = j;  // Flush the pending stack.
                // Consider `cur` below.
            }
        }

        // If here, pending stack is empty.
        // Start new potential sibling set.
        cells[j++] = cur;
        // If not a first child, flush immediately.
        if (!is_first_child(cur)) i = j;
        k++;
    }

    return j;
}

// ============================================================================
// Public API
// ============================================================================

H3Error H3_EXPORT(compactCellsInPlace)(H3Index *h3Set, int64_t *numHexes) {
    int64_t n = *numHexes;

    if (n == 0) return E_SUCCESS;

    adaptiveSortLow52(h3Set, n);                // Phase 1: Sort
    remove_descendants(h3Set, n);               // Phase 2: Canonicalize
    *numHexes = compact_single_pass(h3Set, n);  // Phase 3: Compact

    return E_SUCCESS;
}
