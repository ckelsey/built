import { ToString } from './to-string.js'
import { Pipe } from './pipe.js'
import { ToDigits } from './to-digits.js'
import { ToNumber } from './to-number.js'

export function ToReplacementPattern(string) {
    if (!string) {
        return []
    }

    function matchesMap(match) {
        Pipe(ToDigits, ToNumber)(match).value
    }

    function extrasEach(extra, index) {
        if (extra === '') {
            if (index === 0 || index === extras.length - 1) {
                const replacement = parsedMatches.shift()
                return result.push({ index: replacement, original: ''.concat('$', replacement) })
            }

            return
        }

        result.push(extra)
    }

    const str = ToString(string).value
    const matches = str.match(/(\$\d+)+/g) || []
    const extras = str.split(new RegExp('[' + matches.join(' |') + ']'))
    const parsedMatches = matches ? matches.map(matchesMap) : []
    const result = []

    extras.forEach(extrasEach)

    return result
}