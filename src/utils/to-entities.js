import { TMonad } from './t-monad.js'

export function ToEntities(value) {
    const result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === 'string' && !!result.value) {
        result.value = result.value
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/`/g, '&apos;')
        result.valid = true
    } else {
        result.valid = false
    }

    return result
}