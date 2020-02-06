import { TMonad } from './t-monad.js'

export function FromEntities(value) {
    const result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === 'string' && !!result.value) {

        result.value = result.value
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
            .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\'')

        result.valid = true
    } else {
        result.valid = false
    }

    return result
}