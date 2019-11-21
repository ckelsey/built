import { Get } from '../..'
import { processedNullValue } from './definitions'
import { sanitizeValue, isEmpty, InputFieldFormatValue, maxMin, pattern } from './methods-value'

const processedErrorText = sanitized => sanitized && sanitized.reason ? sanitized.reason.join(`, `) : ``

export const multiProcessedValue = (host, value) => {

    const sanitized = host.type.map((t, i) => sanitizeValue(value[i], t.type, host.allowhtml, host.disallowhtml))

    host.processedError = sanitized.map(processedErrorText).filter(s => !!s).join(`, `)

    return sanitized
}

const getVal = (host, value) => {
    const sanitized = sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml)
    const maxMined = maxMin(host, pattern(host, sanitized.sanitized))
    let mustHaveValid = true
    let matchInputValid = true

    if (host.musthave) {
        mustHaveValid = new RegExp(host.musthave, `g`).test(maxMined.value)
    }

    if (host.matchinput) {
        matchInputValid = maxMined.value === Get(host, `matchinput.value`)
    }

    sanitized.valid = sanitized.valid && maxMined.valid && mustHaveValid && matchInputValid

    if (maxMined.errorText) { sanitized.reason.push(maxMined.errorText) }

    if (!mustHaveValid) {
        sanitized.reason.push(`Invalid value.`)
    }

    if (!matchInputValid) {
        const toMatch = host.matchinput
        const label = toMatch.label || toMatch.getAttribute(`label`)
        const placeholder = toMatch.placeholder || toMatch.getAttribute(`placeholder`)
        const name = toMatch.name || toMatch.getAttribute(`name`)
        const toMatchName = label || placeholder || name

        sanitized.reason.push(`Value does not match${toMatchName ? ` '${toMatchName}'` : ``}.`)
    }

    host.processedError = processedErrorText(sanitized)

    sanitized.sanitized = maxMined.value

    return sanitized
}

export const processedValue = host => ({
    get() {
        const value = Get(host.state, `value.value`)

        if (isEmpty(value)) { return processedNullValue() }

        return getVal(host, value)
    }
})

export const multiFormattedValue = (host, value) => {
    const sanitized = host.type.map(
        (t, i) =>
            sanitizeValue(
                InputFieldFormatValue(value[i], host.format || t.type).value,
                t.type,
                host.allowhtml,
                host.disallowhtml
            )
    )

    const values = []
    const errors = []

    sanitized.forEach(s => {
        values.push(s.sanitized)
        errors.push(processedErrorText(s))
    })

    host.processedError = errors.filter(s => !!s).join(`, `)

    return values
}

export const formattedValue = host => ({
    get() {
        const value = Get(host.state, `value.value`)

        if (isEmpty(value)) { return processedNullValue().sanitized }

        const formatted = InputFieldFormatValue(value, host.format || host.type)

        return getVal(host, formatted.value).sanitized
    }
})

export const labelContainer = host => ({
    get() {
        if (!host.shadowRoot) { return }
        return host.shadowRoot.querySelector(`.input-field-label-${host.labelposition}`)
    }
})

export const valid = host => ({
    get() {
        return (!host.processedError || host.processedError === ``) && Get(host, `elements.input.validity.valid`)
    }
})

export const validationMessage = host => ({
    get() {
        return [
            host.processedError,
            Get(host, `elements.input.validationMessage`)
        ].filter(m => !!m)
    }
})