import { Type } from './type.js'
import { AssignObject } from './assign.js'

export function TMonadUpdate(tmonad, expectedType) {
    return AssignObject(tmonad, {
        type: Type(tmonad.value),
        valid: expectedType === '?' ? true : tmonad.type === expectedType, // '?' signifies any
    })
}