import { dispatch } from './dispatch.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { GetInputValue } from '../../utils/get-input-value.js'

export function onBlur(host) {
    if (!host.focused) { return }

    host.focused = false

    WhenAvailable(host, 'input')
        .then(function (input) {
            host.value = GetInputValue(input)
            input.blur()
            dispatch(host, 'blur', host)
        })
        .catch(function () { })

}