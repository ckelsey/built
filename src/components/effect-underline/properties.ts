import { ToBool } from '../../utils/convert/bool'
import pipe from '../../utils/pipe'
import { IndexOf, ToArray, Map, Filter } from '../../utils/convert/array'
import { IfInvalid, IfEmpty } from '../../utils/convert/if'
import { eventNames } from '../../utils/html'
import { ToNumber } from '../../utils/convert/number'
import { unloadTargets, loadTargets } from './methods'
import { ToString, Split } from '../../utils/convert/string'

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const onChange = () => { }

const attributes = {
    color: {
        format: val => pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (val, host) => !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = `${val}`
    },
    direction: {
        format: val => pipe(ToString, IfInvalid(`auto`))(val).value,
        onChange
    },
    end: {
        format: val => pipe(IndexOf(eventNames), IfInvalid(null))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    opacity: {
        format: val => Math.min(1, Math.max(0, pipe(ToNumber, IfInvalid(0.2))(val).value)),
        onChange: (val, host) => !host.elements.underline ? undefined : host.elements.underline.style.opacity = `${val}`
    },
    speed: {
        format: val => pipe(ToNumber, IfInvalid(333))(val).value,
        onChange: (val, host) => {
            if (!host.elements.underline) { return }
            host.elements.underline.style.transition = `opacity ${val}ms ease-in-out`
            host.elements.underline.style.transition = `transform ${val * 1.3}ms ease-in-out, transform-origin ${val * 1.3}ms ease-in-out, opacity ${val * 0.7}ms ease-in-out`
        }
    },
    start: {
        format: val => pipe(IndexOf(eventNames), IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    targets: {
        format: val => pipe(
            ToArray,
            IfInvalid(pipe(IfEmpty([]))([val]))
        )(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    class: {
        format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
        onChange: (val, host) => {
            if (!host.elements.root) { return }

            if (!!host.state.class.previous && host.state.class.previous.length) {
                host.elements.root.classList.remove(host.state.class.previous)
            }

            if (!!val && val.length) {
                host.elements.root.classList.add(val)
            }
        }
    }
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
        format: val => pipe(ToArray, IfInvalid([]))(val).value,
        onChange
    }
}, attributes)

export const observedAttributes = Object.keys(attributes)