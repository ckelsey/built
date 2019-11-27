import { IsTMonad, Type } from '../../index'

export function TMonad(value) {
    if (IsTMonad(value)) {
        return Object.assign({}, value, { type: Type(value.value) })
    }

    return {
        valid: true,
        value: value,
        type: Type(value),
        stringChanges: [], // not required
        stop: false // not required
    }
}