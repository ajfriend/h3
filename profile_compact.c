/*
 * Profile compactCellsInPlace phases
 * Compile: cc -O2 -I build/src -I src/h3lib/include profile_compact.c build/lib/libh3.a -o profile_compact
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "h3api.h"
#include "h3Index.h"

static double getTimeUs(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000000.0 + ts.tv_nsec / 1000.0;
}

// Replicate the phases from h3Index.c to profile separately

static int cmpLow52(const void *a, const void *b) {
    H3Index ha = *(const H3Index *)a << 12;
    H3Index hb = *(const H3Index *)b << 12;
    return (ha > hb) - (ha < hb);
}

// Fast inline parent computation
static inline H3Index fastParent(H3Index h, int parentRes) {
    H3Index parent = (h & 0xFFF0FFFFFFFFFFFFULL) | ((uint64_t)parentRes << 52);
    int numBits = (15 - parentRes) * 3;
    uint64_t mask = (1ULL << numBits) - 1;
    return parent | mask;
}

static inline int isDescendant(H3Index cell, int cellRes, H3Index ancestor,
                               int ancestorRes) {
    if (cellRes <= ancestorRes) return 0;
    return fastParent(cell, ancestorRes) == ancestor;
}

static inline int cmpCanon(H3Index a, int resA, H3Index b, int resB) {
    if (a == b) return 0;
    if (isDescendant(a, resA, b, resB)) return -1;
    return +1;
}

static void removeDescendants(H3Index *cells, int64_t n) {
    H3Index parent = 0;
    int parentRes = 0;

    for (int64_t i = n - 1; i >= 0; i--) {
        if (cells[i] == 0) continue;

        H3Index cell = cells[i];
        int cellRes = H3_GET_RESOLUTION(cell);

        if (parent == 0) {
            parent = cell;
            parentRes = cellRes;
        } else {
            int cmp = cmpCanon(cell, cellRes, parent, parentRes);
            if (cmp == 0 || cmp == -1) {
                cells[i] = 0;
            } else {
                parent = cell;
                parentRes = cellRes;
            }
        }
    }
}

// Pentagon base cells
static const int pentagonBaseCells[] = {4, 14, 24, 38, 49, 58, 63, 72, 83, 97,
                                        107, 117};

static inline int isBaseCellPent(int bc) {
    for (int i = 0; i < 12; i++) {
        if (pentagonBaseCells[i] == bc) return 1;
    }
    return 0;
}

static inline int isPentagonFast(H3Index h, int res) {
    int bc = H3_GET_BASE_CELL(h);
    if (!isBaseCellPent(bc)) return 0;
    if (res == 0) return 1;
    int lowBit = (15 - res) * 3;
    int numBits = res * 3;
    uint64_t mask = ((1ULL << numBits) - 1) << lowBit;
    return (h & mask) == 0;
}

static inline H3Index sequent(H3Index cell, int res) {
    int digit = H3_GET_INDEX_DIGIT(cell, res);
    int nextDigit = digit + 1;
    if (nextDigit == 1) {
        H3Index parent = fastParent(cell, res - 1);
        if (isPentagonFast(parent, res - 1)) {
            nextDigit = 2;
        }
    }
    H3Index result = cell;
    H3_SET_INDEX_DIGIT(result, res, nextDigit);
    return result;
}

static inline int isFirstDescendantOf(H3Index cur, int curRes, H3Index seq,
                                      int seqRes) {
    if (curRes <= seqRes) return 0;
    if (fastParent(cur, seqRes) != seq) return 0;
    int lowBit = (15 - curRes) * 3;
    int highBit = (15 - seqRes - 1) * 3 + 2;
    int numBits = highBit - lowBit + 1;
    uint64_t mask = ((1ULL << numBits) - 1) << lowBit;
    return (cur & mask) == 0;
}

static int64_t compactSinglePass(H3Index *cells, int64_t n) {
    int64_t i = 0, j = 0, k = 0;
    H3Index lastPending = 0;
    int lastPendingRes = 0;

    while (k < n) {
        if (cells[k] == 0) {
            k++;
            continue;
        }

        H3Index cur = cells[k];
        int curRes = H3_GET_RESOLUTION(cur);

        if (i == j) {
            cells[j] = cur;
            j++;
            lastPending = cur;
            lastPendingRes = curRes;
            if (curRes < 1 || H3_GET_INDEX_DIGIT(cur, curRes) != 0) {
                i = j;
            }
            k++;
            continue;
        }

        H3Index seq = sequent(lastPending, lastPendingRes);

        if (cur == seq) {
            cells[j] = cur;
            j++;
            lastPending = cur;
            lastPendingRes = curRes;

            int digit = H3_GET_INDEX_DIGIT(cur, curRes);
            if (digit == 6) {
                int parentRes = curRes - 1;
                H3Index parent = fastParent(cur, parentRes);
                int numChildren = isPentagonFast(parent, parentRes) ? 6 : 7;
                j -= numChildren;
                cells[k] = parent;
                if (j > i) {
                    lastPending = cells[j - 1];
                    lastPendingRes = H3_GET_RESOLUTION(lastPending);
                }
                continue;
            }
            k++;
            continue;
        }

        if (isFirstDescendantOf(cur, curRes, seq, lastPendingRes)) {
            cells[j] = cur;
            j++;
            lastPending = cur;
            lastPendingRes = curRes;
            k++;
            continue;
        }

        i = j;
    }

    return j;
}

static int isSortedLow52(const H3Index *arr, int64_t n) {
    for (int64_t i = 1; i < n; i++) {
        if ((arr[i] << 12) < (arr[i - 1] << 12)) return 0;
    }
    return 1;
}

void profileCompact(const char *name, H3Index *cells, int64_t n, int iters) {
    double checkTotal = 0, sortTotal = 0, canonTotal = 0, compactTotal = 0;
    int wasSorted = 0;

    for (int iter = 0; iter < iters; iter++) {
        H3Index *copy = malloc(n * sizeof(H3Index));
        memcpy(copy, cells, n * sizeof(H3Index));

        double t0 = getTimeUs();
        int sorted = isSortedLow52(copy, n);
        double t1 = getTimeUs();
        if (!sorted) {
            qsort(copy, n, sizeof(H3Index), cmpLow52);
        } else {
            wasSorted = 1;
        }
        double t2 = getTimeUs();
        removeDescendants(copy, n);
        double t3 = getTimeUs();
        compactSinglePass(copy, n);
        double t4 = getTimeUs();

        checkTotal += t1 - t0;
        sortTotal += t2 - t1;
        canonTotal += t3 - t2;
        compactTotal += t4 - t3;

        free(copy);
    }

    double total = checkTotal + sortTotal + canonTotal + compactTotal;
    printf("%-30s n=%-8lld check=%5.1fus sort=%6.1fus (%5.1f%%) "
           "canon=%5.1fus compact=%5.1fus total=%6.1fus %s\n",
           name, (long long)n, checkTotal / iters, sortTotal / iters,
           sortTotal / total * 100, canonTotal / iters, compactTotal / iters,
           total / iters, wasSorted ? "[SORTED]" : "");
}

// Count natural runs and measure "sortedness"
void analyzeSortedness(const char *name, H3Index *cells, int64_t n) {
    int64_t runs = 1;
    int64_t inversions = 0;
    int64_t maxRun = 1, currentRun = 1;

    for (int64_t i = 1; i < n; i++) {
        if ((cells[i] << 12) >= (cells[i - 1] << 12)) {
            currentRun++;
        } else {
            inversions++;
            if (currentRun > maxRun) maxRun = currentRun;
            currentRun = 1;
            runs++;
        }
    }
    if (currentRun > maxRun) maxRun = currentRun;

    printf("%-30s n=%-8lld runs=%-6lld maxRun=%-6lld inversions=%-6lld (%.2f%%)\n",
           name, (long long)n, (long long)runs, (long long)maxRun,
           (long long)inversions, (double)inversions / n * 100);
}

int main(void) {
    printf("Phase profiling for compactCellsInPlace\n");
    printf("========================================\n\n");

    printf("Sortedness analysis:\n");

    // Small disk k=3
    {
        H3Index center = 0x89283470c27ffff;
        int64_t n;
        H3_EXPORT(maxGridDiskSize)(3, &n);
        H3Index *cells = malloc(n * sizeof(H3Index));
        H3_EXPORT(gridDisk)(center, 3, cells);
        analyzeSortedness("Small disk (k=3)", cells, n);
        profileCompact("Small disk (k=3)", cells, n, 1000);
        free(cells);
    }

    // Medium disk k=9
    {
        H3Index center = 0x89283470c27ffff;
        int64_t n;
        H3_EXPORT(maxGridDiskSize)(9, &n);
        H3Index *cells = malloc(n * sizeof(H3Index));
        H3_EXPORT(gridDisk)(center, 9, cells);
        analyzeSortedness("Medium disk (k=9)", cells, n);
        free(cells);
    }

    // Large disk k=20
    {
        H3Index center = 0x89283470c27ffff;
        int64_t n;
        H3_EXPORT(maxGridDiskSize)(20, &n);
        H3Index *cells = malloc(n * sizeof(H3Index));
        H3_EXPORT(gridDisk)(center, 20, cells);
        analyzeSortedness("Large disk (k=20)", cells, n);
        free(cells);
    }

    // Base cell children res 4
    {
        H3Index parent = 0x8001fffffffffff;
        int64_t n;
        H3_EXPORT(cellToChildrenSize)(parent, 4, &n);
        H3Index *cells = malloc(n * sizeof(H3Index));
        H3_EXPORT(cellToChildren)(parent, 4, cells);
        analyzeSortedness("Base cell children (res 0->4)", cells, n);
        free(cells);
    }

    // Colorado at res 7
    {
        LatLng verts[] = {{0.6457718, -1.9024089}, {0.6457718, -1.7802358},
                          {0.7155850, -1.7802358}, {0.7155850, -1.9024089}};
        GeoPolygon polygon = {.numHoles = 0,
                              .holes = NULL,
                              .geoloop = {.numVerts = 4, .verts = verts}};
        int64_t maxCells;
        H3_EXPORT(maxPolygonToCellsSize)(&polygon, 7, 0, &maxCells);
        H3Index *cells = calloc(maxCells, sizeof(H3Index));
        H3_EXPORT(polygonToCells)(&polygon, 7, 0, cells);

        int64_t n = 0;
        for (int64_t i = 0; i < maxCells; i++) {
            if (cells[i] != 0) cells[n++] = cells[i];
        }
        cells = realloc(cells, n * sizeof(H3Index));

        analyzeSortedness("Colorado (res 7)", cells, n);
        free(cells);
    }

    printf("\nTiming:\n");

    // Re-run with timing for key datasets
    {
        H3Index parent = 0x8001fffffffffff;
        int64_t n;
        H3_EXPORT(cellToChildrenSize)(parent, 4, &n);
        H3Index *cells = malloc(n * sizeof(H3Index));
        H3_EXPORT(cellToChildren)(parent, 4, cells);
        profileCompact("Base cell children (res 0->4)", cells, n, 100);
        free(cells);
    }

    {
        LatLng verts[] = {{0.6457718, -1.9024089}, {0.6457718, -1.7802358},
                          {0.7155850, -1.7802358}, {0.7155850, -1.9024089}};
        GeoPolygon polygon = {.numHoles = 0,
                              .holes = NULL,
                              .geoloop = {.numVerts = 4, .verts = verts}};
        int64_t maxCells;
        H3_EXPORT(maxPolygonToCellsSize)(&polygon, 7, 0, &maxCells);
        H3Index *cells = calloc(maxCells, sizeof(H3Index));
        H3_EXPORT(polygonToCells)(&polygon, 7, 0, cells);

        int64_t n = 0;
        for (int64_t i = 0; i < maxCells; i++) {
            if (cells[i] != 0) cells[n++] = cells[i];
        }
        cells = realloc(cells, n * sizeof(H3Index));

        profileCompact("Colorado (res 7)", cells, n, 10);
        free(cells);
    }

    return 0;
}
