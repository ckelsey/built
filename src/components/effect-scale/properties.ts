import ToBool from '../../utils/convert/bool'
import pipe from '../../utils/pipe'
import IndexOf from '../../utils/convert/indexof'
import IfInvalid from '../../utils/convert/if_invalid'
import ToNumber from '../../utils/convert/to_number'
import { unloadTargets, unloadTriggers, loadTriggers, setOrigin, run, loadTargets } from './methods'
import ToString from '../../utils/convert/to_string'
import { SelectorArrayToAllElements } from '../../utils/convert/dom'
import ComponentClassObject from '../../utils/html/component-class-object'

const reset = host => {
    unloadTargets(host)
    unloadTriggers(host)
    loadTargets(host)
    loadTriggers(host)
    setOrigin(host.startfrom, host)
}

const directions = [
    `center`,
    `center top`,
    `center bottom`,
    `left top`,
    `left center`,
    `left bottom`,
    `right top`,
    `right center`,
    `right bottom`
]

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToAllElements(null, val).value

const attributes = {
    amount: {
        format: val => pipe(ToNumber, IfInvalid(-1))(val).value,
        onChange,
    },

    class: ComponentClassObject,

    end: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => reset(host),
    },

    scaled: {
        format: val => pipe(ToBool, IfInvalid(null))(val).value,
        onChange: (val, host) => host.ready ? run(val, host) : undefined
    },

    speed: {
        format: val => pipe(ToNumber, IfInvalid(333))(val).value,
        onChange,
    },

    spring: {
        format: val => pipe(ToNumber, IfInvalid(4))(val).value,
        onChange,
    },

    start: {
        format: val => pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => reset(host),
    },

    startfrom: {
        format: val => pipe(IndexOf(directions), IfInvalid(`center`))(val).value,
        onChange: setOrigin,
    },

    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => reset(host),
    },

    triggers: {
        format: selectorsToDom,
        onChange: (_val, host) => reset(host),
    },

    x: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange,
    },

    y: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange,
    },

}

export const properties = Object.assign(
    {
        targets$: {
            format: () => [],
            onChange,
        },

        triggers$: {
            format: () => [],
            onChange,
        },

        isScaling: {
            format: val => val,
            onChange,
        },

        isScaled: {
            format: val => val,
            onChange,
        },
    },
    attributes
)

export const observedAttributes = Object.keys(attributes)
