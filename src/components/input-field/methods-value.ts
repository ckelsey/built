import { ValidateNumber, ValidateBool, ValidateEmail, ValidateHtml, ValidateText, ValidateUsZip, ValidateUsPhone, ValidateUrl, ValidateIntlPhone } from '../../utils/validate'
import { isAutoFilled, setInputCaret, getInvalidMessage } from '../../utils/html'
import { Split, UpperCase, LowerCase, Capitalize, Replace, Match, MatchAll, AfterEveryNth, BeforeEveryNth } from '../../utils/convert/string'
import { ToPhone, ToIntlPhone } from '../../utils/convert/phone'
import { ToUsZip } from '../../utils/convert/postal'
import { textareaHeight, isMultiInput } from './methods-elements'
import { Tmonad } from '../../utils/convert/t-monad'
import { Join, Slice } from '../../utils/convert/array'
import pipe from '../../utils/pipe'
import { processedFileValue } from './definitions'
import { setAttribute } from '../../utils/html/attr'
import { RemoveMeta } from '../../utils/convert/meta'

export const setMaskPositions = (input, positions) => {
    if (!input) { return }

    if (input.setSelectionRange) {
        input.setSelectionRange(positions[0], positions[1])
    } else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', positions[1])
        range.moveStart('character', positions[0]);
        range.select();
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
    host.errortext = error
    host.invalid = true
}

export const isEmpty = val => (val === `` || val === null || val === undefined)

export const sanitizeValue = (val: any, type, allowhtml, disallowhtml) => {
    if (Array.isArray(type)) {
        return type.map((t, i) => sanitizeValue(val[i], t.type, allowhtml, disallowhtml))
    }

    let validation

    switch (type) {
        case `number`:
        case `month`:
            validation = ValidateNumber(val)
        case `radio`:
        case `checkbox`:
            validation = ValidateBool(val)
        case `email`:
            validation = ValidateEmail(val)
        case `tel`:
        case `usphone`:
            validation = ValidateUsPhone(val)
        case `intlphone`:
            validation = ValidateIntlPhone(val)
        case `uszip`:
            validation = ValidateUsZip(val)
        case `url`:
            validation = ValidateUrl(val)
        case `file`:
            validation = processedFileValue(val)
        default:
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
                case `intlphone`:
                    return ToIntlPhone(value)
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

export const maxMin = (host, value) => {
    const nonStringTypes = [`number`, `checkbox`, `radio`, `file`]

    if (value === undefined || value === null) {
        return value
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

        if (!!host.min && host.min > value.length) {
            value = value.slice(0, host.min)
        }
    }

    return value
}

export const pattern = (host, value) => {
    if (!host.pattern) { return value }
    return RemoveMeta(value, host.pattern).value
}

export const getFileValue = input => !input || !input.files || input.files.length === 0 ? null : Array.from(input.files)
const getDroppedFiles = value => Array.isArray(value) && value.filter(f => f instanceof File).length ? value : null

const multiProcessValue = (host, _input) => {
    const processed = host.processedValue
    const sanitized = processed.map(s => s.sanitized)
    const errors = processed.map(s => s.reason.join(``))
    const valid = errors
        .map((e, i) => {
            if (!!e && !!sanitized[i]) {
                return false
            }

            return true
        })
        .filter(e => !e)
        .length === 0

    const empty = sanitized.filter(s => !!s).length === 0

    // sanitized.forEach((s, i) => {
    // TODO
    // })

    host.notempty = !empty

    if (valid) { return host.invalid = false }
    if (empty) { return host.invalid = false }
    if (!host.focused) { return host.invalid = true }
}

export const processValue = host => {
    const input = host.elements.input

    if (!input) { return }

    if (isMultiInput(host)) {
        return multiProcessValue(host, input)
    }

    const validationMessage = [getInvalidMessage(input)].filter(v => !!v)
    const processed = host.processedValue
    const sanitized = processed.sanitized
    const errors = validationMessage.concat(processed.reason)
    const valid = errors.length ? false : processed.valid
    const autofilled = isAutoFilled(input)
    const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
    const empty = stringEmpty && !autofilled

    host.processedErrorText = errors.join(`, `)
    host.count = host.type === `number` ? sanitized : sanitized ? sanitized.length : 0
    host.elements.container.classList[!!sanitized ? `add` : `remove`](`checked`)

    if (host.type === `file`) {

        const files = getDroppedFiles(sanitized) || getFileValue(input)
        const filenames = !files ? [] : files.map(f => f.name)
        setAttribute(host.elements.inputContainer, `title`, filenames.join(`, `))

        try {
            input.files = (new ClipboardEvent("").clipboardData || new DataTransfer).files
        } catch (error) { }

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