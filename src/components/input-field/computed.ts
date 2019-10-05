import Get from '../../utils/get'
import { processedNullValue } from './definitions'
import { sanitizeValue, isEmpty, InputFieldFormatValue, maxMin, pattern } from './methods-value'

const processedErrorText = sanitized => sanitized && sanitized.reason ? sanitized.reason.join(`, `) : ``

export const multiProcessedValue = (host, value) => {

    const sanitized = host.type.map((t, i) => sanitizeValue(value[i], t.type, host.allowhtml, host.disallowhtml))

    host.processedErrorText = sanitized.map(processedErrorText).filter(s => !!s).join(`, `)

    return sanitized
}

const getVal = (host, value) => {
    const sanitized = sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml)
    const maxMined = maxMin(host, pattern(host, sanitized.sanitized))
    sanitized.valid = !sanitized.valid ? false : maxMined.valid

    if (!!maxMined.errorText) { sanitized.reason.push(maxMined.errorText) }

    host.processedErrorText = processedErrorText(sanitized)

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

    host.processedErrorText = errors.filter(s => !!s).join(`, `)

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