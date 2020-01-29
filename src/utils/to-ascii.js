import { TMonad } from '..'

export function ToAscii(string) {
    const result = TMonad(string)

    try {
        // eslint-disable-next-line no-control-regex
        result.value = result.replace(/[^\x00-\x7F]/g, ``)
    } catch (error) {
        result.valid = false
    }

    return result
}