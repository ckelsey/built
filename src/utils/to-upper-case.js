import { TMonad } from './t-monad.js'

export function ToUpperCase(string) {
    const result = TMonad(string)

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    return result
}