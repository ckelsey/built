import { ValidateNumber, ValidateBool, ValidateEmail, ValidateText, ValidateHtml } from '../../utils/validate'
import Convert from '../../utils/convert'

export const InputFieldInputAttributes = {
    all: [
        `autocomplete`, `autofocus`, `disabled`, `maxlength`, `name`,
        `pattern`, `placeholder`, `readonly`, `required`, `tabindex`,
        `value`, `type`, `class`
    ],
    bool: [`disabled`, `name`, `readonly`, `required`, `tabindex`, `value`, `type`, `class`]
}

export const InputFieldParseValue = (value, inputType) => {
    let formatted = value

    switch (inputType) {
        case `number`:
        case `tel`:
        case `month`:
            formatted = Convert(value).number().ifInvalid(``).value
            break;
        case `checkbox`:
        case `radio`:
            formatted = Convert(value).boolean().value
            break;
    }

    return formatted
}

export const InputFieldFormatValue = (value, format) => {
    // switch (inputType) {
    //     case `tel`:
    //         return Convert(value).phone().value
    // }

    if (!format) { return value }

    let f

    try {
        f = JSON.parse(format)
    } catch (error) {
        return value
    }

    const method = f.method

    switch (method) {
        case 'pipe':
            let val = value

            f.fns.forEach(fn => {
                if (val === undefined || val === null) { return }

                if (fn.method === `match`) {
                    return val = val[fn.method](new RegExp(fn.values[0], fn.values[1]))
                }

                val = val[fn.method](...fn.values)
            })

            return val
    }

    return value
}

export const InputFieldTextareaHeight = (resize, input) => {
    if (input.tagName.toLowerCase() !== `textarea` || resize !== `auto`) {
        return
    }

    input.style.overflow = `hidden`
    input.style.height = `inherit`
    input.style.height = `${input.scrollHeight}px`
}

export const InputFieldValueNull = () => ({
    original: ``,
    sanitized: ``,
    valid: true,
    reason: []
})

export const InputFieldValueSelect = (val) => ({
    original: val,
    sanitized: val,
    valid: true,
    reason: []
})

export const InputFieldSanitizeValue = (val: any, type, allowhtml, disallowhtml) => {
    switch (type) {
        case `number`:
        case `month`:
        case `tel`:
            return ValidateNumber(val)
        case `checkbox`:
            return ValidateBool(val)
        case `email`:
            return ValidateEmail(val)
        case `text`:
        case `textarea`:
            if (allowhtml || disallowhtml) {
                return ValidateHtml(val, allowhtml, disallowhtml)
            }

            return ValidateText(val)
    }

    return { valid: true, sanitized: val, original: val, reason: [] }
}

export const isEmpty = val => (val === `` || val === null || val === undefined)
