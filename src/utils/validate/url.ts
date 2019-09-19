import pipe from '../pipe'
import { ToString } from '../convert/string'
import { FromEntities } from '../convert/entities'

const ValidateUrl = /*#__PURE__*/ str => {
    const original = str
    const converted = pipe(ToString, FromEntities)(str)
    const val = converted.value

    if (!str || str.length === 0 || converted.type !== `string`) {
        return {
            original: str,
            valid: false,
            sanitized: null,
            reason: [`no value`]
        }
    }

    const reasons: string[] = []
    const link = document.createElement('a')
    link.href = val

    if (!link.protocol) {
        reasons.push(`Missing url protocol`)
    }

    if (!link.host) {
        reasons.push(`Missing url host`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: val,
        reason: reasons
    }
}

export default ValidateUrl