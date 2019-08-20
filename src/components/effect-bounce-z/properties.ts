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
    end: {
        format: val => pipe(IndexOf(eventNames), IfInvalid(null))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    amount: {
        format: val => pipe(ToNumber, IfInvalid(0))(val).value,
        onChange
    },
    speed: {
        format: val => pipe(ToNumber, IfInvalid(333))(val).value,
        onChange
    },
    start: {
        format: val => pipe(IndexOf(eventNames), IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    targets: {
        format: val => pipe(
            ToArray,
            IfInvalid(
                pipe(
                    IfEmpty([])
                )([val])
            )
        )(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    class: {
        format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
        onChange: (val, host) => {
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