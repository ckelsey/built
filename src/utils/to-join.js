import { TMonad } from './t-monad.js'
import { ToJoinMeta } from './to-join-meta.js'
import { TMonadUpdate } from './t-monad-update.js'

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