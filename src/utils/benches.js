export function Benches(tests) {
    // Warmup.
    for (const test of tests) {
        for (let i = 0; i < 10; ++i) {
            test()
        }
    }

    // Actual tests.
    for (const test of tests) {
        console.time(test.name)
        test()
        console.timeEnd(test.name)
    }
}

