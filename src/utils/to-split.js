import { ToString } from './to-string.js'
import { TMonad } from './t-monad.js'
import { ToSplitMeta } from './to-split-meta.js'
import { TMonadUpdate } from './t-monad-update.js'


export function ToSplit(delimeter) {
    return function ToSplitInner(value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== 'string') {
            result = ToString(result)
        }

        const splat = ToSplitMeta(result.value, delimeter)

        if (typeof splat.value === 'string') {
            result.valid = false
            return TMonadUpdate(result, 'array', 'Split')
        }

        result.stringChanges = result.stringChanges.concat(splat.stringChanges)
        result.value = splat.value

        return TMonadUpdate(result, 'array', 'Split')
    }
}