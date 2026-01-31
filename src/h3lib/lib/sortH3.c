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
 * @file sortH3.c
 * @brief Sorting utilities for H3 indexes by lower 52 bits.
 *
 * The lower 52 bits of an H3 index contain the base cell and resolution
 * digits. Sorting by these bits groups siblings together and places
 * children before their parents - properties exploited by the in-place
 * compaction algorithm.
 */

#include "sortH3.h"

#include <string.h>

// ============================================================================
// Comparison functions
// ============================================================================

/**
 * Compare two H3 indexes by their lower 52 bits.
 * Returns true if a < b in this ordering.
 */
bool ltLow52(H3Index a, H3Index b) { return (a << 12) < (b << 12); }

/**
 * Swap two H3 indexes.
 */
static inline void swapH3(H3Index *a, H3Index *b) {
    H3Index tmp = *a;
    *a = *b;
    *b = tmp;
}

// ============================================================================
// Insertion sort (for small arrays and nearly-sorted data)
// ============================================================================

/**
 * Insertion sort for H3 indexes by lower 52 bits.
 * O(n^2) worst case, but O(n) for nearly-sorted data.
 */
void insertionSortLow52(H3Index *arr, int64_t n) {
    for (int64_t i = 1; i < n; i++) {
        H3Index key = arr[i];
        int64_t j = i - 1;
        while (j >= 0 && ltLow52(key, arr[j])) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// ============================================================================
// Quicksort (for general unsorted data)
// ============================================================================

/**
 * Quicksort partition using median-of-three pivot selection.
 */
static int64_t partitionLow52(H3Index *arr, int64_t lo, int64_t hi) {
    int64_t mid = lo + (hi - lo) / 2;

    // Sort lo, mid, hi to find median
    if (ltLow52(arr[mid], arr[lo])) swapH3(&arr[lo], &arr[mid]);
    if (ltLow52(arr[hi], arr[lo])) swapH3(&arr[lo], &arr[hi]);
    if (ltLow52(arr[hi], arr[mid])) swapH3(&arr[mid], &arr[hi]);

    // Use median as pivot, move to hi-1
    swapH3(&arr[mid], &arr[hi - 1]);
    H3Index pivot = arr[hi - 1];

    int64_t i = lo;
    int64_t j = hi - 1;
    for (;;) {
        while (ltLow52(arr[++i], pivot)) {
        }
        while (ltLow52(pivot, arr[--j])) {
        }
        if (i >= j) break;
        swapH3(&arr[i], &arr[j]);
    }
    swapH3(&arr[i], &arr[hi - 1]);
    return i;
}

/**
 * Recursive quicksort with insertion sort for small subarrays.
 */
static void quicksortLow52Recursive(H3Index *arr, int64_t lo, int64_t hi) {
    if (hi - lo < 16) {
        insertionSortLow52(arr + lo, hi - lo + 1);
        return;
    }

    int64_t p = partitionLow52(arr, lo, hi);
    quicksortLow52Recursive(arr, lo, p - 1);
    quicksortLow52Recursive(arr, p + 1, hi);
}

/**
 * Sort H3 indexes by lower 52 bits using quicksort.
 * Uses inline comparison for better performance than qsort.
 */
void quicksortLow52(H3Index *arr, int64_t n) {
    if (n <= 1) return;
    if (n < 16) {
        insertionSortLow52(arr, n);
        return;
    }
    quicksortLow52Recursive(arr, 0, n - 1);
}

// ============================================================================
// Adaptive sort (chooses algorithm based on data characteristics)
// ============================================================================

/**
 * Count adjacent inversions in the array.
 * Stops early if threshold is exceeded.
 * Used to detect nearly-sorted data.
 */
int64_t countInversionsLow52(const H3Index *arr, int64_t n, int64_t threshold) {
    int64_t inversions = 0;
    for (int64_t i = 1; i < n; i++) {
        if (ltLow52(arr[i], arr[i - 1])) {
            inversions++;
            if (inversions > threshold) {
                return inversions;
            }
        }
    }
    return inversions;
}

/**
 * Adaptive sort: chooses the best algorithm based on data characteristics.
 *
 * - If nearly sorted (≤1% inversions): use insertion sort O(n)
 * - Otherwise: use quicksort O(n log n)
 *
 * This is optimal for compaction where input often comes from
 * cellToChildren (already sorted) or polygonToCells (partially sorted).
 */
void adaptiveSortLow52(H3Index *arr, int64_t n) {
    if (n <= 1) return;

    // Check if nearly sorted (≤1% inversions)
    int64_t threshold = n / 100 + 1;
    int64_t inversions = countInversionsLow52(arr, n, threshold);

    if (inversions <= threshold) {
        insertionSortLow52(arr, n);
    } else {
        quicksortLow52(arr, n);
    }
}
