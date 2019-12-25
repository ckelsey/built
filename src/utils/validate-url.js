import { FromEntities, Pipe, ToString } from '..'

export function ValidateUrl(str) {
    const original = str
    const converted = Pipe(ToString, FromEntities)(str)
    const val = converted.value

    if (!str || str.length === 0 || converted.type !== `string`) {
        return {
            original: str,
            valid: false,
            sanitized: null,
            reason: [`no value`]
        }
    }

    const reasons = []
    const link = document.createElement(`a`)
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