# Claude Code Instructions for H3

## Build and Test

Always use `just` commands instead of running cmake/ctest/binaries directly:

- `just build` - build the project
- `just test-compact` - run compact cell tests (suppresses verbose output)
- `just test-fast` - run most tests quickly
- `just bench` - run compact benchmarks
- `just profile` - profile with Instruments

Never run `./build/bin/testCompactCells` directly - it outputs 355KB of dots.
