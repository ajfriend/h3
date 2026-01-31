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
/** @file benchmarkCompactAlgos.c
 * @brief Benchmarks comparing compactCells and compactCellsInPlace
 */

#include <stdlib.h>
#include <string.h>

#include "benchmark.h"
#include "h3Index.h"
#include "h3api.h"

// Macro to benchmark compactCells (copies input, uses separate output)
#define BENCHMARK_COMPACT(NAME, ITERS)                                    \
    do {                                                                  \
        BENCHMARK(compact_##NAME, ITERS, {                                \
            H3Index *input = malloc(numCells * sizeof(H3Index));          \
            H3Index *output = malloc(numCells * sizeof(H3Index));         \
            memcpy(input, cells, numCells * sizeof(H3Index));             \
            H3_EXPORT(compactCells)(input, output, numCells);             \
            free(input);                                                  \
            free(output);                                                 \
        });                                                               \
    } while (0)

// Macro to benchmark compactCellsInPlace (modifies input in place)
#define BENCHMARK_COMPACT_INPLACE(NAME, ITERS)                            \
    do {                                                                  \
        BENCHMARK(compactInPlace_##NAME, ITERS, {                         \
            H3Index *input = malloc(numCells * sizeof(H3Index));          \
            memcpy(input, cells, numCells * sizeof(H3Index));             \
            int64_t n = numCells;                                         \
            H3_EXPORT(compactCellsInPlace)(input, &n);                    \
            free(input);                                                  \
        });                                                               \
    } while (0)

BEGIN_BENCHMARKS();

printf("Benchmarking compactCells vs compactCellsInPlace\n");
printf("================================================\n\n");

{
    // Small disk: gridDisk with k=3
    H3Index center = 0x89283470c27ffff;  // Sunnyvale
    int64_t numCells;
    H3_EXPORT(maxGridDiskSize)(3, &numCells);
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    H3_EXPORT(gridDisk)(center, 3, cells);

    printf("Small disk (k=3, %lld cells):\n", (long long)numCells);
    BENCHMARK_COMPACT(smallDisk, 10000);
    BENCHMARK_COMPACT_INPLACE(smallDisk, 10000);
    printf("\n");

    free(cells);
}

{
    // Medium disk: gridDisk with k=9
    H3Index center = 0x89283470c27ffff;
    int64_t numCells;
    H3_EXPORT(maxGridDiskSize)(9, &numCells);
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    H3_EXPORT(gridDisk)(center, 9, cells);

    printf("Medium disk (k=9, %lld cells):\n", (long long)numCells);
    BENCHMARK_COMPACT(mediumDisk, 1000);
    BENCHMARK_COMPACT_INPLACE(mediumDisk, 1000);
    printf("\n");

    free(cells);
}

{
    // Large disk: gridDisk with k=20
    H3Index center = 0x89283470c27ffff;
    int64_t numCells;
    H3_EXPORT(maxGridDiskSize)(20, &numCells);
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    H3_EXPORT(gridDisk)(center, 20, cells);

    printf("Large disk (k=20, %lld cells):\n", (long long)numCells);
    BENCHMARK_COMPACT(largeDisk, 100);
    BENCHMARK_COMPACT_INPLACE(largeDisk, 100);
    printf("\n");

    free(cells);
}

{
    // All children of a res 0 cell at res 4
    H3Index parent = 0x8001fffffffffff;  // Base cell 0
    int childRes = 4;

    int64_t numCells;
    H3_EXPORT(cellToChildrenSize)(parent, childRes, &numCells);
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    H3_EXPORT(cellToChildren)(parent, childRes, cells);

    printf("Children of base cell (res 0->4, %lld cells):\n",
           (long long)numCells);
    BENCHMARK_COMPACT(baseChildren, 100);
    BENCHMARK_COMPACT_INPLACE(baseChildren, 100);
    printf("\n");

    free(cells);
}

{
    // Sparse cells that won't compact much
    int64_t numCells = 100;
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    for (int64_t i = 0; i < numCells; i++) {
        // Different base cells at res 5
        H3Index h;
        setH3Index(&h, 5, i % 122, 0);
        cells[i] = h;
    }

    printf("Sparse cells (100 cells, different base cells):\n");
    BENCHMARK_COMPACT(sparse, 10000);
    BENCHMARK_COMPACT_INPLACE(sparse, 10000);
    printf("\n");

    free(cells);
}

{
    // Pentagon children
    H3Index pentagon = 0x8009fffffffffff;  // Pentagon base cell
    int childRes = 3;

    int64_t numCells;
    H3_EXPORT(cellToChildrenSize)(pentagon, childRes, &numCells);
    H3Index *cells = malloc(numCells * sizeof(H3Index));
    H3_EXPORT(cellToChildren)(pentagon, childRes, cells);

    printf("Pentagon children (res 0->3, %lld cells):\n", (long long)numCells);
    BENCHMARK_COMPACT(pentagon, 1000);
    BENCHMARK_COMPACT_INPLACE(pentagon, 1000);
    printf("\n");

    free(cells);
}

END_BENCHMARKS();
