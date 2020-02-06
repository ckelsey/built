import { GetInputValue } from '../../utils/get-input-value.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onInput(host) {
    return WCWhenPropertyReady(host, 'input')
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