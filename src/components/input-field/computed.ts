import Get from '../../utils/get'
import { processedNullValue } from './definitions'
import { sanitizeValue, isEmpty, InputFieldFormatValue, maxMin, pattern } from './methods-value'
import { isMultiInput } from './methods-elements'

const processedErrorText = sanitized => sanitized && sanitized.reason ? sanitized.reason.join(`, `) : ``

export const multiProcessedValue = (host, value) => {

    const sanitized = host.type.map((t, i) => sanitizeValue(value[i], t.type, host.allowhtml, host.disallowhtml))

    host.processedErrorText = sanitized.map(processedErrorText).filter(s => !!s).join(`, `)

    return sanitized
}

export const processedValue = host => ({
    get() {
        const value = Get(host.state, `value.value`)

        if (isEmpty(value)) { return processedNullValue() }

        if (isMultiInput(host)) {
            return multiProcessedValue(host, value)
        }

        const sanitized = sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml)
        host.processedErrorText = processedErrorText(sanitized)
        sanitized.sanitized = maxMin(host, pattern(host, sanitized.sanitized))

        return sanitized
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

        if (isMultiInput(host)) {
            return multiFormattedValue(host, value)
        }

        const formatted = InputFieldFormatValue(value, host.format || host.type)

        const sanitized = sanitizeValue(formatted.value, host.type, host.allowhtml, host.disallowhtml)
        sanitized.sanitized = maxMin(host, pattern(host, sanitized.sanitized))
        host.processedErrorText = processedErrorText(sanitized)
        return sanitized.sanitized
    }
})

export const labelContainer = host => ({
    get() {
        if (!host.shadowRoot) { return }
        return host.shadowRoot.querySelector(`.input-field-label-${host.labelposition}`)
    }
})

// export const selected = host => ({
//     get() {
//         const selected = {
//             value: ``,
//             label: ``
//         }

//         if (host.optionElements) {
//             let i = host.optionElements.length
//             while (i--) {
//                 if (host.optionElements[i].classList.contains(`selected`)) {
//                     return {
//                         value: host.optionElements[i].value,
//                         label: host.optionElements[i].textContent,
//                         element: host.optionElements[i]
//                     }
//                 }
//             }
//         }

//         return selected
//     }
// })

// export const optionElements = host => ({
//     get() {
//         const dropdown = host.elements.input

//         if (!dropdown) { return [] }
//         return dropdown.optionElements || []
//     }
// })
