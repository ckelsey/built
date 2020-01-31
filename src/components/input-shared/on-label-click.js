import { dispatch } from './dispatch.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onLabelClick(e, host) {
    return WCWhenPropertyReady(host, `input`)
        .then(input => {
            dispatch(host, `labelClick`, host)
            input.focus()
        })
        .catch(() => { })
}