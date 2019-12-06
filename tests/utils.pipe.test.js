/* eslint-disable no-undef */
import assert from 'assert'
import { Pipe } from '../src/utils/pipe'

describe(`Pipe`, () => {
    // beforeEach(() => {
    //     browser.enablePerformanceAudits()
    // })

    // afterEach(() => {
    //     browser.disablePerformanceAudits()
    // })

    it(`should run all functions`, () => {
        const add2 = n => n + 2
        const multiply3 = n => n * 2
        const divide5 = n => n / 5
        assert.strictEqual(4, Pipe(add2, multiply3, divide5)(8))
    })

    it(`should skip over invalid functions`, () => {
        const add2 = n => n + 2
        const multiply3 = n => n * 2
        const divide5 = n => n / 5
        const minus = 2
        assert.strictEqual(4, Pipe(add2, multiply3, minus, divide5)(8))
    })

    // it(`should run performance`, () => {
    //     browser.url(`http://0.0.0.0:9000`)
    //     // browser.enablePerformanceAudits()
    //     let metrics = browser.getMetrics()
    //     // let score = browser.getPerformanceScore()

    //     console.log(metrics)
    //     assert.ok(metrics.speedIndex < 1500)
    //     // browser.disablePerformanceAudits()
    // })

})