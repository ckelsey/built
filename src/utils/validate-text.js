import { Pipe } from './pipe.js'
import { ToString } from './to-string.js'
import { FromEntities } from './from-entities.js'

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

    return {
        original,
        valid: reasons.length === 0,
        sanitized: val,
        reason: reasons
    }
}