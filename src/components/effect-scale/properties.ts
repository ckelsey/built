import ToBool from '../../utils/convert/bool'
import pipe from '../../utils/pipe'
import IndexOf from '../../utils/convert/indexof'
import IfInvalid from '../../utils/convert/if_invalid'
import { ToNumber } from '../../utils/convert/number'
import { unloadTargets, unloadTriggers, loadTriggers, setOrigin, run, loadTargets } from './methods'
import ToString from '../../utils/convert/to_string'
import { SelectorArrayToAllElements } from '../../utils/convert/dom'
import { wcClassObject } from '../../utils/html/attr'
import { EFFECTSCALE } from './theme'

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
        format: val => pipe(ToNumber, IfInvalid(EFFECTSCALE.amount))(val).value,
        onChange,
    },

    class: wcClassObject,

    end: {
        format: val => pipe(ToString, IfInvalid(EFFECTSCALE.end))(val).value,
        onChange: (_val, host) => reset(host),
    },

    scaled: {
        format: val => pipe(ToBool, IfInvalid(EFFECTSCALE.scaled))(val).value,
        onChange: (val, host) => host.ready ? run(val, host) : undefined
    },

    speed: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTSCALE.speed))(val).value,
        onChange,
    },

    spring: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTSCALE.spring))(val).value,
        onChange,
    },

    start: {
        format: val => pipe(ToString, IfInvalid(EFFECTSCALE.start))(val).value,
        onChange: (_val, host) => reset(host),
    },

    startfrom: {
        format: val => pipe(IndexOf(directions), IfInvalid(EFFECTSCALE.startfrom))(val).value,
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
        format: val => pipe(ToBool, IfInvalid(EFFECTSCALE.x))(val).value,
        onChange,
    },

    y: {
        format: val => pipe(ToBool, IfInvalid(EFFECTSCALE.y))(val).value,
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
