import { WhenAvailable } from '../../utils/when-available.js'
import { dispatch } from './dispatch.js'
import { Get } from '../../utils/get.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'

export function onDone(host) {
    return WhenAvailable(host, 'input')
        .then(function (input) {
            input.blur()

            dispatch(host, 'done', host)

            const form = Get(host, 'internals_.form', host.closest('form'))

            if (form) {
                DispatchEvent(form, 'submit')
            }
        })
        .catch(function () { })
}