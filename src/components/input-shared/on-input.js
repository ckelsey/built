import { GetInputValue } from '../../utils/get-input-value.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onInput(host) {
    return WCwhenPropertyReady(host, `input`)
        .then(input => {
            host.value = GetInputValue(input)
            if (host.value !== input.value) { input.value = host.value }
        })
        .catch(console.error)
}