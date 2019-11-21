import { TMonad } from "../.."

export function StopIfInvalid(value) {
    const result = TMonad(value)

    if (!result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfInvalid`)

    return result
}