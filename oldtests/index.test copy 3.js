/* eslint-disable */
import { IsObject } from './index'

describe(`IsDom`, () => {
    test(`Returns false for undefined`, () => expect(IsObject()).toEqual(false))
    test(`Returns false for true`, () => expect(IsObject(true)).toEqual(false))
    test(`Returns false for null`, () => expect(IsObject(null)).toEqual(false))
    test(`Returns false for ''`, () => expect(IsObject('')).toEqual(false))
    test(`Returns true for {}`, () => expect(IsObject({})).toEqual(true))
    test(`Returns true for {value:'value'}`, () => expect(IsObject({ value: 'value' })).toEqual(true))
    test(`Returns false for []`, () => expect(IsObject([])).toEqual(false))
    test(`Returns false for ['value']`, () => expect(IsObject(new Date())).toEqual(false))
})