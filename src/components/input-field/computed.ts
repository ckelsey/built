import Get from '../../utils/get'
import { processedNullValue } from './definitions'
import { sanitizeValue, isEmpty, InputFieldFormatValue } from './methods-value'

export const processedValue = host => ({
    get() {
        const value = Get(host.state, `value.value`)

        if (isEmpty(value)) { return processedNullValue() }

        const sanitized = sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml)
        host.processedErrorText = sanitized && sanitized.reason ? sanitized.reason.join(`, `) : ``

        return sanitized
    }
})

export const formattedValue = host => ({
    get() {
        const value = Get(host.state, `value.value`)

        if (isEmpty(value)) { return processedNullValue().sanitized }

        const formatted = InputFieldFormatValue(value, host.format || host.type)
        const sanitized = sanitizeValue(formatted.value, host.type, host.allowhtml, host.disallowhtml)
        host.processedErrorText = sanitized && sanitized.reason ? sanitized.reason.join(`, `) : ``
        return sanitized.sanitized
    }
})

export const labelContainer = host => ({
    get() {
        if (!host.shadowRoot) { return }
        return host.shadowRoot.querySelector(`.input-field-label-${host.labelposition}`)
    }
})

export const selected = host => ({
    get() {
        const selected = {
            value: ``,
            label: ``
        }

        if (host.optionElements) {
            let i = host.optionElements.length
            while (i--) {
                if (host.optionElements[i].classList.contains(`selected`)) {
                    return {
                        value: host.optionElements[i].value,
                        label: host.optionElements[i].textContent,
                        element: host.optionElements[i]
                    }
                }
            }
        }

        return selected
    }
})

export const optionElements = host => ({
    get() {
        return Array.from(host.elements.options.querySelectorAll(`.input-field-option`))
    }
})
