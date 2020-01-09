import { IsEmpty } from './is-empty.js'
import { IsObject } from './is-object.js'
import { ReduceFilter } from './reduce-filter.js'
import { Type } from './type.js'

/**
 * Determines if a value is a TMonad
 * @function IsTMonad
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a TMonad
 * @example
 * IsTMonad({}) // false
 * IsTMonad([]) // false
 * IsTMonad(``) // false
 * IsTMonad({
 *      value:``,
 *      valid: true,
 *      type: `string`
 * }) // true
 */

export function IsTMonad(value) {
    if (IsEmpty(value) || !IsObject(value)) {
        return false
    }

    const keysItShouldHave = [{
        key: `valid`,
        type: `boolean`
    }, {
        key: `type`,
        type: `string`
    }, {
        key: `value`,
    }]

    return keysItShouldHave.reduce(
        ReduceFilter(function hasValue(keyObj) {
            return Object.prototype.hasOwnProperty.call(value, keyObj.key) && (!keyObj.type || Type(value[keyObj.key]) === keyObj.type)
        }),
        []
    ).length === keysItShouldHave.length
}