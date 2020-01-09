import { TMonad } from './t-monad.js'
import { Get } from './get.js'

export function IsElementType(tag) {
    return function (value) {
        const result = TMonad(value)

        if (result.stop) {
            return result
        }

        result.valid = Get(result, `value.tagName`, ``).toLowerCase() === tag.toLowerCase()
        return result
    }
}