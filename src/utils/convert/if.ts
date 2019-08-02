import { Tmonad } from './t-monad'
import { TMonad } from '.'
import { empty } from '../type'

export const IfInvalid: (nv: any) => (v: any) => TMonad = newValue => value => {
    const result = Tmonad(value)

    if (result.stop || result.valid) { return result }

    result.instanceof.push(`IfInvalid`)

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const IfValid: (nv: any) => (v: any) => TMonad = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfValid`)

    if (result.stop || !result.valid) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const IfEmpty: (nv: any) => (v: any) => TMonad = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfEmpty`)

    if (result.stop || !empty(result.value)) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const StopIfInvalid: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (!result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfInvalid`)

    return result
}

export const StopIfValid: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfValid`)

    return result
}

export const StopIfEmpty: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (empty(result.value)) {
        result.stop = true
    }

    result.instanceof.push(`StopIfEmpty`)

    return result
}