# H3 development justfile

init:
    mkdir -p build

build: init
    cd build && cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_BENCHMARKS=ON .. && make -j4

build-debug: init
    cd build && cmake -DCMAKE_BUILD_TYPE=Debug .. && make -j4

purge:
    rm -rf build
    rm -rf *.trace

test: build
    just test-fast

test-fast: build
    cd build && ctest -E "Cli|Memory" -j4

test-slow: build
    cd build && ctest -j4

test-one TEST: build
    ./build/bin/{{TEST}}

test-compact: build
    @./build/bin/testCompactCells > /dev/null && echo "testCompactCells: PASS" || echo "testCompactCells: FAIL"

bench: build
    ./build/bin/benchmarkCompactAlgos

bench-all: build
    @echo "=== Compact Algorithms ==="
    ./build/bin/benchmarkCompactAlgos
    @echo ""
    @echo "=== Other Benchmarks ==="
    ./build/bin/benchmarkCellToChildren

profile: init
    cd build && cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo -DBUILD_BENCHMARKS=ON -DCMAKE_C_FLAGS='-fno-omit-frame-pointer' .. && make -j4
    xcrun xctrace record \
        --template 'Time Profiler' \
        --output h3-prof.trace \
        --launch -- ./build/bin/benchmarkCompactAlgos
    open h3-prof.trace

coverage: purge
    mkdir build
    cd build && cmake -DCMAKE_BUILD_TYPE=Debug -DENABLE_COVERAGE=ON .. && make -j4 && make coverage
    open build/coverage/index.html
