import { Type } from '../../index'

export function TMonadUpdate(tmonad, expectedType, instanceName) {
    return Object.assign(tmonad, {
        type: Type(tmonad.value),
        valid: expectedType === `?` ? true : tmonad.type === expectedType, // '?' signifies any
        instanceof: tmonad.instanceof.concat([instanceName])
    })
}