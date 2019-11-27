import { IsEmpty, TMonad } from "../.."

export function IfEmpty(newValue) {
    return function (value) {
        const result = TMonad(value)

        if (result.stop || IsEmpty(result.value)) { return result }

        return TMonad(newValue)
    }
}