import { ToString, Pipe, ToDigits, ToNumber } from '../..'

export const ToReplacementPattern = string => {
    if (!string) {
        return []
    }

    const str = ToString(string).value
    const matches = str.match(/(\$\d+)+/g) || []
    const extras = str.split(new RegExp(`[${matches.join(`|`)}]`))
    const parsedMatches = matches ? matches.map(match => Pipe(ToDigits, ToNumber)(match).value) : []
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