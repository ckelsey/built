import { TMonad } from './t-monad.js'
import { IsEmpty } from './is-empty.js'
import { Type } from './type.js'

export function ToNumber(value) {
    const result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === `string` && !IsEmpty(result.value)) {
        result.value = parseFloat(result.value)
    }

    result.type = Type(result.value)
    result.valid = !isNaN(result.value)

    return result
}