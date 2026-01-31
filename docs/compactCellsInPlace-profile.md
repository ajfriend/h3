# compactCellsInPlace Performance Profile

## Algorithm Phases

The in-place compaction algorithm has four phases:

1. **Inversion count** - O(n) scan counting inversions (early exit at 1% threshold)
2. **Adaptive sort** - insertion sort if ≤1% inversions, else custom quicksort
3. **Canonicalize** - remove duplicates and descendants (single right-to-left pass)
4. **Compact** - merge complete sibling sets into parents (single left-to-right pass)

## Profiling Results

### With sorted-input detection (current)

| Dataset | n | Check | Sort | Canon | Compact | Total |
|---------|--:|------:|-----:|------:|--------:|------:|
| Small disk (k=3) | 37 | 0.0µs | 0.3µs (67%) | 0.0µs | 0.1µs | 0.4µs |
| Medium disk (k=9) | 271 | 0.0µs | 3.4µs (81%) | 0.2µs | 0.6µs | 4.2µs |
| Large disk (k=20) | 1,261 | 0.0µs | 24µs (87%) | 0.8µs | 2.9µs | 27.7µs |
| Base cell children | 2,401 | 0.7µs | **0.1µs (1%)** | 1.3µs | 5.2µs | **7.2µs** |
| Colorado (res 7) | 47,823 | 0.0µs | 2740µs (96%) | 25.7µs | 102µs | 2868µs |

### Benchmark vs original compactCells

| Dataset | compactCells | compactCellsInPlace | Winner |
|---------|-------------:|--------------------:|--------|
| Base cell children (sorted) | 13.8µs | **10.0µs** | In-place 1.4x faster |
| Pentagon children (sorted) | 1.9µs | **1.3µs** | In-place 1.4x faster |
| Sparse cells | 0.76µs | **0.61µs** | In-place 1.2x faster |
| Colorado (unsorted) | **381µs** | 2055µs | Original 5.4x faster |

## Key Findings

1. **Sorted input is now fast** - O(n) inversion count with 1% threshold detects sorted input and uses insertion sort. This makes in-place **faster than the original** for sorted/sparse cases.

2. **Unsorted input improved** - Custom quicksort (no function pointer overhead) reduced Colorado from 7.9x to 5.4x slower than original. Still O(n log n) vs O(n) hash-based.

3. **Data has structure** - Colorado from `polygonToCells` has 42% inversions and 20K runs (avg length 2.4). Not random, but runs too short for timsort to exploit effectively.

## Implementation Notes

- Inversion count with early exit is cheap (~1µs for 48K cells at 1% threshold)
- Custom quicksort avoids function pointer overhead, ~32% faster than libc qsort
- Timsort was tested but slower for short-run data; simpler adaptive approach chosen
- For sorted input, in-place now beats the hash-based original algorithm

## Optimization Opportunities

### Implemented ✓
- **Adaptive sort selection** - O(n) inversion count, insertion sort for ≤1% inversions
- **Custom quicksort** - Inline comparisons, ~32% faster than libc qsort

### Potential Future Work
- **Sort at source** - Have `polygonToCells` output in sorted order
- **Bucket by base cell** - 122 buckets could improve cache locality for unsorted input
- **Radix sort for very large n** - May beat quicksort for n > 100K

## Reproducing

```bash
# Build the library
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build

# Build and run the profiler
cc -O2 -I build/src/h3lib/include -I src/h3lib/include \
   profile_compact.c build/lib/libh3.a -o profile_compact
./profile_compact

# Run the benchmark
./build/bin/benchmarkCompactAlgos
```
