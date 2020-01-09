import { textareaHeight } from './methods-elements.js'
import { processedFileValue } from './definitions.js'
import { ValidateNumber } from '../../utils/validate-number.js'
import { ValidateBool } from '../../utils/validate-bool.js'
import { ValidateEmail } from '../../utils/validate-email.js'
import { ValidateUsPhone } from '../../utils/validate-us-phone.js'
import { ValidateIntlPhone } from '../../utils/validate-intl-phone.js'
import { ValidateUsZip } from '../../utils/validate-us-zip.js'
import ValidateUrl from '../../utils/validate-url.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { ValidateText } from '../../utils/validate-text.js'
import { ToSlice } from '../../utils/to-slice.js'
import { ToSplit } from '../../utils/to-split.js'
import { ToJoin } from '../../utils/to-join.js'
import { ToMatch } from '../../utils/to-match.js'
import { ToMatchAll } from '../../utils/to-match-all.js'
import { ToReplace } from '../../utils/to-replace.js'
import { ToUpperCase } from '../../utils/to-upper-case.js'
import { ToLowerCase } from '../../utils/to-lower-case.js'
import { ToCapitalize } from '../../utils/to-capitalize.js'
import { AfterEveryNth } from '../../utils/after-every-nth.js'
import { BeforeEveryNth } from '../../utils/before-every-nth.js'
import { TMonad } from '../../utils/t-monad.js'
import { ToPhone } from '../../utils/to-phone.js'
import { ToIntlPhone } from '../../utils/to-intl-phone.js'
import { ToUsZip } from '../../utils/to-us-zip.js'
import { Pipe } from '../../utils/pipe.js'
import { RemoveMeta } from '../../utils/remove-meta.js'
import { IsAutoFilled } from '../../utils/is-autofilled.js'
import { SetAttribute } from '../../utils/set-attribute.js'
import { SetCaret } from '../../utils/set-caret.js'

export const setMaskPositions = (input, positions) => {
    if (!input) { return }

    if (input.setSelectionRange) {
        input.setSelectionRange(positions[0], positions[1])
    } else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd(`character`, positions[1])
        range.moveStart(`character`, positions[0])
        range.select()
    }
}

export const valueToMask = (value, masks, positions) => {
    const initial = `+_ (___) ___-____`
    const newPositions = positions.slice(0)

    if (!value) { return { value: initial, positions: [1, 1] } }

    const incrementPositions = (index) => {
        if (positions[0] > index) {
            newPositions[0] = newPositions[0] + 1
        }

        if (positions[1] > index) {
            newPositions[1] = newPositions[1] + 1
        }
    }

    const getAreaCode = v => {
        const parts = v.split(/\D/g)
        let i = 0

        while (i < parts.length) {
            if (parts[i] !== ``) { return parts[i] }
            i = i + 1
        }

        return ``
    }

    const valueAreaCode = getAreaCode(value)
    const possibles = []
    let mask
    let i = masks.length

    while (!mask && i--) {
        const maskAreaCode = getAreaCode(masks[i].mask)

        if (valueAreaCode === maskAreaCode) {
            mask = masks[i].mask
            break
        }

        if (maskAreaCode.indexOf(valueAreaCode) === 0 || valueAreaCode.indexOf(maskAreaCode) === 0) {
            possibles.push(masks[i].mask)
        }
    }


    if (!mask && possibles[0]) {
        mask = possibles[0]
    }

    if (!mask) { return { value: ``, positions } }

    const valueParts = value.split(``)
    const newValue = mask
        .split(``)
        .map((char, index) => {
            if (char === valueParts[0]) {
                valueParts.shift()
                return char
            }

            if (char === `#`) {
                if (!valueParts.length) {
                    // incrementPositions(index)
                    return `_`
                }

                let v = valueParts.shift()

                while (v && /\D/.test(v)) {
                    v = valueParts.shift()
                }

                return v
            }

            if (/\d/.test(char)) {
                valueParts.shift()
            } else {
                incrementPositions(index)
            }

            return char
        })

    return {
        value: newValue.join(``),
        positions: newPositions
    }
}

export const valueFromMask = (value, masks) => {
    if (!value) { return value }

    const split = v => v.split(/\D/g).filter(v => !!v)
    const valueParts = split(value)
    let mask
    let i = masks.length

    while (i--) {
        const maskCode = split(masks[i].mask)[0]
        if (valueParts[0] === maskCode || maskCode.indexOf(valueParts[0]) > -1) {
            mask = masks[i].mask
        }
    }

    if (!mask) { return value }
}

export const masker = (input, value, positions, masks, unmask = false) => {
    if (!masks || masks.length === 0) {
        return {
            input,
            value,
            newValue: value,
            masks,
            positions
        }
    }

    let newValue

    if (unmask) {
        newValue = valueFromMask(value, masks)
    } else {
        newValue = valueToMask(value, masks, positions)
    }

    input.value = newValue.value || ``

    setMaskPositions(input, newValue.positions)

    return {
        input,
        value,
        newValue: newValue.value,
        masks,
        positions: newValue.positions
    }
}

export const inputCaretPositions = input => {
    return !input ? [0, 0] : [input.selectionStart || 0, input.selectionEnd || 0]
}

export const clearInput = host => host.value = ``

export const setError = host => error => {
    host.processedError = error
    host.invalid = !error ? false : true
}

export const isEmpty = val => (val === `` || val === null || val === undefined)

export const sanitizeValue = (val, type, allowhtml, disallowhtml) => {
    if (Array.isArray(type)) {
        return type.map((t, i) => sanitizeValue(val[i], t.type, allowhtml, disallowhtml))
    }

    let validation

    if ([`number`, `month`].indexOf(type) > -1) {
        validation = ValidateNumber(val)
    } else if ([`radio`, `checkbox`].indexOf(type) > -1) {
        validation = ValidateBool(val)
    } else if (type === `email`) {
        validation = ValidateEmail(val)
    } else if ([`tel`, `usphone`].indexOf(type) > -1) {
        validation = ValidateUsPhone(val)
    } else if (type === `intlphone`) {
        validation = ValidateIntlPhone(val)
    } else if (type === `uszip`) {
        validation = ValidateUsZip(val)
    } else if (type === `url`) {
        validation = ValidateUrl(val)
    } else if (type === `file`) {
        validation = processedFileValue(val)
    } else {
        if (allowhtml || disallowhtml) {
            validation = ValidateHtml(val, allowhtml, disallowhtml)
        } else {
            validation = ValidateText(val)
        }
    }


    if (validation && !validation.valid && validation.reason[0] === `no value`) {
        validation.reason.shift()
        validation.valid = true
    }

    return validation
}

const getFunction = (functionString, args = []) => {
    if ([`Slice`, `slice`].indexOf(functionString) > -1) {
        return ToSlice.apply(null, args || [])
    } else if ([`Split`, `split`].indexOf(functionString) > -1) {
        return ToSplit(args[0])
    } else if ([`Join`, `join`].indexOf(functionString) > -1) {
        return ToJoin(args[0])
    } else if ([`Match`, `match`].indexOf(functionString) > -1) {
        return ToMatch.call(null, args[0])
    } else if ([`MatchAll`].indexOf(functionString) > -1) {
        return ToMatchAll.call(null, args[0])
    } else if ([`Replace`, `replace`].indexOf(functionString) > -1) {
        return ToReplace.apply(null, args || [])
    } else if ([`UpperCase`, `toUpperCase`].indexOf(functionString) > -1) {
        return ToUpperCase
    } else if ([`LowerCase`, `toLowerCase`].indexOf(functionString) > -1) {
        return ToLowerCase
    } else if ([`Capitalize`].indexOf(functionString) > -1) {
        return ToCapitalize
    } else if ([`AfterEveryNth`].indexOf(functionString) > -1) {
        return AfterEveryNth.apply(null, args || [])
    } else if ([`BeforeEveryNth`].indexOf(functionString) > -1) {
        return BeforeEveryNth.apply(null, args || [])
    }

    return TMonad
}

export const InputFieldFormatValue = (value, format) => {
    if (!format) { return TMonad(value) }

    let Format

    if (typeof format === `string`) {
        try {
            Format = JSON.parse(format).slice()
        } catch (error) {
            if ([`tel`, `telephone`, `phone`, `usphone`].indexOf(format) > -1) {
                return ToPhone(value)
            } else if (format === `intlphone`) {
                return ToIntlPhone(value)
            } else if (format === `uszip`) {
                return ToUsZip(value)
            }

            return TMonad(value)
        }
    } else if (!Array.isArray(format)) {
        return TMonad(value)
    }

    const functions = Format
        .map(f => {
            if (!f) { return false }
            if (!Array.isArray(f)) { return getFunction(f) }
            return getFunction(f.slice(0, 1)[0], f.slice(1))
        })
        .filter(f => !!f)

    return Pipe.apply(null, functions)(value)
}

export const maxMin = (host, value) => {
    const nonStringTypes = [`number`, `checkbox`, `radio`, `file`]
    let valid = true
    let errorText = ``

    if (value === undefined || value === null) {
        return { value, valid, errorText }
    }

    if (host.type === `number`) {
        if (!!host.max && host.max < value) {
            value = host.max
        }

        if (!!host.min && host.min > value) {
            value = host.min
        }
    }

    if (nonStringTypes.indexOf(host.type) === -1) {
        if (!!host.max && host.max < value.length) {
            value = value.slice(0, host.max)
        }

        if (!!host.min && !!value && host.min > value.length && !host.focused) {
            errorText = `Must be at least ${host.min} characters`
            valid = false
        }
    }

    return { value, valid, errorText }
}

export const pattern = (host, value) => {
    if (!host.pattern) { return value }
    return RemoveMeta(value, host.pattern).value
}

export const getFileValue = input => !input || !input.files || input.files.length === 0 ? null : Array.from(input.files)
const getDroppedFiles = value => Array.isArray(value) && value.filter(f => f instanceof File).length ? value : null

export const processValue = host => {
    const input = host.elements.input

    if (!input) { return }

    const processed = host.processedValue
    const sanitized = processed.sanitized

    host.processedError = processed.reason.join(`, `)

    const errors = host.validationMessage
    const valid = (errors.length ? false : processed.valid) || (!host.focused && host.valid)
    const autofilled = IsAutoFilled(input)
    const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
    const empty = stringEmpty && !autofilled

    host.count = host.type === `number` ? sanitized : sanitized ? sanitized.length : 0
    host.elements.container.classList[sanitized ? `add` : `remove`](`checked`)

    if (host.type === `file`) {

        const files = getDroppedFiles(sanitized) || getFileValue(input)
        const filenames = !files ? [] : files.map(f => f.name)
        SetAttribute(host.elements.inputContainer, `title`, filenames.join(`, `))

        try {
            input.files = (new ClipboardEvent(``).clipboardData || new DataTransfer).files
        } catch (error) { }

        if (!filenames.length && host.pathvalue) {
            host.notempty = true
            return
        } else if (filenames.length) {
            host.pathvalue = ``
        }

    } else {
        try {
            const selectionEnd = input.selectionEnd
            let cursorPosition = selectionEnd

            // masker(input, sanitized, [input.selectionStart, input.selectionEnd], countries)

            const formatted = InputFieldFormatValue(sanitized, host.format || host.type)
            const newValue = formatted.value || ``
            const current = input.value

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
            }

            input.cursorPosition = cursorPosition

            if (current !== newValue || host.type === `intlphone`) {
                input.value = newValue

                if (formatted.stringChanges && formatted.stringChanges.length) {
                    SetCaret(input, cursorPosition, host.shadowRoot)
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