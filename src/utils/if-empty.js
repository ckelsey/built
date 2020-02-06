import { IsEmpty } from './is-empty.js'
import { TMonad } from './t-monad.js'

export function IfEmpty(newValue) {
    return function (value) {
        const result = TMonad(value)

        if (result.stop || IsEmpty(result.value)) { return result }

        return TMonad(newValue)
    }
}