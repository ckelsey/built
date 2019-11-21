/* eslint-disable */
import { IsTMonad } from './index'

describe(`IsTMonad`, () => {
    test(`Returns false for {}`, () => expect(IsTMonad({})).toEqual(false))
    test(`Returns false for []`, () => expect(IsTMonad([])).toEqual(false))
    test(`Returns false for {value:'',valid:true, instanceof:[]}`, () => expect(IsTMonad({ value: '', valid: true, instanceof: [] })).toEqual(false))
    test(`Returns false for {value:'',valid:true, type:'string'}`, () => expect(IsTMonad({ value: '', valid: true, type: 'string' })).toEqual(false))
    test(`Returns false for {value:'',instanceof:[], type:'string'}`, () => expect(IsTMonad({ value: '', instanceof: [], type: 'string' })).toEqual(false))
    test(`Returns false for {type:'string',valid:true, instanceof:[]}`, () => expect(IsTMonad({ type: 'string', valid: true, instanceof: [] })).toEqual(false))
    test(`Returns true for {value:'',valid:true, instanceof:[], type:'string'}`, () => expect(IsTMonad({ value: '', valid: true, instanceof: [], type: 'string' })).toEqual(true))
})