/* eslint-disable no-undef */
import assert from 'assert'
import { Between } from '../src/utils'

describe(`Between`, () => {
    it(`should return 'first' using .first(), given '{{first}}{{second}}'`, () => {
        assert.strictEqual(`first`, Between(`{{`, `}}`, `{{first}}{{second}}`).first())
    })

    it(`should return 'second' using .last(), given '{{first}}{{second}}'`, () => {
        assert.strictEqual(`second`, Between(`{{`, `}}`, `{{first}}{{second}}`).last())
    })

    it(`should return 'second' using .all()[1], given '{{first}}{{second}}'`, () => {
        assert.strictEqual(`second`, Between(`{{`, `}}`, `{{first}}{{second}}`).all()[1])
    })

    it(`should return 'third' using .at(2), given '{{first}}{{second}}{{third}}'`, () => {
        assert.strictEqual(`third`, Between(`{{`, `}}`, `{{first}}{{second}}{{third}}`).at(2))
    })

    it(`should return match result, given '{{first}}{{second}}{{third}}'`, () => {
        assert.strictEqual(`["{{first}}","first"]`, JSON.stringify(Between(`{{`, `}}`, `{{first}}{{second}}{{third}}`).get()))
    })

    it(`should be performant`, () => {
        const start = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })

        let i = 20000

        while (i) {
            i = i - 1
            Between(`{{`, `}}`, `{{first}}{{second}}`).first()
            Between(`{{`, `}}`, `{{first}}{{second}}`).first()
            Between(`{{`, `}}`, `{{first}}{{second}}`).all()
            Between(`{{`, `}}`, `{{first}}{{second}}{{third}}`).at(2)
            Between(`{{`, `}}`, `{{str}}`).get()
        }

        const end = browser.execute(() => {
            return { memory: window.performance.memory, time: window.performance.now() }
        })

        const time = end.time - start.time

        console.log(`===================`)
        console.log(`Between`)
        console.log(time)
        console.log(`===================`)

        assert.ok(time < 200) // ~90-120
    })
})