import { unloadTargets, loadTargets } from './methods.js'
import { setStyles } from './elements.js'
import { SelectorArrayToElements } from '../../utils/selector-array-to-elements.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { Pipe } from '../../utils/pipe.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToString } from '../../utils/to-string.js'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    class: ComponentClassObject,

    color: { format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value, },

    opacity: { format: val => Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value)), },

    speed: { format: val => Pipe(ToNumber, IfInvalid(600))(val).value, },

    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },

    direction: { format: val => typeof val === `string` ? val : `auto`, },

    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    },
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
export const properties = attributes

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