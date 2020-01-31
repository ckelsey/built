import { Get } from '../../utils/get.js'

export function matchInputMessage(host) {
    if (!host.matchinput) { return `` }

    if (host.value === Get(host, `matchinput.value`)) { return `` }

    const otherInput = host.matchinput
    return `Value does not match${otherInput.label || otherInput.placeholder || otherInput.name || ``}.`
}