import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { dispatch } from './dispatch.js'
import { Get } from '../../utils/get.js'

export function onDone(host) {
    return WCWhenPropertyReady(host, 'input')
        .then(function (input) {
            input.blur()

            dispatch(host, 'done', host)

            const form = Get(host, 'internals_.form', host.closest('form'))

            if (form) {
                try {
                    const domEvent = document.createEvent('Event')
                    domEvent.initEvent('submit', false, true)
                    form.dispatchEvent(domEvent)
                } catch (error) {
                    form.dispatchEvent(new Event('submit'))
                }
            }
        })
        .catch(function () { })
}