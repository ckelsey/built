import { TMonad } from '../..'
export function ToLowerCase(string) {
    const result = TMonad(string)

    try {
        result.value = result.value.toLowerCase()
    } catch (error) {
        result.valid = false
    }

    return result
}