import { Type } from '../type'

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
    Type(value.valid) === `boolean` &&
    value.hasOwnProperty(`instanceof`) &&
    Type(value.instanceof) === `array` &&
    value.hasOwnProperty(`type`) &&
    Type(value.type) === `string` &&
    value.hasOwnProperty(`value`)

export const Tmonad = value => {

    if (isTMonad(value)) {
        return {
            valid: value.valid,
            value: value.value,
            type: Type(value.value),
            stringChanges: value.stringChanges,
            instanceof: value.instanceof,
            stop: value.stop
        }
    } else {
        return {
            valid: true,
            value: value,
            type: Type(value),
            stringChanges: [],
            instanceof: [],
            stop: false
        }
    }
}

export const finishTMonad = (result, expectedType, instanceName) => {
    result.type = Type(result.value)
    result.valid = expectedType === `?` ? true : result.type === expectedType
    result.instanceof.push(instanceName)
    return result
}