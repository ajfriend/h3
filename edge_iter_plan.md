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
solid -- identical to the proven Zig version -- but the C code misses a
couple of cleanups the Zig version got right.

## Naming Convention

Follow the existing iterator naming pattern from `iterators.h`:

| Existing               | GosperIter                    |
|------------------------|-------------------------------|
| `IterCellsChildren`    | `IterGosper`                  |
| `iterInitParent(h, r)` | `iterInitGosper(h, childRes)` |
| `iterStepChild(&iter)` | `iterStepGosper(&iter)`       |
| `.h` (current cell)    | `.e` (current directed edge)  |

The old branch used `init_EdgeIter` / `step_EdgeIter` which doesn't
match codebase conventions.

## Scope

- **Internal API only** -- no `DECLSPEC`, no `H3_EXPORT`. This is a
  building block for `cellsToMultiPolygon`, not a public function.
- **No input validation** -- callers are internal and already validate
  upstream.
- **Own header/source** -- `gosperIter.h` / `gosperIter.c`, separate
  from `iterators.h` since the concern is different.

## Priority: Clarity Over Speed

This iterator is expected to provide a significant speed benefit over
the current approach (enumerating child cells then computing boundaries),
but the goal of this initial implementation is **clarity for code
review**, not maximum performance. An optimization pass will follow.

That said, avoid structural choices that would require large refactors
later. Specifically: keep the iterator state self-contained in the
struct (no heap allocation), keep the per-step work O(1), and keep the
boundary walk logic in its own static function so it can be replaced or
inlined independently. The current algorithm already satisfies all of
these -- just don't trade them away for readability shortcuts.

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
| `src/h3lib/include/mathExtensions.h` | Add `MIN` macro                       |

## Improvements Over Current Branch

### 1. Same-resolution fast path in `init`

Borrowed from Zig. When `parent_res == child_res`, skip the `I` array
setup, `H3_SET_RESOLUTION`, and digit-setting entirely. Just set mode
and reserved bits on the input cell directly.

```c
if (parent_res == child_res) {
    // No digit setup, resolution change, or I[] init needed
    iter.e = h;
    H3_SET_MODE(iter.e, H3_DIRECTEDEDGE_MODE);
    H3_SET_RESERVED_BITS(iter.e, edge_seq[0]);
    iter.num_edges = is_pentagon ? 5 : 6;
    return iter;
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
iter->_i++;
if (iter->_isPentagon && iter->_i == 1) iter->_i = 2;
```

This works because `num_edges` guarantees we never wrap past index 5.
Clearer intent, no modular arithmetic for the simple case.

### 3. Consistent naming

Rename `init_EdgeIter` / `step_EdgeIter` to `iterInitGosper` /
`iterStepGosper`. Prefix internal struct fields with `_` to match
`IterCellsChildren` convention (e.g. `_parentRes`, `_skipDigit`).

### 4. Drop scratch files

The new branch carries only the iterator itself -- no `notes.c`,
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
