# Experimental Branch: In-Place H3 Compaction

> *This branch and README were generated with the help of Claude Code.*

**Branch:** `aj/new_compact`

This is an experimental branch exploring an alternative in-place compaction
algorithm for H3 cells. **It did not beat the existing hash-table implementation**
for general inputs, but the approach has some useful properties and is preserved
here for future reference.

## The Idea

Once we sort a set of H3 cells by their lower 52 bits, we can compact them in a
single pass. The lower 52 bit ordering has useful properties:
- Children sort before their parents
- Siblings are contiguous
- Zero values (`H3_NULL`) sort first

This enables a three-phase algorithm:
1. **Sort** by lower 52 bits
2. **Canonicalize**: remove duplicates and descendants (single right-to-left pass)
3. **Compact**: merge sibling sets into parents (single left-to-right pass)

The compaction cascades automatically — when 7 siblings merge into a parent,
that parent is reprocessed and may complete another sibling set at a coarser
resolution.

## Performance

Profiling showed that **95% of runtime is spent sorting** for unsorted inputs.
Since sorting is O(n log n) and hash tables are O(n), we can't beat the existing
approach for general data — but we tried several sorting strategies:

| Approach | Result |
|----------|--------|
| `qsort()` (libc) | Baseline, function pointer overhead |
| Custom quicksort | ~32% faster than qsort (inlined comparison) |
| Timsort | Rejected — exploits sorted "runs", but real data had avg run length of 2.4 (no structure to exploit) |
| Adaptive sort | Best compromise — checks sortedness first, uses insertion sort if ≤1% inversions |

### Benchmarks (Apple M3)

| Test Case | `compactCells` (hash) | `compactCellsInPlace` (sort) | Winner |
|-----------|----------------------|------------------------------|--------|
| Small disk (37 cells) | 0.32 µs | 0.22 µs | **In-place** |
| Medium disk (271 cells) | 1.81 µs | 2.24 µs | Hash |
| Large disk (1261 cells) | 8.47 µs | 11.95 µs | Hash |
| Base cell children (2401 cells) | 14.11 µs | 11.99 µs | **In-place** |
| Sparse cells (100 cells) | 0.79 µs | 0.70 µs | **In-place** |
| Pentagon children (286 cells) | 1.93 µs | 1.49 µs | **In-place** |
| Colorado polygon (47823 cells) | 378 µs | 2053 µs | Hash |

**Takeaway**: In-place wins when data is already sorted (e.g., from `cellToChildren`)
or very small. It loses on large unsorted inputs like polygon fills (~5x slower on Colorado).

## What It's Still Good For

Despite being slower overall, this approach has properties the hash-table
version lacks:

- **Canonical output**: cells end up in sorted order, useful for comparisons
- **Handles duplicates**: gracefully removes redundant cells
- **Handles ancestors**: removes cells whose ancestors are also present
- **In-place**: O(1) additional memory (beyond the sort)
- **Idempotent**: running twice produces the same result
- **Fast for sorted input**: if your cells come from `cellToChildren`, this approach will typically be faster

## Files Changed

- `src/h3lib/lib/compactCells.c` — the in-place compaction algorithm
- `src/h3lib/lib/sortH3.c` — sorting utilities (quicksort, insertion sort, adaptive)
- `src/h3lib/include/sortH3.h` — header for sorting utilities
- `CMakeLists.txt` — added new source files

## Building and Testing

```bash
# Build
just build

# Run compact-specific tests
just test-compact

# Run benchmarks
just bench
```

## Related

- Blog post: [A Failed Attempt at Improving H3 Compaction](/blog/h3_compact/)
- [H3 Bit Layout](/blog/h3_bits/) — understanding the lower 52 bit ordering
