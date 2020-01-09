import { unloadTargets, loadTargets } from './methods.js'
import { SelectorArrayToElements } from '../../utils/selector-array-to-elements.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToNumber } from '../../utils/to-number.js'
import { Pipe } from '../../utils/pipe.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { ToString } from '../../utils/to-string.js'

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