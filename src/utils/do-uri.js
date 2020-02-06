import { TMonad } from './t-monad.js'
import { Type } from './type.js'

export function DoURI(value, encode, component) {
    const result = TMonad(value)

    if (result.stop) { return result }

    try {
        if (encode) {
            if (component) {
                result.value = encodeURIComponent(result.value)
            } else {
                result.value = encodeURI(result.value)
            }
        } else {
            if (component) {
                result.value = decodeURIComponent(result.value)
            } else {
                result.value = decodeURI(result.value)
            }
        }
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)
    return result
}