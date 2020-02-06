import { ToBool, Pipe, IndexOf, IfInvalid, ToNumber, ToString, SelectorArrayToAllElements } from '../..'
import { unloadTargets, unloadTriggers, loadTriggers, setOrigin, run, loadTargets } from './methods'

function reset(host) {
    unloadTargets(host)
    unloadTriggers(host)
    loadTargets(host)
    loadTriggers(host)
    setOrigin(host.startfrom, host)
}

function resetOnChange(_val, host) { reset(host) }

const directions = [
    'center',
    'center top',
    'center bottom',
    'left top',
    'left center',
    'left bottom',
    'right top',
    'right center',
    'right bottom'
]

function selectorsToDom(val) {
    return SelectorArrayToAllElements(null, val).value
}

const attributes = {
    amount: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(-1))(val).value
        }
    },

    end: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: resetOnChange,
    },

    scaled: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(null))(val).value
        },
        onChange: function (val, host) { return host.ready ? run(val, host) : undefined }
    },

    speed: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(333))(val).value
        }
    },

    spring: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(4))(val).value
        }
    },

    start: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('mousedown'))(val).value
        },
        onChange: resetOnChange
    },

    startfrom: {
        format: function (val) {
            return Pipe(IndexOf(directions), IfInvalid('center'))(val).value
        },
        onChange: setOrigin,
    },

    targets: {
        format: selectorsToDom,
        onChange: resetOnChange
    },

    triggers: {
        format: selectorsToDom,
        onChange: resetOnChange
    },

    x: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        }
    },

    y: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        }
    },

}

export const properties = attributes
export const observedAttributes = Object.keys(attributes)
