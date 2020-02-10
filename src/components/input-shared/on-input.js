import { GetInputValue } from '../../utils/get-input-value.js'
import { WhenAvailable } from '../../utils/when-available.js'

export function onInput(host) {
    return WhenAvailable(host, 'input')
        .then(function (input) {
            host.value = GetInputValue(input)

            const val = host.value

            if (['checkbox', 'radio'].indexOf(host.type) > -1) {
                return val !== input.checked ? input.checked = val : undefined
            }

            if (val !== input.value) { input.value = val }
        })
        .catch(function () { })
}