import { Type } from './type.js'
import { IsTMonad } from './is-t-monad.js'

export function TMonad(value) {
    if (IsTMonad(value)) {
        return Object.assign({}, value, { type: Type(value.value) })
    }


    const data = {
        valid: true,
        value: value,
        type: Type(value),
        stringChanges: [], // not required
        stop: false // not required
    }

    return data
}