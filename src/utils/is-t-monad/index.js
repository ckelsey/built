import { IsEmpty, IsObject, ReduceFilter, Type } from '../../index'

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
 *      instanceof:[],
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
        key: `instanceof`,
        type: `array`
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