import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToNumber } from '../../utils/convert/number'
import { unloadTargets, loadTargets } from './methods'
import { SelectorArrayToElements } from '../../utils/convert/dom'
import { wcClassObject } from '../../utils/html/attr'
import { EFFECTBOUNCEZ } from './theme'
import { ToString } from '../../utils/convert/string'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    amount: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTBOUNCEZ.amount))(val).value,
        onChange
    },

    class: wcClassObject,

    speed: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTBOUNCEZ.speed))(val).value,
        onChange
    },

    start: {
        format: val => pipe(ToString, IfInvalid(EFFECTBOUNCEZ.start))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },

    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    }
}

export const properties = Object.assign({
    targets$: {
        format: _val => [],
        onChange
    }
}, attributes)

export const observedAttributes = Object.keys(attributes)