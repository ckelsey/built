import { FromEntities } from '../convert/entities'
import ToString from '../convert/to_string'
import pipe from '../pipe'
import IfInvalid from '../convert/if_invalid'

const ValidateIntlPhone = /*#__PURE__*/ val => {
    const original = val
    const reason = []
    const converted = pipe(ToString, FromEntities, IfInvalid(``))(val)
    const value = converted.value.replace(/[^\d]+/g, ``)

    if (value.length < 11) {
        reason.push(`needs at least 11 digits`)
    }

    return {
        original,
        valid: reason.length === 0,
        sanitized: original,
        reason
    }
}

export default ValidateIntlPhone