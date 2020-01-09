import { Type } from './type.js'

export function TMonadUpdate(tmonad, expectedType) {
    return Object.assign(tmonad, {
        type: Type(tmonad.value),
        valid: expectedType === `?` ? true : tmonad.type === expectedType, // '?' signifies any
    })
}