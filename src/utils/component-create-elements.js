import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { Observer } from './observer.js'
import { ArrayFrom } from './array-from.js'
import { Get } from './get.js'

export function ComponentCreateElements(host, elements) {
    const elStates = {}
    const state = {}

    function removeOld(el) {
        const parent = Get(el, 'parentNode', Get(el, 'host'))
        if (!parent) { return }
        parent.removeChild(el)
    }

    function getEl(key) {
        const els = ArrayFrom(host.querySelectorAll(elements[key].selector))
        state[key] = els.length > 1 ? els : els[0]
        return state[key]
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

    for (const prop in elements) {
        if (elements[prop]) {
            elementsEach(prop)
        }
    }

    return state
}