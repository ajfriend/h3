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
 * @file sortH3.h
 * @brief Sorting utilities for H3 indexes by lower 52 bits.
 */

#ifndef SORTH3_H
#define SORTH3_H

#include <stdbool.h>
#include <stdint.h>

#include "h3api.h"

/** Compare two H3 indexes by lower 52 bits. Returns true if a < b. */
bool ltLow52(H3Index a, H3Index b);

/** Insertion sort - O(n) for nearly-sorted data. */
void insertionSortLow52(H3Index *arr, int64_t n);

/** Quicksort - O(n log n) general-purpose sort. */
void quicksortLow52(H3Index *arr, int64_t n);

/** Count adjacent inversions, stopping early at threshold. */
int64_t countInversionsLow52(const H3Index *arr, int64_t n, int64_t threshold);

/** Adaptive sort - chooses best algorithm based on data. */
void adaptiveSortLow52(H3Index *arr, int64_t n);

#endif
