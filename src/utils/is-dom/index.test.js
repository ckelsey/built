/* eslint-disable */
import { IsDom } from './index'

const valid = document.createElement(`div`)
const invalid = { tagName: `not-an-element` }

describe(`IsDom`, () => {
    test(`Returns true if a valid element`, () => expect(IsDom(valid)).toEqual(true))
    test(`Returns false if an invalid element`, () => expect(IsDom(invalid)).toEqual(false))
})