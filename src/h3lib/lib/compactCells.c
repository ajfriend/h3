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
 * This file implements an in-place compaction algorithm that operates
 * directly on the input array, requiring only O(1) additional memory
 * beyond what the sort uses.
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
// Helper functions (optimized for clarity, not speed)
// ============================================================================

/**
 * Check if `cell` is a descendant of `ancestor`.
 * A cell is a descendant if its parent at the ancestor's resolution
 * equals the ancestor.
 */
static bool isDescendantOf(H3Index cell, H3Index ancestor) {
    int cellRes = H3_GET_RESOLUTION(cell);
    int ancestorRes = H3_GET_RESOLUTION(ancestor);

    if (cellRes <= ancestorRes) {
        return false;
    }

    H3Index cellParent;
    H3_EXPORT(cellToParent)(cell, ancestorRes, &cellParent);
    return cellParent == ancestor;
}

/**
 * Compare two cells for the canonicalization phase.
 * Returns:
 *   0 if a == b (same cell)
 *  -1 if a is a descendant of b
 *  +1 if unrelated
 */
static int compareForCanon(H3Index a, H3Index b) {
    if (a == b) return 0;
    if (isDescendantOf(a, b)) return -1;
    return +1;
}

/**
 * Returns the "sequent" cell: the next sibling after `cell`.
 *
 * For a cell with digit d at its resolution, the sequent has digit d+1.
 * Pentagon parents skip digit 1, so their children have digits 0,2,3,4,5,6.
 */
static H3Index nextSibling(H3Index cell) {
    int res = H3_GET_RESOLUTION(cell);
    int digit = H3_GET_INDEX_DIGIT(cell, res);
    int nextDigit = digit + 1;

    // Pentagon parents skip digit 1
    if (nextDigit == 1) {
        H3Index parent;
        H3_EXPORT(cellToParent)(cell, res - 1, &parent);
        if (H3_EXPORT(isPentagon)(parent)) {
            nextDigit = 2;
        }
    }

    H3Index result = cell;
    H3_SET_INDEX_DIGIT(result, res, nextDigit);
    return result;
}

/**
 * Check if `cell` is the "first descendant" of `target`.
 *
 * A first descendant is a cell that:
 * 1. Is a proper descendant of target (finer resolution, same ancestor path)
 * 2. Has all zeros in the digits between target's resolution and its own
 *
 * This matters because first descendants sort immediately after their
 * ancestor in the lower-52-bit ordering, so they can "fill in" for a
 * missing sibling that will be created by compacting the descendants.
 */
static bool isFirstDescendantOf(H3Index cell, H3Index target) {
    int cellRes = H3_GET_RESOLUTION(cell);
    int targetRes = H3_GET_RESOLUTION(target);

    if (cellRes <= targetRes) {
        return false;
    }

    // Check that cell is a descendant of target
    H3Index cellParent;
    H3_EXPORT(cellToParent)(cell, targetRes, &cellParent);
    if (cellParent != target) {
        return false;
    }

    // Check that all digits from targetRes+1 to cellRes are 0
    for (int r = targetRes + 1; r <= cellRes; r++) {
        if (H3_GET_INDEX_DIGIT(cell, r) != 0) {
            return false;
        }
    }

    return true;
}

/**
 * Check if a cell can potentially start a compactable sibling set.
 *
 * A cell can start a set if:
 * 1. It has resolution >= 1 (res 0 cells have no parent)
 * 2. Its digit at its resolution is 0 (it's the first sibling)
 */
static bool canStartSiblingSet(H3Index cell) {
    int res = H3_GET_RESOLUTION(cell);
    if (res < 1) {
        return false;
    }
    return H3_GET_INDEX_DIGIT(cell, res) == 0;
}

/**
 * Check if a cell is the last sibling (digit 6) and thus completes a set.
 */
static bool completesSet(H3Index cell) {
    int res = H3_GET_RESOLUTION(cell);
    return H3_GET_INDEX_DIGIT(cell, res) == 6;
}

/**
 * Get the number of children for a cell (6 for pentagons, 7 for hexagons).
 */
static int numChildren(H3Index cell) {
    return H3_EXPORT(isPentagon)(cell) ? 6 : 7;
}

// ============================================================================
// Phase 2: Canonicalize
// ============================================================================

/**
 * Remove duplicates and descendants from a sorted array.
 *
 * After sorting by lower 52 bits, parents sort AFTER their children.
 * By walking right-to-left, we encounter parents first. Any children
 * we encounter later can be safely removed since their parent already
 * represents the same area.
 */
static void removeDescendants(H3Index *cells, int64_t n) {
    H3Index currentParent = H3_NULL;

    for (int64_t i = n - 1; i >= 0; i--) {
        H3Index cell = cells[i];

        if (cell == H3_NULL) {
            continue;
        }

        if (currentParent == H3_NULL) {
            // First non-null cell becomes the current parent
            currentParent = cell;
        } else {
            int cmp = compareForCanon(cell, currentParent);
            if (cmp == 0 || cmp == -1) {
                // Cell is equal to or a descendant of currentParent
                // Remove it since the parent already covers this area
                cells[i] = H3_NULL;
            } else {
                // Cell is unrelated to currentParent; it becomes the new parent
                currentParent = cell;
            }
        }
    }
}

// ============================================================================
// Phase 3: Compact
// ============================================================================

/**
 * Single-pass compaction.
 *
 * We scan through the sorted cells, looking for complete sets of siblings
 * (7 cells for hexagons, 6 for pentagons) that can be replaced by their parent.
 *
 * The algorithm uses three regions in the array:
 *
 *   | done... | pending... |  junk  | to process... |
 *             ^            ^        ^
 *             i            j        k
 *
 * - cells[0..i)   = "done" - fully compacted, won't change
 * - cells[i..j)   = "pending" - might form a complete set with future cells
 * - cells[j..k)   = junk - can be overwritten
 * - cells[k..n)   = not yet processed
 *
 * Returns the count of compacted cells (stored at positions 0 to j-1).
 */
static int64_t compactSinglePass(H3Index *cells, int64_t n) {
    int64_t i = 0;  // End of "done" region
    int64_t j = 0;  // End of "pending" region
    int64_t k = 0;  // Current cell being processed

    while (k < n) {
        H3Index cur = cells[k];

        // Skip null cells
        if (cur == H3_NULL) {
            k++;
            continue;
        }

        // Case 1: No pending cells
        if (i == j) {
            // Add current cell to pending
            cells[j++] = cur;

            // If this cell can't start a sibling set, move it to done
            if (!canStartSiblingSet(cur)) {
                i = j;
            }
            k++;
            continue;
        }

        // Case 2: We have pending cells - check if cur continues the set
        H3Index top = cells[j - 1];
        H3Index expected = nextSibling(top);

        if (cur == expected) {
            // Current cell is the next sibling - add to pending
            cells[j++] = cur;

            // Check if this completes a sibling set
            if (completesSet(cur)) {
                // Compact: replace the siblings with their parent
                H3Index parent;
                int parentRes = H3_GET_RESOLUTION(cur) - 1;
                H3_EXPORT(cellToParent)(cur, parentRes, &parent);

                // Remove the children from pending
                j -= numChildren(parent);

                // Put the parent back at position k to be processed next
                // (it might complete another set at a coarser resolution)
                cells[k] = parent;
                continue;  // Don't increment k - process the parent
            }
            k++;
            continue;
        }

        if (isFirstDescendantOf(cur, expected)) {
            // Current cell is a first descendant of the expected sibling.
            // Add it to pending - it might compact up to produce the
            // sibling we're waiting for.
            cells[j++] = cur;
            k++;
            continue;
        }

        // Current cell doesn't continue the set - flush pending to done
        i = j;
        // Don't increment k - reconsider this cell with empty pending
    }

    return j;  // Compacted cells are at positions 0 to j-1
}

// ============================================================================
// Public API
// ============================================================================

/**
 * compactCellsInPlace compresses a set of cells in-place by pruning full
 * child branches to the parent level. The input array is modified directly,
 * with compacted cells placed at the front and the new count returned.
 *
 * The cells are sorted by lower 52 bits as a side effect. This ordering
 * places children before parents and groups siblings together.
 *
 * @param h3Set     Set of cells (modified in place)
 * @param numHexes  Input: size of the array. Output: number of compacted cells
 * @return          An error code on failure
 */
H3Error H3_EXPORT(compactCellsInPlace)(H3Index *h3Set, int64_t *numHexes) {
    int64_t n = *numHexes;

    if (n == 0) {
        return E_SUCCESS;
    }

    // Phase 1: Sort by lower 52 bits
    adaptiveSortLow52(h3Set, n);

    // Phase 2: Canonicalize (remove duplicates and descendants)
    removeDescendants(h3Set, n);

    // Phase 3: Compact (single pass)
    *numHexes = compactSinglePass(h3Set, n);

    return E_SUCCESS;
}
