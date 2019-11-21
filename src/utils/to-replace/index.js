import { TMonad, TMonadUpdate, ToReplaceMeta, ToString } from "../.."

export function ToReplace(search, replace) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== `string`) { result = ToString(result) }

        try {
            const replaced = ToReplaceMeta(result.value, search, replace)
            result.value = replaced.value
            result.valid = true
            result.stringChanges = result.stringChanges.concat(replaced.stringChanges)

        } catch (error) {
            result.valid = false
        }

        return TMonadUpdate(result, `string`, `Replace`)
    }
}