import { Get, TMonad } from "../.."

export function ToTrim(value) {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return TMonad(value)
    }

    let result = TMonad(value)

    try {
        result.value = result.value.trim()
    } catch (error) { }

    return result
}