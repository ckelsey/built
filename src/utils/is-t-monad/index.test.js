/* eslint-disable */
import { IsTMonad } from './index'

describe(`IsTMonad`, () => {
    test(`Returns false for {}`, () => expect(IsTMonad({})).toEqual(false))
    test(`Returns false for []`, () => expect(IsTMonad([])).toEqual(false))
    test(`Returns false for {value:'',valid:true}`, () => expect(IsTMonad({ value: '', valid: true })).toEqual(false))
    test(`Returns false for {value:'',valid:true, type:'string'}`, () => expect(IsTMonad({ value: '', valid: true, type: 'string' })).toEqual(false))
    test(`Returns false for {value:'', type:'string'}`, () => expect(IsTMonad({ value: '', type: 'string' })).toEqual(false))
    test(`Returns false for {type:'string',valid:true}`, () => expect(IsTMonad({ type: 'string', valid: true })).toEqual(false))
    test(`Returns true for {value:'',valid:true, type:'string'}`, () => expect(IsTMonad({ value: '', valid: true, type: 'string' })).toEqual(true))
})