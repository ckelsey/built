/* eslint-disable */
import { ID } from './index'

describe(`ID`, () => {
    test(`Returns a string`, () => {
        expect(typeof ID()).toBe(`string`)
    })

    test(`All 1000 ids generated should be unique`, () => {
        const ids = new Set([])
        let i = 1000
        while (i) {
            ids.add(ID())
            i = i - 1
        }

        expect(Array.from(ids).length).toEqual(1000)
    })
})