import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import ToNumber from '../../utils/convert/to_number'
import { unloadTargets, loadTargets } from './methods'
import { SelectorArrayToElements } from '../../utils/convert/dom'
import ComponentClassObject from '../../utils/html/component-class-object'
import ToString from '../../utils/convert/to_string'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    amount: {
        format: val => pipe(ToNumber, IfInvalid(0))(val).value,
        onChange
    },

    class: ComponentClassObject,

    speed: {
        format: val => pipe(ToNumber, IfInvalid(300))(val).value,
        onChange
    },

    start: {
        format: val => pipe(ToString, IfInvalid(`mousedown`))(val).value,
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