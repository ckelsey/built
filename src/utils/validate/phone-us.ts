import { IfInvalid } from '../convert/if'
import { FromEntities } from '../convert/entities'
import { ToString } from '../convert/string'
import pipe from '../pipe'

const ValidateUsPhone = /*#__PURE__*/ val => {
    const original = val
    const reason = []
    const converted = pipe(ToString, FromEntities, IfInvalid(``))(val)
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

export default ValidateUsPhone