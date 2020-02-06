import { TMonad } from './t-monad.js'
import { ToString } from './to-string.js'
import { RemoveMeta } from './remove-meta.js'
import { Type } from './type.js'

export function ToDigits(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type !== 'string') { result = ToString(result) }

    try {
        const cleaned = RemoveMeta(result.value, /[^\d]+/g)
        result.stringChanges = result.stringChanges.concat(cleaned.stringChanges)
        result.value = cleaned.value.toString()
        result.valid = !!result.value
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)

    return result
}