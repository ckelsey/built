import { TMonad } from './t-monad.js'
import { ToString } from './to-string.js'
import { ToReplaceMeta } from './to-replace-meta.js'
import { TMonadUpdate } from './t-monad-update.js'

export function ToReplace(search, replace) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        if (result.type !== 'string') { result = ToString(result) }

        try {
            const replaced = ToReplaceMeta(result.value, search, replace)
            result.value = replaced.value
            result.valid = true
            result.stringChanges = result.stringChanges.concat(replaced.stringChanges)

        } catch (error) {
            result.valid = false
        }

        return TMonadUpdate(result, 'string', 'Replace')
    }
}