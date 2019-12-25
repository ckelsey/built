/* eslint-disable */
import { Map } from './index'

describe(`Map`, () => {
    test(`Returns a correctly mapped array`, () => expect(Map(v => v.toLowerCase(), [`A`, `B`])).toEqual([`a`, `b`]))
})