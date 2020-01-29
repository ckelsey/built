import { TMonad } from '..'

export function ToAscii(string) {
    const result = TMonad(string)

    try {
        result.value = result.value.replace(new RegExp(`[^\x00-\x7F]`, `gm`), ``)
    } catch (error) {
        result.valid = false
    }

    return result
}