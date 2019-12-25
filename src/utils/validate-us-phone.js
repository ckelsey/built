import { IfInvalid, FromEntities, ToString, Pipe } from '..'

export function ValidateUsPhone(val) {
    const original = val
    const reason = []
    const converted = Pipe(ToString, FromEntities, IfInvalid(``))(val)
    const value = converted.value.replace(/[^\d]+/g, ``)

    if (value.length < 10) {
        reason.push(`needs at least 10 digits`)
    }

    return {
        original,
        valid: reason.length === 0,
        sanitized: original,
        reason
    }
}