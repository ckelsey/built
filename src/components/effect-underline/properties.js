import { Pipe, IfInvalid, ToNumber, ToString, SelectorArrayToElements } from '../..'
import { unloadTargets, loadTargets } from './methods'

function resetTargets(host) {
    unloadTargets(host)
    loadTargets(host)
}

function selectorsToDom(val) {
    return SelectorArrayToElements(null, val).value
}

const attributes = {
    color: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('#59a2d8'))(val).value
        },
        onChange: function (val, host) {
            !val || !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = ''.concat(val)
        }
    },
    direction: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('auto'))(val).value
        }
    },
    end: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (_val, host) {
            resetTargets(host)
        }
    },
    opacity: {
        format: function (val) {
            return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value))
        }
    },
    speed: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(700))(val).value
        }
    },
    start: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('mousedown'))(val).value
        },
        onChange: function (_val, host) {
            resetTargets(host)
        }
    },
    spring: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(4))(val).value
        }
    },
    targets: {
        format: selectorsToDom,
        onChange: function (_val, host) {
            resetTargets(host)
        }
    }
}

export const properties = attributes

export const observedAttributes = Object.keys(attributes)

export function hasTargets(host) {
    return {
        get: function () {
            return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length
        }
    }
}
export function hasTargets$(host) {
    return {
        get: function () {
            return host.hasTargets && host.targets$ && Array.isArray(host.targets$)
        }
    }
}

export function hasStart(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.start
        }
    }
}

export function canStart(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.start && host.start !== 'none'
        }
    }
}

export function canEnd(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.end && host.end !== 'none'
        }
    }
}

export function canRunStart(host) {
    return {
        get: function() {
            return host.hasTargets && !host.on
        }
    }
}

export function canRunEnd(host) {
    return {
        get: function () {
            return host.hasTargets && host.on
        }
    }
}

export function nonAutoOrigin(host) {
    return {
        get: function () {
            return (
                host.downEvent === undefined
                || (host.downEvent && !host.downEvent.target)
                || (host.direction !== undefined && host.direction !== 'auto')
            )
                ? host.direction === 'to left'
                    ? '100% center'
                    : ['center', 'auto'].indexOf(host.direction) > -1
                        ? 'center center'
                        : '0% center'
                : false
        }
    }
}

export function canLoadTargets(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.hasStart
        }
    }
}