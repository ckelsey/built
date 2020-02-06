import { Type } from './type.js'
import { IsTMonad } from './is-t-monad.js'
import { AssignObject } from './assign.js'

export function TMonad(value) {
    if (IsTMonad(value)) {
        return AssignObject({}, value, { type: Type(value.value) })
    }

    return {
        valid: true,
        value: value,
        type: Type(value),
        stringChanges: [], // not required
        stop: false // not required
    }
}