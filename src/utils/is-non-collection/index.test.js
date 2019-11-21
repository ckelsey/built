/* eslint-disable */
import { IsNonCollection } from './index'

describe(`IsNonCollection`, () => {
    test(`Returns true for undefined`, () => expect(IsNonCollection()).toEqual(true))
    test(`Returns true for true`, () => expect(IsNonCollection(true)).toEqual(true))
    test(`Returns true for null`, () => expect(IsNonCollection(null)).toEqual(true))
    test(`Returns true for ''`, () => expect(IsNonCollection('')).toEqual(true))
    test(`Returns false for {}`, () => expect(IsNonCollection({})).toEqual(false))
    test(`Returns false for []`, () => expect(IsNonCollection([])).toEqual(false))
})