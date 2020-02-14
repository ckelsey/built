import { Type } from './type.js'
import { ObjectAssign } from './object-assign.js'

export function TMonadUpdate(tmonad, expectedType) {
    return ObjectAssign(tmonad, {
        type: Type(tmonad.value),
        valid: expectedType === '?' ? true : tmonad.type === expectedType, // '?' signifies any
    })
}