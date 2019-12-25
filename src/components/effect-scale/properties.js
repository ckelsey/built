import { ToBool, Pipe, IndexOf, IfInvalid, ToNumber, ToString, ComponentClassObject, SelectorArrayToAllElements } from '../..'
import { unloadTargets, unloadTriggers, loadTriggers, setOrigin, run, loadTargets } from './methods'

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
        format: val => Pipe(ToNumber, IfInvalid(-1))(val).value,
        onChange,
    },

    class: ComponentClassObject,

    end: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => reset(host),
    },

    scaled: {
        format: val => Pipe(ToBool, IfInvalid(null))(val).value,
        onChange: (val, host) => host.ready ? run(val, host) : undefined
    },

    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange,
    },

    spring: {
        format: val => Pipe(ToNumber, IfInvalid(4))(val).value,
        onChange,
    },

    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => reset(host),
    },

    startfrom: {
        format: val => Pipe(IndexOf(directions), IfInvalid(`center`))(val).value,
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
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange,
    },

    y: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange,
    },

}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
export const properties = attributes
export const observedAttributes = Object.keys(attributes)
