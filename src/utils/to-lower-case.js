import { TMonad } from './t-monad.js'
export function ToLowerCase(string) {
    const result = TMonad(string)

    try {
        result.value = result.value.toLowerCase()
    } catch (error) {
        result.valid = false
    }

    return result
}