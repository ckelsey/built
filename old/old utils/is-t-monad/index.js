import { IsEmpty } from '../is-empty'
import { IsObject } from '../is-object'
import { ReduceFilter } from '../reduce-filter'
import { Type } from '../type'

export function IsTMonad(value) {
    if (IsEmpty(value) || !IsObject(value)) {
        return false
    }

    const keysItShouldHave = [{
        key: `valid`,
        type: `boolean`
    }, {
        key: `instanceof`,
        type: `array`
    }, {
        key: `type`,
        type: `string`
    }, {
        key: `value`,
    }]

    console.log(keysItShouldHave.reduce(
        ReduceFilter(function hasValue(keyObj) {
            return Object.prototype.hasOwnProperty.call(value, keyObj.key) && (!keyObj.type || Type(value[keyObj.key]) === keyObj.type)
        }),
        []
    ))

    return keysItShouldHave.reduce(
        ReduceFilter(function hasValue(keyObj) {
            return Object.prototype.hasOwnProperty.call(value, keyObj.key) && (!keyObj.type || Type(value[keyObj.key]) === keyObj.type)
        }),
        []
    ).length === keysItShouldHave.length
}