import { isMobile } from '../../utils/platform'
import { ValidateNumber, ValidateBool, ValidateEmail, ValidateHtml, ValidateText, ValidateUsZip, ValidateUsPhone } from '../../utils/validate'
import { processedNullValue } from './definitions'
import { isAutoFilled, setInputCaret } from '../../utils/html'
import { Split, UpperCase, LowerCase, Capitalize, Replace, Match, MatchAll, AfterEveryNth, BeforeEveryNth } from '../../utils/convert/string'
import { ToPhone } from '../../utils/convert/phone'
import { ToUsZip } from '../../utils/convert/postal'
import { textareaHeight } from './methods-elements'
import { Tmonad } from '../../utils/convert/t-monad'
import { Join, Slice } from '../../utils/convert/array'
import pipe from '../../utils/pipe'

export const clearInput = host => () => host.value = ``

export const isEmpty = val => (val === `` || val === null || val === undefined)

export const sanitizeValue = (val: any, type, allowhtml, disallowhtml) => {
    switch (type) {
        case `number`:
        case `month`:
            return ValidateNumber(val)
        case `radio`:
        case `checkbox`:
            return ValidateBool(val)
        case `email`:
            return ValidateEmail(val)
        case `tel`:
        case `usphone`:
            return ValidateUsPhone(val)
        case `uszip`:
            return ValidateUsZip(val)
        default:
            if (allowhtml || disallowhtml) {
                return ValidateHtml(val, allowhtml, disallowhtml)
            }

            return ValidateText(val)
    }

    // return { valid: true, sanitized: val, original: val, reason: [] }
}

const getFunction = (functionString, args = []) => {
    switch (functionString) {
        case `Slice`:
        case `slice`:
            return Slice.apply(null, args || [])

        case `Split`:
        case `split`:
            return Split(args[0])

        case `Join`:
        case `join`:
            return Join(args[0])

        case `Match`:
        case `match`:
            return Match.call(null, args[0])

        case `MatchAll`:
            return MatchAll.call(null, args[0])

        case `Replace`:
        case `replace`:
            return Replace.apply(null, args || [])

        case `UpperCase`:
        case `toUpperCase`:
            return UpperCase

        case `LowerCase`:
        case `toLowerCase`:
            return LowerCase

        case `Capitalize`:
            return Capitalize

        case `AfterEveryNth`:
            return AfterEveryNth.apply(null, args || [])

        case `BeforeEveryNth`:
            return BeforeEveryNth.apply(null, args || [])
    }

    return Tmonad
}

export const InputFieldFormatValue = (value, format) => {
    if (!format) { return Tmonad(value) }

    let Format

    if (typeof format === `string`) {
        try {
            Format = JSON.parse(format).slice()
        } catch (error) {
            switch (format) {
                case `tel`:
                case `telephone`:
                case `phone`:
                case `usphone`:
                    return ToPhone(value)
                case `uszip`:
                    return ToUsZip(value)
            }

            return Tmonad(value)
        }
    } else if (!Array.isArray(format)) {
        return Tmonad(value)
    }

    const functions = Format
        .map(f => {
            if (!f) { return false }
            if (!Array.isArray(f)) { return getFunction(f) }
            return getFunction(f.slice(0, 1)[0], f.slice(1))
        })
        .filter(f => !!f)

    return pipe.apply(null, functions)(value)
}

export const processThis = host => value => {
    if (isEmpty(value)) { return processedNullValue() }
    return sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml)
}

export const processValue = host => () => {
    const type = host.type
    const input = host.elements.input
    const processed = host.processedValue
    const sanitized = processed.sanitized
    const errors = processed.reason
    const valid = processed.valid
    const autofilled = isAutoFilled(input)
    const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
    const empty = stringEmpty && !autofilled

    host.processedErrorText = errors.join(`, `)
    host.count = type === `number` ? sanitized : sanitized ? sanitized.length : 0
    host.elements.container.classList[!!sanitized ? `add` : `remove`](`checked`)

    if (type !== `select` || isMobile) {
        try {
            const selectionEnd = input.selectionEnd
            let cursorPosition = selectionEnd
            const formatted = InputFieldFormatValue(sanitized, host.format || host.type)
            const newValue = formatted.value || ``
            const current = input.value

            if (current !== newValue) {
                input.value = newValue

                if (formatted.stringChanges && formatted.stringChanges.length) {
                    formatted.stringChanges.forEach(change => {
                        if (!!change.added && !!change.removed && change.start < cursorPosition) {
                            return cursorPosition = cursorPosition + (change.added.length - change.removed.length)
                        }

                        if (!!change.removed && change.start < cursorPosition) {
                            return cursorPosition = cursorPosition - change.removed.length
                        }

                        if (!!change.added && change.start < cursorPosition) {
                            return cursorPosition = cursorPosition + change.added.length
                        }
                    })

                    setInputCaret(input, cursorPosition, host.shadowRoot)
                }
            }

        } catch (error) { }
    }

    textareaHeight(host.resize, input)

    host.notempty = !empty

    if (valid) { return host.invalid = false }
    if (empty) { return host.invalid = false }
    if (!host.focused) { return host.invalid = true }
}