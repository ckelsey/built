import { Pipe, ValidateHtml, ToString, FromEntities } from '../..'

export function ValidateText(str) {
    const original = str
    const reasons = []
    const converted = Pipe(ToString, FromEntities)(str)
    let val = converted.value

    if (!val || !val.length || converted.type !== `string`) {
        return {
            original,
            valid: false,
            sanitized: val,
            reason: reasons.concat([`no value`])
        }
    }

    const htmlResults = ValidateHtml(val)

    htmlResults.reason = htmlResults.reason.concat(reasons)

    return htmlResults
}