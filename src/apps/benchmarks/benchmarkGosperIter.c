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
#include "benchmark.h"
#include "gosperIter.h"

// Res 2 cells
H3Index hex2 = 0x820887fffffffff;   // res 2 hexagon
H3Index pent2 = 0x820807fffffffff;  // res 2 pentagon

// Res 5 cells
H3Index hex5 = 0x85283473fffffff;   // res 5 hexagon
H3Index pent5 = 0x85080003fffffff;  // res 5 pentagon

// Res 8 cell
H3Index hex8 = 0x8828308281fffff;  // res 8 hexagon

BEGIN_BENCHMARKS();

// +0: same resolution (6 edges for hex, 5 for pent)
BENCHMARK(hex2_plus0, 50000000, {
    IterGosper iter = iterInitGosper(hex2, 2);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus0, 50000000, {
    IterGosper iter = iterInitGosper(pent2, 2);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(hex5_plus0, 50000000, {
    IterGosper iter = iterInitGosper(hex5, 5);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent5_plus0, 50000000, {
    IterGosper iter = iterInitGosper(pent5, 5);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(hex8_plus0, 50000000, {
    IterGosper iter = iterInitGosper(hex8, 8);
    while (iter.e) iterStepGosper(&iter);
});

// +1 (18 edges for hex, 15 for pent)
BENCHMARK(hex2_plus1, 500000, {
    IterGosper iter = iterInitGosper(hex2, 3);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus1, 500000, {
    IterGosper iter = iterInitGosper(pent2, 3);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(hex5_plus1, 500000, {
    IterGosper iter = iterInitGosper(hex5, 6);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent5_plus1, 500000, {
    IterGosper iter = iterInitGosper(pent5, 6);
    while (iter.e) iterStepGosper(&iter);
});

// +2 (54 edges for hex, 45 for pent)
BENCHMARK(hex2_plus2, 100000, {
    IterGosper iter = iterInitGosper(hex2, 4);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus2, 100000, {
    IterGosper iter = iterInitGosper(pent2, 4);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(hex5_plus2, 100000, {
    IterGosper iter = iterInitGosper(hex5, 7);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent5_plus2, 100000, {
    IterGosper iter = iterInitGosper(pent5, 7);
    while (iter.e) iterStepGosper(&iter);
});

// +5 (1458 edges for hex, 1215 for pent)
BENCHMARK(hex2_plus5, 1000, {
    IterGosper iter = iterInitGosper(hex2, 7);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus5, 1000, {
    IterGosper iter = iterInitGosper(pent2, 7);
    while (iter.e) iterStepGosper(&iter);
});

// +8 (39366 edges for hex, 32805 for pent)
BENCHMARK(hex2_plus8, 100, {
    IterGosper iter = iterInitGosper(hex2, 10);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus8, 100, {
    IterGosper iter = iterInitGosper(pent2, 10);
    while (iter.e) iterStepGosper(&iter);
});

// +11 (1062882 edges for hex, 885735 for pent)
BENCHMARK(hex2_plus11, 10, {
    IterGosper iter = iterInitGosper(hex2, 13);
    while (iter.e) iterStepGosper(&iter);
});

BENCHMARK(pent2_plus11, 10, {
    IterGosper iter = iterInitGosper(pent2, 13);
    while (iter.e) iterStepGosper(&iter);
});

END_BENCHMARKS();
