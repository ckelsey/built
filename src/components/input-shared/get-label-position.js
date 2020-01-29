import { Get } from '../../utils/get.js'

export function getDefaultLabelPosition(host) {
    return Get(host, `state.labelposition.value`, [`input-bool`].indexOf(host.tagName.toLowerCase()) === -1 ? `inside` : `left`)
}