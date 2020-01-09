import { TMonad } from './t-monad.js'
import { Get } from './get.js'

export function IsElement(value) {
    const result = TMonad(value)

    if (result.stop) {
        return result
    }

    result.valid = Get(result, `value.nodeType`) === 1
    return result
}