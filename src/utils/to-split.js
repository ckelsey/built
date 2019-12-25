import { TMonad, TMonadUpdate, ToSplitMeta, ToString } from '..'


export function ToSplit(delimeter) {
    return function ToSplitInner(value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== `string`) {
            result = ToString(result)
        }

        const splat = ToSplitMeta(result.value, delimeter)

        if (typeof splat.value === `string`) {
            result.valid = false
            return TMonadUpdate(result, `array`, `Split`)
        }

        result.stringChanges = result.stringChanges.concat(splat.stringChanges)
        result.value = splat.value

        return TMonadUpdate(result, `array`, `Split`)
    }
}