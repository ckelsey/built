import { TMonad } from '../..'
export function ToUpperCase(string) {
    const result = TMonad(string)

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    return result
}