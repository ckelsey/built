import { TMonad, ToMatchMeta, ToString } from "../.."

export function ToMatchAll(search) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== `string`) { result = ToString(result) }

        const matches = ToMatchMeta(result.value, search)

        result.value = matches.value
        result.valid = result.value.length > 0
        result.stringChanges = result.stringChanges.concat(matches.stringChanges)
        return result
    }
}