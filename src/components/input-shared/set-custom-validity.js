import { WhenAvailable } from '../../utils/when-available.js'

export function setCustomValidity(host) {
    return function setCustomValidityMessage(error) {
        return WhenAvailable(host, 'input.setCustomValidity', true)
            .then(function () {
                return host.input.setCustomValidity(error)
            })
            .catch(function () { })
    }
}

