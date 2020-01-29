import { dispatch } from './dispatch.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { GetInputValue } from '../../utils/get-input-value.js'

export function onBlur(host) {
    if (!host.focused) { return }

    host.focused = false

    WCwhenPropertyReady(host, `input`).then(input => {
        host.value = GetInputValue(input)
        input.blur()
        dispatch(host, `blur`, host)
    })

}