import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { IsAutoFilled } from '../../utils/is-autofilled.js'
import { Get } from '../../utils/get.js'

const supportsInternals = 'ElementInternals' in window && 'setFormData' in window.ElementInternals

export function processValue(host) {
    return function processingValue() {
        return WCWhenPropertyReady(host, 'input')
            .then(function (input) {
                const processed = host.processedValue
                const sanitized = processed.sanitized
                const autofilled = IsAutoFilled(input)
                const stringEmpty = (isNaN(sanitized) || typeof sanitized === 'string') && !sanitized.length
                const empty = stringEmpty && !autofilled
                const valid = !host.focused && empty ? true : processed.valid
                const badFormat = Get(processed, 'validity.badFormat')

                if (badFormat && processed.reason.length) {
                    host.setCustomValidity(processed.reason.join(', '))
                    host.invalid = true
                }

                if (supportsInternals) {
                    host.internals_.setFormValue(sanitized)
                }

                host.cachedValue = processed

                if (typeof host.postProcessValue === 'function') {
                    host.postProcessValue({
                        input: input,
                        valid: valid,
                        sanitized: sanitized
                    })
                }

                if (host.type === 'select') {
                    if (host.emptyoption === 'false' || host.emptyoption === false || host.emptyoption === undefined) {
                        host.notempty = !empty
                    } else {
                        host.notempty = true
                    }
                } else {
                    host.notempty = !empty
                }

                if (valid) { return host.invalid = false }
                if (empty) { return host.invalid = false }
                if (!host.focused) { return host.invalid = true }
            })
            .catch(function () { })
    }
}