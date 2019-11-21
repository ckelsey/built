import {
    ToBool, Pipe, ToMap, IfInvalid, ToNumber, SelectorArrayToElements,
    CommasToArray, ComponentClassObject, ToString
} from '../..'
import { unloadTriggers, loadTriggers } from './methods'

const resetTriggers = host => {
    unloadTriggers(host)
    loadTriggers(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, CommasToArray(val).value).value

const attributes = {
    end: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => resetTriggers(host)
    },
    opacity: {
        format: val => Pipe(CommasToArray, IfInvalid([0, 1]), ToMap(v => ToNumber(v).value))(val).value,
        onChange
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(600))(val).value,
        onChange
    },
    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTriggers(host)
    },
    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTriggers(host)
    },
    triggers: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTriggers(host)
    },
    class: ComponentClassObject,
}

export const properties = Object.assign({
    on: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange
    },
    triggers$: {
        format: () => [],
        onChange
    }
}, attributes)

export const observedAttributes = Object.keys(attributes)

export const hasTargets = host => ({
    get() {
        return !!host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length
    }
})

export const hasTriggers = host => ({
    get() {
        return !!host.ready && !!host.triggers && Array.isArray(host.triggers) && !!host.triggers.length
    }
})

export const hasTriggers$ = host => ({
    get() {
        return !!host.triggers$ && Array.isArray(host.triggers$)
    }
})

export const hasStart = host => ({
    get() {
        return !!host.start
    }
})

export const canStart = host => ({
    get() {
        return host.hasTargets && host.hasStart && host.start !== `none`
    }
})

export const canEnd = host => ({
    get() {
        return host.hasTargets && !!host.end && host.end !== `none`
    }
})

export const canRunStart = host => ({
    get() {
        return host.hasTargets
    }
})

export const canRunEnd = host => ({
    get() {
        return host.hasTargets
    }
})

export const canLoadTriggers = host => ({
    get() {
        return host.hasTriggers && host.hasTriggers$ && host.hasStart
    }
})