import { TMonad } from './t-monad.js'

export function StopIfInvalid(value) {
    const result = TMonad(value)

    if (!result.valid) {
        result.stop = true
    }

    return result
}