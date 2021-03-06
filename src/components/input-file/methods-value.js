import {
    TMonad, Pipe, ToSplit, ValidateNumber, ValidateBool, ValidateEmail,
    ValidateHtml, ValidateText, ValidateUsZip, ValidateUsPhone, ValidateUrl,
    ValidateIntlPhone, ToUsZip, ToIntlPhone, ToJoin, SetAttribute, IsAutoFilled,
    SetCaret, ToPhone, RemoveMeta, ToSlice, ToMatchAll, ToMatch, ToReplace,
    AfterEveryNth, BeforeEveryNth, ToUpperCase, ToLowerCase, ToCapitalize
} from '../..'
import { processedFileValue } from '../input-shared/definitions.js'

const supportsInternals = 'ElementInternals' in window && 'setFormData' in window.ElementInternals

export const setMaskPositions = (input, positions) => {
    if (!input) { return }

    if (input.setSelectionRange) {
        input.setSelectionRange(positions[0], positions[1])
    } else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', positions[1])
        range.moveStart('character', positions[0])
        range.select()
    }
}

export const valueToMask = (value, masks, positions) => {
    const initial = '+_ (___) ___-____'
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
            if (parts[i] !== '') { return parts[i] }
            i = i + 1
        }

        return ''
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

    if (!mask) { return { value: '', positions } }

    const valueParts = value.split('')
    const newValue = mask
        .split('')
        .map((char, index) => {
            if (char === valueParts[0]) {
                valueParts.shift()
                return char
            }

            if (char === '#') {
                if (!valueParts.length) {
                    // incrementPositions(index)
                    return '_'
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
        value: newValue.join(''),
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

    input.value = newValue.value || ''

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

export const clearInput = host => host.value = ''

export const setError = host => error => {
    host.processedError = error
    host.invalid = !error ? false : true
}

export const isEmpty = val => (val === '' || val === null || val === undefined)

export const sanitizeValue = (val, type, allowhtml, disallowhtml) => {
    if (Array.isArray(type)) {
        return type.map((t, i) => sanitizeValue(val[i], t.type, allowhtml, disallowhtml))
    }

    let validation

    switch (type) {
        case 'number':
        case 'month':
            validation = ValidateNumber(val)
            break
        case 'radio':
        case 'checkbox':
            validation = ValidateBool(val)
            break
        case 'email':
            validation = ValidateEmail(val)
            break
        case 'tel':
        case 'usphone':
            validation = ValidateUsPhone(val)
            break
        case 'intlphone':
            validation = ValidateIntlPhone(val)
            break
        case 'uszip':
            validation = ValidateUsZip(val)
            break
        case 'url':
            validation = ValidateUrl(val)
            break
        case 'file':
            validation = processedFileValue(val)
            break
        default:
            if (allowhtml || disallowhtml) {
                validation = ValidateHtml(val, allowhtml, disallowhtml)
            } else {
                validation = ValidateText(val)
            }
    }

    if (validation && !validation.valid && validation.reason[0] === 'no value') {
        validation.reason.shift()
        validation.valid = true
    }

    return validation
}

const getFunction = (functionString, args = []) => {
    switch (functionString) {
        case 'Slice':
        case 'slice':
            return ToSlice.apply(null, args || [])

        case 'Split':
        case 'split':
            return ToSplit(args[0])

        case 'Join':
        case 'join':
            return ToJoin(args[0])

        case 'Match':
        case 'match':
            return ToMatch.call(null, args[0])

        case 'MatchAll':
            return ToMatchAll.call(null, args[0])

        case 'Replace':
        case 'replace':
            return ToReplace.apply(null, args || [])

        case 'UpperCase':
        case 'toUpperCase':
            return ToUpperCase

        case 'LowerCase':
        case 'toLowerCase':
            return ToLowerCase

        case 'Capitalize':
            return ToCapitalize

        case 'AfterEveryNth':
            return AfterEveryNth.apply(null, args || [])

        case 'BeforeEveryNth':
            return BeforeEveryNth.apply(null, args || [])
    }

    return TMonad
}

export const InputFieldFormatValue = (value, format) => {
    if (!format) { return TMonad(value) }

    let Format

    if (typeof format === 'string') {
        try {
            Format = JSON.parse(format).slice()
        } catch (error) {
            switch (format) {
                case 'tel':
                case 'telephone':
                case 'phone':
                case 'usphone':
                    return ToPhone(value)
                case 'intlphone':
                    return ToIntlPhone(value)
                case 'uszip':
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





export const getFileValue = input => !input || !input.files || input.files.length === 0 ? null : Array.from(input.files)
const getDroppedFiles = value => Array.isArray(value) && value.filter(f => f instanceof File).length ? value : null