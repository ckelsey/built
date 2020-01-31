import { GetInputValue } from '../../utils/get-input-value.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onInput(host) {
    return WCWhenPropertyReady(host, `input`)
        .then(input => {
            host.value = GetInputValue(input)

            const val = host.value

            if (val !== input.value) { input.value = val }
        })
        .catch(console.error)
}