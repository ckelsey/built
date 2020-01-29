import { dispatch } from './dispatch.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onLabelClick(e, host) {
    return WCwhenPropertyReady(host, `input`)
        .then(input => {
            dispatch(host, `labelClick`, host)
            input.focus()

            // if ([`checkbox`, `radio`].indexOf(host.type) === -1) {
            //     const bounceZ = host.elements.bounceZ
            //     const ripple = host.elements.ripple

            //     if (bounceZ) { bounceZ.trigger() }

            //     if (ripple) { ripple.trigger(e) }

            // } 
        })
        .catch(() => { })
}