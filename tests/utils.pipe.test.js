/* eslint-disable no-undef */
import assert from 'assert'
import { Pipe } from '../src/utils/pipe'

describe(`Pipe`, () => {
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
})