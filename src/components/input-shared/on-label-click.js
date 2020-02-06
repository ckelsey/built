import { dispatch } from './dispatch.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function onLabelClick(e, host) {
    return WCWhenPropertyReady(host, 'input')
        .then(function (input) {
            input.focus()

            dispatch(host, 'labelClick', host)

            if (['checkbox', 'radio'].indexOf(host.type) > -1) {
                input.checked = !input.checked
            }
        })
        .catch(function () { })
}