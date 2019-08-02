import { Tmonad } from './t-monad'
import { TMonad } from '.'
import { getType } from '../type'
import { DecodeUriComponent } from './uri'

export const FromJSON: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.parse(DecodeUriComponent(result.value).value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = getType(result.value)
    result.instanceof.push(`FromJSON`)

    if ([`object`, `array`].indexOf(result.type) > -1) {
        result.valid = true
    }

    return result
}

export const ToJSON = value => {
    const result = FromJSON(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.stringify(result.value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = getType(result.value)
    result.instanceof.push(`ToJSON`)
    return result
}