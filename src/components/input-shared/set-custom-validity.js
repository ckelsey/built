import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function setCustomValidity(host) {
    return function setCustomValidityMessage(error) {
        return WCWhenPropertyReady(host, `input.setCustomValidity`, true).then(() => host.input.setCustomValidity(error))
            .catch(console.error)
    }
}

