import { dispatch } from './dispatch.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { GetInputValue } from '../../utils/get-input-value.js'

export function onBlur(host) {
    if (!host.focused) { return }

    host.focused = false

    WCWhenPropertyReady(host, 'input').then(function (input) {
        host.value = GetInputValue(input)
        input.blur()
        dispatch(host, 'blur', host)
    })

}