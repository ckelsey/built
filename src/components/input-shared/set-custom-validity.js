import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function setCustomValidity(host) {
    return function setCustomValidityMessage(error) {
        return WCwhenPropertyReady(host, `input.setCustomValidity`, true).then(() => host.input.setCustomValidity(error))
            .catch(console.error)
    }
}

