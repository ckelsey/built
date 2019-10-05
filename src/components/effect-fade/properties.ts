import ToBool from '../../utils/convert/bool'
import pipe from '../../utils/pipe'
import Map from '../../utils/convert/map'
import IfInvalid from '../../utils/convert/if_invalid'
import ToNumber from '../../utils/convert/to_number'
import { unloadTriggers, loadTriggers } from './methods'
import { SelectorArrayToElements } from '../../utils/convert/dom'
import CommasToArray from '../../utils/convert/commas-to-array'
import ComponentClassObject from '../../utils/html/component-class-object'
import ToString from '../../utils/convert/to_string'
import { EFFECTFADE } from './theme'

const resetTriggers = host => {
    unloadTriggers(host)
    loadTriggers(host)
}

const onChange = () => { }
const selectorsToDom = val => SelectorArrayToElements(null, CommasToArray(val).value).value

const attributes = {
    end: {
        format: val => pipe(ToString, IfInvalid(EFFECTFADE.end))(val).value,
        onChange: (_val, host) => resetTriggers(host)
    },
    opacity: {
        format: val => pipe(CommasToArray, IfInvalid(EFFECTFADE.opacity), Map(v => ToNumber(v).value))(val).value,
        onChange
    },
    speed: {
        format: val => pipe(ToNumber, IfInvalid(EFFECTFADE.speed))(val).value,
        onChange
    },
    start: {
        format: val => pipe(ToString, IfInvalid(EFFECTFADE.start))(val).value,
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
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange
    },
    triggers$: {
        format: _val => [],
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