/* eslint-disable */
import { IfInvalid } from './index'
import { ToFunction } from '../to-function'

const obj = {
    a: {
        b: [
            `C`
        ],
        method: (a, b) => a + b,
        o: null,
    }
}

describe(`IfInvalid`, () => {
    test(`Returns function`, () => expect(typeof IfInvalid(`hi`)).toEqual(`function`))
    test(`When invalid, returns the replacement`, () => {
        const ifInvalid = IfInvalid(`hey`)
        const value = ToFunction(`hola`)
        expect(ifInvalid(value).value).toEqual(`hey`)
    })
    test(`When valid, returns the original value`, () => {
        const ifInvalid = IfInvalid(`hey`)
        const value = ToFunction(function Sup() { return `sup` })
        expect(ifInvalid(value).value.name).toEqual(`Sup`)
    })
    test(`Should do nothing if the 'stop' property is true`, () => {
        const ifInvalid = IfInvalid(`hey`)
        const result = ifInvalid({
            stop: true,
            valid: false,
            instanceof: [],
            type: `string`,
            value: `Stop me!`
        })
        expect(result.value).toEqual(`Stop me!`)
        expect(result.stop).toEqual(true)
    })
})