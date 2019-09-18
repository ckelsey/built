import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToNumber } from '../../utils/convert/number'
import { unloadTargets, loadTargets } from './methods'
import { ToString } from '../../utils/convert/string'
import { SelectorArrayToElements } from '../../utils/convert/dom'
import { wcClassObject } from '../../utils/html/attr'
import { EFFECTRIPPLE } from './theme'
import { setStyles } from './elements'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    class: wcClassObject,

    color: {
        format: val => pipe(ToString, IfInvalid(EFFECTRIPPLE.color))(val).value,
        onChange
    },

    opacity: {
        format: val => Math.min(1, Math.max(0, pipe(ToNumber, IfInvalid(EFFECTRIPPLE.opacity))(val).value)),
        onChange
    },

    speed: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTRIPPLE.speed))(val).value,
        onChange
    },

    start: {
        format: val => pipe(ToString, IfInvalid(EFFECTRIPPLE.start))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },

    styles: {
        format: val => typeof val === `string` ? val : EFFECTRIPPLE.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },

    direction: {
        format: val => typeof val === `string` ? val : `auto`,
        onChange: () => { }
    },

    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    },
}

export const properties = Object.assign({
    downEvent: {
        format: val => val,
        onChange
    },
    targets$: {
        format: _val => [],
        onChange
    }
}, attributes)

export const observedAttributes = Object.keys(attributes)

export const hasTargets = host => ({
    get() {
        return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length
    }
})

export const hasTargets$ = host => ({
    get() {
        return host.hasTargets && host.targets$ && Array.isArray(host.targets$)
    }
})

export const hasStart = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && !!host.start
    }
})

export const canStart = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && host.start && host.start !== `none`
    }
})

export const nonAutoOrigin = host => ({
    get() {
        return (
            host.downEvent === undefined
            || (host.downEvent && !host.downEvent.target)
            || (host.direction !== undefined && host.direction !== `auto`)
        )
            ? host.direction === `to left`
                ? `100% center`
                : [`center`, `auto`].indexOf(host.direction) > -1
                    ? `center center`
                    : `0% center`
            : false
    }
})

export const canLoadTargets = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && host.hasStart
    }
})