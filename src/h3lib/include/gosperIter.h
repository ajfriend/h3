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
/** @file gosperIter.h
 * @brief Iterator for the directed edges forming the Gosper island outline
 * of a cell's child set at a given resolution.
 */

#ifndef GOSPER_ITER_H
#define GOSPER_ITER_H

#include <stdbool.h>
#include <stdint.h>

#include "h3Index.h"

/**
 * IterGosper: iterator for the directed edges on the boundary of a cell's
 * child set (the Gosper island outline) at a given resolution.
 *
 * Each yielded edge is a directed edge whose origin is a child of the
 * parent cell and whose destination is not. The edges form a closed loop
 * in geometric order around the outline.
 *
 * Constructor:
 *
 * Initialize with `iterInitGosper(cell, childRes)`.
 * Requires `childRes >= getResolution(cell)` and a valid cell.
 *
 * Iteration:
 *
 * Step iterator with `iterStepGosper`.
 * The current edge is accessed via the `.e` member.
 * When the iterator is exhausted, `.e` will be `H3_NULL` even after
 * further calls to `iterStepGosper`.
 */
typedef struct {
    H3Index e;          // Current directed edge (H3_NULL when exhausted)
    int64_t _numEdges;  // Remaining edges to yield

    // Internal state
    int8_t _walkPos[MAX_H3_RES +
                    1];  // Boundary walk position per resolution level
    int8_t _parentRes;
    int8_t _childRes;
    int8_t _edgeIdx;  // Index into edge direction sequence
    bool _isPentagon;
} IterGosper;

IterGosper iterInitGosper(H3Index h, int childRes);
void iterStepGosper(IterGosper *iter);

#endif
