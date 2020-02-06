import { IfInvalid } from './if-invalid.js'
import { Pipe } from './pipe.js'
import { ToString } from './to-string.js'
import { FromEntities } from './from-entities.js'

export function ValidateUsPhone(val) {
    const original = val
    const reason = []
    const converted = Pipe(ToString, FromEntities, IfInvalid(''))(val)
    const value = converted.value.replace(/[^\d]+/g, '').slice(0, 10)

    if (value.length < 10) {
        reason.push('needs at least 10 digits')
    }

    return {
        original: original,
        valid: reason.length === 0,
        sanitized: value,
        reason: reason
    }
}