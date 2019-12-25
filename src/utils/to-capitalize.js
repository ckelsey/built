import { TMonad } from '..'

export function ToCapitalize(string) {
    const result = TMonad(string)

    try {
        result.value = `${result.value.slice(0, 1).toUpperCase()}${result.value.slice(1) || ``}`
    } catch (error) {
        result.valid = false
    }

    return result
}