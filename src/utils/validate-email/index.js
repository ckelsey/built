import { ValidateHtml, Pipe, ToString, FromEntities } from '../..'

export function ValidateEmail(str) {
    const original = str
    const converted = Pipe(ToString, FromEntities)(str)
    let val = converted.value

    if (!val || !val.length || converted.type !== `string`) {
        return {
            original,
            valid: false,
            sanitized: val,
            reason: [`no value`]
        }
    }

    const reasons = []
    const split = val.split(`@`)

    if (!split[0] || !split[0].length) {
        reasons.push(`missing username`)
    }

    if (split.length < 2) {
        reasons.push(`missing @ symbol`)
        reasons.push(`missing domain, i.e. "mail.com"`)
    }

    if (split.length > 1) {
        const domain = split[1].split(`.`)

        if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
            reasons.push(`missing domain, i.e. "mail.com"`)
        }
    }

    if (reasons.length) {
        return {
            original,
            valid: false,
            sanitized: val,
            reason: reasons
        }
    }

    return ValidateHtml(val)
}