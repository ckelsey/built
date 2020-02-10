import { dispatch } from './dispatch.js'
import { WhenAvailable } from '../../utils/when-available.js'

export function onLabelClick(e, host) {
    return WhenAvailable(host, 'input')
        .then(function (input) {
            input.focus()

            dispatch(host, 'labelClick', host)

            if (['checkbox', 'radio'].indexOf(host.type) > -1) {
                input.checked = !input.checked
            }
        })
        .catch(function () { })
}