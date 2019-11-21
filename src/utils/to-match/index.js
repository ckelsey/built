import { TMonad, ToString, ToMatchMeta } from "../.."

export function ToMatch(search) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== `string`) { result = ToString(result) }

        const matches = ToMatchMeta(result.value, search, true)

        result.value = matches.value
        result.valid = result.value.length === 1
        result.stringChanges = result.stringChanges.concat(matches.stringChanges)
        result.instanceof.push(`Match`)
        return result
    }
}