import { TMonad, TMonadUpdate, ToJoinMeta } from '..'

export function ToJoin(delimeter) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        const resultingMeta = ToJoinMeta(result.value, delimeter)
        result.value = resultingMeta.value
        result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges)
        result.valid = typeof result.value === `string`
        return TMonadUpdate(result, `string`, `Join`)
    }
}