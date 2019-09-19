import { FromEntities } from '../convert/entities'
import { ToString } from '../convert/string'
import pipe from '../pipe'
import ValidateHtml from './html'

const ValidateText = str => {
    const original = str
    const reasons = []
    const converted = pipe(ToString, FromEntities)(str)
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

export default ValidateText