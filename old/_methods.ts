import { ValidateNumber, ValidateBool, ValidateEmail, ValidateText, ValidateHtml, ValidatePhone, ValidateUsZip, ValidateUsPhone } from '../../utils/validate'
import { ToRegex } from '../../utils/convert/string'
import pipe from '../../utils/pipe'
import { ToNumber } from '../../utils/convert/number'
import { IfInvalid } from '../../utils/convert/if'
import { ToBool } from '../../utils/convert/bool'
import { ToPhone } from '../../utils/convert/phone'
import { ToUsZip } from '../../utils/convert/postal'

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
            formatted = pipe(ToNumber, IfInvalid(``))(value).value
            break
        case `checkbox`:
        case `radio`:
            formatted = ToBool(value).value
            break
    }

    return formatted
}

export const InputFieldFormatValue = (value, format) => {
    if (!format) { return value }

    let f

    if (typeof format === `string`) {
        try {
            f = JSON.parse(format)
        } catch (error) {
            switch (format) {
                case `tel`:
                case `telephone`:
                case `phone`:
                case `usphone`:
                    return ToPhone(value).value
                case `uszip`:
                    return ToUsZip(value).value
            }

            return value
        }
    } else {
        f = Object.assign({}, format)
    }

    const method = f.method
    const expressionMethods = [
        `match`,
        `exec`,
        `replace`,
        `split`
    ]

    switch (method) {
        case 'pipe':
            let val = value

            val = f.fns.reduce((previous, fn) => {
                if (previous === undefined || previous === null) { return previous }

                if (fn.method === `touppercase`) {
                    return previous.toUpperCase()
                }

                let methodValues = fn.values

                if (Array.isArray(methodValues) && expressionMethods.indexOf(fn.method) > -1) {
                    methodValues = methodValues.map(v => ToRegex(v).value)
                }

                return previous[fn.method](...methodValues)
            }, val)

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

export const InputFieldValueSelect = val => ({
    original: val,
    sanitized: val,
    valid: true,
    reason: []
})

export const InputFieldSanitizeValue = (val: any, type, allowhtml, disallowhtml) => {
    switch (type) {
        case `number`:
        case `month`:
            return ValidateNumber(val)
        case `tel`:
            return ValidatePhone(val)
        case `usphone`:
            return ValidateUsPhone(val)
        case `uszip`:
            return ValidateUsZip(val)
        case `radio`:
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
