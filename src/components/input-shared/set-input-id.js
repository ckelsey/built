import { OnNextFrame } from '../../services/on-next-frame.js'
import { SetAttribute } from '../../utils/set-attribute.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'

export function inputIdString(host) { return `${host.inputID}-input_${host.id || ``}` }

export function setInputID(host) {
    const id = inputIdString(host)
    const inputID = host.inputID

    return OnNextFrame(() => Promise.all([
        WCwhenPropertyReady(host, `labelelement`).then(label => SetAttribute(label, [`id`, `for`], [inputID, id])),
        WCwhenPropertyReady(host, `input`).then(input => SetAttribute(input, [`id`, `aria-labelledby`], [id, inputID]))
    ]))
}