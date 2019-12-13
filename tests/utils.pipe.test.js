/* eslint-disable */

import assert from 'assert'
import { Pipe } from '../src/utils'
const add2 = n => n + 2
const multiply3 = n => n * 3
const divide5 = n => n / 5
const minus = 2

describe(`Pipe`, () => {

    it(`should return a function`, () => assert.strictEqual(typeof Pipe(add2, multiply3, divide5), `function`))

    it(`should run all functions`, () => assert.strictEqual(6, Pipe(add2, multiply3, divide5)(8)))

    it(`should skip over invalid functions`, () => assert.strictEqual(6, Pipe(add2, multiply3, minus, divide5)(8)))

    it(`should be performant`, () => {
        let i = 0

        i = 20000
        const start = browser.execute(() => { return { memory: window.performance.memory, time: window.performance.now() } })
        while (i) {
            i = i - 1
            Pipe(add2, multiply3, divide5)(i)
        }
        const end = browser.execute(() => { return { memory: window.performance.memory, time: window.performance.now() } })
        const time = end.time - start.time


        i = 20000
        const deltaStart = browser.execute(() => { return { memory: window.performance.memory, time: window.performance.now() } })
        while (i) {
            i = i - 1
            divide5(multiply3(add2(i)))
        }
        const deltaEnd = browser.execute(() => { return { memory: window.performance.memory, time: window.performance.now() } })
        const deltaTime = deltaEnd.time - deltaStart.time

        console.log(`===================`)
        console.log(`Pipe`)
        console.log(`TIME:`, time, `DELTA:`, deltaTime, time / deltaTime, `x slower`)
        console.log(`===================`)

        assert.ok(time < 80)
        // ~TIME: 23.71999999968466 ~DELTA: 8.220000000164873
    })

})