import { Pipe, IfInvalid, ToNumber, SelectorArrayToElements, ComponentClassObject, ToString } from '../..'
import { unloadTargets, loadTargets } from './methods'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    amount: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange
    },

    class: ComponentClassObject,

    speed: {
        format: val => Pipe(ToNumber, IfInvalid(300))(val).value,
        onChange
    },

    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },

    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    }
}

export const properties = attributes

export const observedAttributes = Object.keys(attributes)