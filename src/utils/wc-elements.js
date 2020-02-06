import { Observer } from './observer.js'
import { Get } from './get.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { ArrayFrom } from './array-from.js'

function removeOld(el) {
    const parent = Get(el, 'parentNode', Get(el, 'host'))
    if (!parent) { return }
    parent.removeChild(el)
}

export function WCElements(host, elements) {
    const elStates = {}
    const state = {}
    const elCache = {}

    function getEl(key) {
        function get() {
            const els = host.shadowRoot.querySelectorAll(elements[key].selector)
            let result = els.length > 1 ? ArrayFrom(els) : els[0]
            state[key] = result

            return result
        }

        if (elCache[key]) {
            OnNextFrame(get)
            return elCache[key]
        }

        return get()
    }

    function elementsEach(key) {
        elStates[key] = Observer(getEl(key))

        Object.defineProperty(state, key, {
            get: function () { return elStates[key].value },
            set: function (value) {
                if (value !== elStates[key].value) {
                    elStates[key].next(value)
                }
            }
        })

        function elStatesEach(newElement) {
            ObserverUnsubscribe(elStates[key].previous)
            removeOld(elStates[key].previous)

            if (typeof elements[key].onChange === 'function') {
                elements[key].onChange(newElement, host)
            }
        }

        elStates[key].subscribe(elStatesEach)
    }

    Object.keys(elements).forEach(elementsEach)

    return {
        state: state,
        disconnect: function () {
            function elStatesEach(key) {
                const el = host.elements[key]
                elStates[key].complete()
                if (el) { ObserverUnsubscribe(el) }
            }

            return Object.keys(elStates).forEach(elStatesEach)
        }
    }
}