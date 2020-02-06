import { dispatch } from './dispatch.js'

export function onInvalid(host) {
    return dispatch(host, 'invalid', {
        value: host.value,
        error: host.validationMessage
    })
}