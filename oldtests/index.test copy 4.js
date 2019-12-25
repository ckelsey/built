/* eslint-disable */
import { IsEmpty } from './index'

describe(`IsDom`, () => {
    test(`Returns true for undefined`, () => expect(IsEmpty()).toEqual(true))
    test(`Returns true for 'undefined'`, () => expect(IsEmpty('undefined')).toEqual(true))
    test(`Returns true for false`, () => expect(IsEmpty(false)).toEqual(true))
    test(`Returns true for 'false'`, () => expect(IsEmpty('false')).toEqual(true))
    test(`Returns false for true`, () => expect(IsEmpty(true)).toEqual(false))
    test(`Returns true for null`, () => expect(IsEmpty(null)).toEqual(true))
    test(`Returns true for 'null'`, () => expect(IsEmpty('null')).toEqual(true))
    test(`Returns true for ''`, () => expect(IsEmpty('')).toEqual(true))
    test(`Returns false for 'value'`, () => expect(IsEmpty(`value`)).toEqual(false))
    test(`Returns true for {}`, () => expect(IsEmpty({})).toEqual(true))
    test(`Returns false for {value:'value'}`, () => expect(IsEmpty({ value: 'value' })).toEqual(false))
    test(`Returns true for []`, () => expect(IsEmpty([])).toEqual(true))
    test(`Returns false for ['value']`, () => expect(IsEmpty([`value`])).toEqual(false))
})