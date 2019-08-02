import { getType } from '../type'
import { TMonad } from '.'

export const isTMonad: (v: any) => boolean = value =>
    !!value &&
    value.hasOwnProperty(`valid`) &&
    getType(value.valid) === `boolean` &&
    value.hasOwnProperty(`instanceof`) &&
    getType(value.instanceof) === `array` &&
    value.hasOwnProperty(`type`) &&
    getType(value.type) === `string` &&
    value.hasOwnProperty(`value`)

export const Tmonad: (v: any) => TMonad = value => Object.assign(
    {},
    (isTMonad(value) ? value : {}),
    (
        isTMonad(value)
            ? {
                valid: value.valid,
                value: value.value,
                type: getType(value.value),
                instanceof: value.instanceof
            }
            :
            {
                valid: true,
                value: value,
                type: getType(value),
                instanceof: []
            }
    )
)

export const finishTMonad = (result, expectedType, instanceName) => {
    result.type = getType(result.value)
    result.valid = expectedType === `?` ? true : result.type === expectedType
    result.instanceof.push(instanceName)
    return result
}