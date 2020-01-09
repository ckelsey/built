import { ToNumber } from '../../utils/to-number.js'
import { ToString } from '../../utils/to-string.js'
import { SelectorArrayToElements } from '../../utils/selector-array-to-elements.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { unloadTargets, loadTargets } from './methods.js'
import { setStyles } from './elements.js'
import { Pipe } from '../../utils/pipe.js'
import { IfInvalid } from '../../utils/if-invalid.js'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    color: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (val, host) => !val || !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = `${val}`
    },
    direction: { format: val => Pipe(ToString, IfInvalid(`auto`))(val).value, },
    end: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    opacity: { format: val => Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value)), },
    speed: { format: val => Pipe(ToNumber, IfInvalid(700))(val).value, },
    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    spring: { format: val => Pipe(ToNumber, IfInvalid(4))(val).value, },
    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    },
    class: ComponentClassObject
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
        return host.hasTargets && host.hasTargets$ && host.start
    }
})

export const canStart = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && host.start && host.start !== `none`
    }
})

export const canEnd = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && host.end && host.end !== `none`
    }
})

export const canRunStart = host => ({
    get() {
        return host.hasTargets && !host.on
    }
})

export const canRunEnd = host => ({
    get() {
        return host.hasTargets && host.on
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