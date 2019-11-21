import { IsEmpty, TMonad } from "../.."

export function IfEmpty(newValue) {
    return function (value) {
        const result = TMonad(value)

        result.instanceof.push(`IfEmpty`)

        if (result.stop || IsEmpty(result.value)) { return result }

        return Object.assign(
            {},
            TMonad(newValue),
            { instanceof: result.instanceof.concat([`T`]) }
        )
    }
}