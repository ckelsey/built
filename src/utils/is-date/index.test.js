/* eslint-disable */
import { IsDate } from './index'

const valid = `Mon Nov 18 2019 07:41:48 GMT-0800`
const invalid = `Not a date`

describe(`IsDate`, () => {
    test(`Returns true if a valid date`, () => expect(IsDate(valid)).toEqual(true))
    test(`Returns false if an invalid date`, () => expect(IsDate(invalid)).toEqual(false))
})