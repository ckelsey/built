import { ValidateNumber } from '../../utils/validate-number.js'
import { ValidateEmail } from '../../utils/validate-email.js'
import { ValidateUsPhone } from '../../utils/validate-us-phone.js'
import { ValidateIntlPhone } from '../../utils/validate-intl-phone.js'
import { ValidateUsZip } from '../../utils/validate-us-zip.js'
import ValidateUrl from '../../utils/validate-url.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { ValidateText } from '../../utils/validate-text.js'

function parseNoValue(validated) {
    if (validated && !validated.valid && validated.reason[0] === `no value`) {
        validated.reason.shift()
        validated.valid = true
    }

    return validated
}

export function valueValidation(val, type, allowhtml, disallowhtml) {
    if (type === `number` || type === `month`) {
        const validated = ValidateNumber(val)
        validated.sanitized = validated.sanitized === undefined || validated.sanitized === null || validated.sanitized === `` ? validated.sanitized : `${validated.sanitized}`
        return parseNoValue(ValidateNumber(val))
    }

    if (type === `email`) {
        return parseNoValue(ValidateEmail(val))
    }

    if (type === `tel` || type === `usphone`) {
        return parseNoValue(ValidateUsPhone(val))
    }

    if (type === `intlphone`) {
        return parseNoValue(ValidateIntlPhone(val))
    }

    if (type === `uszip`) {
        return parseNoValue(ValidateUsZip(val))
    }

    if (type === `url`) {
        return parseNoValue(ValidateUrl(val))
    }

    if (allowhtml || disallowhtml) {
        return parseNoValue(ValidateHtml(val, allowhtml, disallowhtml))
    }

    return parseNoValue(ValidateText(val))
}