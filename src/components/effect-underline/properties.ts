import ToBool from '../../utils/convert/bool'
import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import ToNumber from '../../utils/convert/to_number'
import { unloadTargets, loadTargets } from './methods'
import ToString from '../../utils/convert/to_string'
import { SelectorArrayToElements } from '../../utils/convert/dom'
import ComponentClassObject from '../../utils/html/component-class-object'
import { setStyles } from './elements'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, val).value

const attributes = {
    color: {
        format: val => pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (val, host) => !val || !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = `${val}`
    },
    direction: {
        format: val => pipe(ToString, IfInvalid(`auto`))(val).value,
        onChange
    },
    end: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    opacity: {
        format: val => Math.min(1, Math.max(0, pipe(ToNumber, IfInvalid(0.2))(val).value)),
        onChange
    },
    speed: {
        format: val => pipe(ToNumber, IfInvalid(700))(val).value,
        onChange
    },
    start: {
        format: val => pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    spring: {
        format: val => pipe(ToNumber, IfInvalid(4))(val).value,
        onChange
    },
    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    },
    class: ComponentClassObject
}

export const properties = Object.assign({
    downEvent: {
        format: val => val,
        onChange
    },

    on: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
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