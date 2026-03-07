# GosperIter: Fresh Branch Plan

Reimplement the EdgeIter from the `child_edge_iter` branch on a clean
branch off `master` as `GosperIter`, incorporating improvements observed
in the Zig implementation (`h3cellset/src/edge_iter.zig`).

The name `GosperIter` reflects the geometry: the iterator traces the
Gosper island outline (the boundary of a cell's child set), distinguishing
it from a hypothetical iterator that yields all directed edges (interior
+ boundary).

## Background

The `child_edge_iter` branch has diverged from master and carries scratch
files (`notes.c`, `todo.md`, justfile changes). The algorithm itself is
solid — identical to the proven Zig version — but the C code misses a
couple of cleanups the Zig version got right.

## Files to Create

| File                                        | Description             |
|---------------------------------------------|-------------------------|
| `src/h3lib/include/gosperIter.h`            | Struct + init/step API  |
| `src/h3lib/lib/gosperIter.c`                | Iterator implementation |
| `src/apps/testapps/testGosperIter.c`        | Test suite              |
| `src/apps/benchmarks/benchmarkGosperIter.c` | Benchmark suite         |

## Files to Modify

| File                                 | Change                                |
|--------------------------------------|---------------------------------------|
| `CMakeLists.txt`                     | Add header, source, benchmark entries |
| `CMakeTests.cmake`                   | Add `testGosperIter` test entry       |
| `src/h3lib/include/mathExtensions.h` | Add `MIN` macro (used by test helper) |

## Improvements Over Current Branch

### 1. Same-resolution fast path in `init`

Borrowed from Zig. When `parent_res == child_res`, skip the `I` array
setup, `H3_SET_RESOLUTION`, and digit-setting entirely. Just set mode
and reserved bits on the input cell directly.

```c
if (parent_res == child_res) {
    // No digit setup, resolution change, or I[] init needed
    ei.e = h;
    H3_SET_MODE(ei.e, H3_DIRECTEDEDGE_MODE);
    H3_SET_RESERVED_BITS(ei.e, edge_seq[0]);
    ei.num_edges = is_pentagon ? 5 : 6;
    return ei;
}
```

### 2. Simpler same-resolution stepping

Borrowed from Zig. Replace the cryptic modular-arithmetic loop:

```c
// Before (current branch)
do {
    ei->i = (ei->i + 7) % 6;
} while (ei->is_pentagon && edge_seq[ei->i] == 1);
```

With a straight increment and pentagon skip:

```c
// After
ei->i++;
if (ei->is_pentagon && ei->i == 1) ei->i = 2;
```

This works because `num_edges` guarantees we never wrap past index 5.
Clearer intent, no modular arithmetic for the simple case.

### 3. Drop scratch files

The new branch carries only the iterator itself — no `notes.c`,
`todo.md`, `.gitignore` changes, or `justfile` additions.

## Not Changing

- **API shape**: `init` returns struct, `.e` is current value (`H3_NULL`
  when done), `step` advances. Matches existing `IterCellsChildren`
  convention.
- **Core algorithm**: The boundary walk (`base[18]`, `edge_seq[6]`,
  `+19 mod 18`, `-6` parent adjustment, recursive `step_boundaryCell`)
  is proven correct in both C and Zig with exhaustive testing.
- **Test coverage**: Exhaustive res 0-4 + specific edge sequences +
  loop connectivity + per-edge validity. Already matches the Zig suite.
- **Benchmark coverage**: Same-res through +11 gap, hex and pentagon,
  multiple base resolutions.

## Steps

1. `git checkout master && git checkout -b gosper_iter`
2. Create `gosperIter.h` and `gosperIter.c` with improvements above
3. Create `testGosperIter.c` and `benchmarkGosperIter.c`
4. Update `CMakeLists.txt` and `CMakeTests.cmake`
5. Add `MIN` macro to `mathExtensions.h`
6. Build and run tests: `just build && just test`
