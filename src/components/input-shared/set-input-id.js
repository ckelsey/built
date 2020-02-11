import { OnNextFrame } from '../../services/on-next-frame.js'
import { SetAttribute } from '../../utils/set-attribute.js'
import { WhenAvailable } from '../../utils/when-available.js'

export function inputIdString(host) { return ''.concat(host.inputID, '-input_', host.id ? host.id : '', '') }

export function setInputID(host) {
    const id = inputIdString(host)
    const inputID = host.inputID

    return OnNextFrame(function () {
        return Promise.all([
            WhenAvailable(host, 'labelelement')
                .then(function (label) {
                    return SetAttribute(label, ['id', 'for'], [inputID, id])
                })
                .catch(function () { }),

            WhenAvailable(host, 'input')
                .then(function (input) {
                    return SetAttribute(input, ['id', 'aria-labelledby'], [id, inputID])
                })
                .catch(function () { })
        ])
    })
}