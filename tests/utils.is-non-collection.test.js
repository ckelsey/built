/* eslint-disable no-undef */
import assert from 'assert'
import { IsNonCollection } from '../src/utils'

describe(`IsNonCollection`, () => {
    it(`should return true given number 2`, () => {
        assert.ok(IsNonCollection(2) === true)
    })

    it(`should return true given string '2'`, () => {
        assert.ok(IsNonCollection(`2`) === true)
    })

    it(`should return false for ['2']`, () => {
        assert.ok(IsNonCollection([`2`]) === false)
    })

    it(`should return false for {'2':2}`, () => {
        assert.ok(IsNonCollection({ '2': 2 }) === false)
    })

    it(`should return true for function(){}`, () => {
        assert.ok(IsNonCollection(function () { }) === true)
    })

    it(`should return true for new Date()`, () => {
        assert.ok(IsNonCollection(new Date()) === true)
    })

    it(`should return true for null`, () => {
        assert.ok(IsNonCollection(null) === true)
    })

    it(`should return true for undefined`, () => {
        assert.ok(IsNonCollection(undefined) === true)
    })


    it(`should be performant`, () => {
        const start = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })

        let i = 20000

        while (i) {
            i = i - 1
            IsNonCollection(2)
            IsNonCollection(`2`)
            IsNonCollection([`2`])
            IsNonCollection({ '2': 2 })
            IsNonCollection(function () { })
            IsNonCollection(new Date())
            IsNonCollection(null)
            IsNonCollection(undefined)
        }

        const end = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })


        const time = end.time - start.time

        console.log(`===================`)
        console.log(`IsNonCollection`)
        console.log(time)
        console.log(`===================`)

        assert.ok(time < 80) // ~ 30-45
    })
})