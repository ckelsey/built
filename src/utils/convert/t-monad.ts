import { getType } from '../type'

export interface TMonad {
    value: any,
    valid: boolean,
    type: string,
    instanceof: string[],
    stop?: boolean
}

export const isTMonad: (v: any) => boolean = value =>
    !!value &&
    value.hasOwnProperty(`valid`) &&
    getType(value.valid) === `boolean` &&
    value.hasOwnProperty(`instanceof`) &&
    getType(value.instanceof) === `array` &&
    value.hasOwnProperty(`type`) &&
    getType(value.type) === `string` &&
    value.hasOwnProperty(`value`)

export const Tmonad = value => {

    if (isTMonad(value)) {
        return {
            valid: value.valid,
            value: value.value,
            type: getType(value.value),
            stringChanges: value.stringChanges,
            instanceof: value.instanceof,
            stop: value.stop
        }
    } else {
        return {
            valid: true,
            value: value,
            type: getType(value),
            stringChanges: [],
            instanceof: [],
            stop: false
        }
    }

    // Object.assign(
    //     {},
    //     (isTMonad(value) ? value : {}),
    //     (
    //         isTMonad(value)
    //             ? {
    //                 valid: value.valid,
    //                 value: value.value,
    //                 type: getType(value.value),
    //                 caretPosition: value.caretPosition,
    //                 instanceof: value.instanceof
    //             }
    //             :
    //             {
    //                 valid: true,
    //                 value: value,
    //                 type: getType(value),
    //                 caretPosition: 0,
    //                 instanceof: []
    //             }
    //     )
    // )
}

export const finishTMonad = (result, expectedType, instanceName) => {
    result.type = getType(result.value)
    result.valid = expectedType === `?` ? true : result.type === expectedType
    result.instanceof.push(instanceName)
    return result
}