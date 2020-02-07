import { FromEntities } from './from-entities.js'
import { Pipe } from './pipe.js'
import { ToString } from './to-string.js'
import { IfInvalid } from './if-invalid.js'

export function ValidateIntlPhone(val) {
    const original = val
    const reason = []
    const converted = Pipe(ToString, FromEntities, IfInvalid(''))(val)
    const value = converted.value.replace(/[^\d]+/g, '').slice(0, 15)

    if (value.length < 11) {
        reason.push('needs at least 11 digits')
    }

    return {
        original: original,
        valid: reason.length === 0,
        sanitized: value,
        reason: reason
    }
}