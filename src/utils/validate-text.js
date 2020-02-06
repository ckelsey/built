import { Pipe } from './pipe.js'
import { ToString } from './to-string.js'
import { FromEntities } from './from-entities.js'
import { ValidateHtml } from './validate-html.js'

export function ValidateText(str) {
    const original = str
    const reasons = []
    const converted = Pipe(ToString, FromEntities)(str)
    let val = converted.value

    if (!val || !val.length || converted.type !== 'string') {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: reasons.concat(['no value'])
        }
    }

    const htmlResults = ValidateHtml(val)

    htmlResults.reason = htmlResults.reason.concat(reasons)

    return htmlResults
}