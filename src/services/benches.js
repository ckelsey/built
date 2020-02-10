const programs = {}

const Benches = {
    add: function (key) {
        if (programs[key]) {
            return programs[key]
        }

        const now = performance.now()

        const programObject = {
            started: now,
            ended: now,
            time: 0,
            end: function () {
                programObject.ended = performance.now()
                programObject.time = programObject.ended - programObject.started
                return programObject
            }
        }

        if (programs[key]) {
            return programs[key]
        }

        programs[key] = programObject

        return programObject
    },
    end: function (key) {
        if (programs[key]) {
            programs[key].end()
            return programs[key]
        }
    },
    report: function () {
        Object.keys(programs).forEach(function (programKey) {
            console.log(programKey, 'Started: ' + programs[programKey].started, 'Duration: ' + programs[programKey].time + 'ms')
        })
    },
    average: function () {
        const keys = Object.keys(programs).filter(k => programs[k].time !== 0)

        console.log('Average time:', keys.reduce(function (target, programKey) {
            return target + programs[programKey].time
        }, 0) / keys.length, 'Total:', keys.length)
    }
}

Object.defineProperty(Benches, 'programs', {
    get: function () { return programs }
})

export { Benches }

// export function Benches(tests) {
//     // Warmup.
//     for (const test of tests) {
//         for (let i = 0; i < 10; ++i) {
//             test()
//         }
//     }

//     // Actual tests.
//     for (const test of tests) {
//         console.time(test.name)
//         test()
//         console.timeEnd(test.name)
//     }
// }

