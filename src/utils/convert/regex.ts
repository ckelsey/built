import { Tmonad } from './t-monad'
import { ToString } from './string'
import { ToNumber, ToDigits } from './number';
import pipe from '../pipe';

export const ReplacementPattern = string => {
    if (!string) {
        return []
    }

    const str = ToString(string).value
    const matches = str.match(/(\$\d+)+/g) || []
    const extras = str.split(new RegExp(`[${matches.join(`|`)}]`))
    const parsedMatches = !!matches ? matches.map(match => pipe(ToDigits, ToNumber)(match).value) : []
    const result = []

    extras.forEach((extra, index) => {
        if (extra === ``) {
            if (index === 0 || index === extras.length - 1) {
                const replacement = parsedMatches.shift()
                return result.push({ index: replacement, original: `$${replacement}` })
            }

            return
        }

        result.push(extra)
    })

    return result
}

export const ToRegex = string => {
    let result = Tmonad(string)

    if (!result.value) {
        result.value = new RegExp(``)

    } else if (typeof result.value.split !== `function` && typeof result.value === `object`) {
        // already regex, clone
        result.value = new RegExp(result.value)

    } else if (typeof result.value === `string`) {
        if (result.value.indexOf(`/`) === 0) {
            // regex that has been converted to string and needs to be prepared
            // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
            const parts = result.value.split(`/`).filter(p => !!p)
            let options = parts.pop()

            if (options.match(/[^gmisuy]/)) {
                // if anything other than standard flag, send back to regex
                parts.push(options)
                options = undefined
            }

            result.value = new RegExp(parts.join(`/`), options)

        } else {
            // proper first argument
            result.value = new RegExp(result.value)
        }
    }

    result.valid = true
    result.instanceof.push(`ToRegex`)
    result.type = `object`
    return result
}