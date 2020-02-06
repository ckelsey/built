import { TMonad } from './t-monad.js'

function is(v) { return !!v }

export function ToRegex(string) {
    let result = TMonad(string)

    if (!result.value) {
        result.value = new RegExp('')

    } else if (typeof result.value.split !== 'function' && typeof result.value === 'object') {
        // already regex, clone
        result.value = new RegExp(result.value)

    } else if (typeof result.value === 'string') {
        if (result.value.indexOf('/') === 0) {
            // regex that has been converted to string and needs to be prepared
            // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
            const parts = result.value.split('/').filter(is)
            let options = parts.pop()

            if (options.match(/[^gmisuy]/)) {
                // if anything other than standard flag, send back to regex
                parts.push(options)
                options = undefined
            }

            result.value = new RegExp(parts.join('/'), options)

        } else {
            // proper first argument
            result.value = new RegExp(result.value)
        }
    }

    result.valid = true
    result.type = 'object'
    return result
}