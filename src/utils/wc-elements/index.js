import { Observer, ObserverUnsubscribe } from '../..'

const removeOld = el => {
    if (!el || !el.parentNode) { return }

    el.parentNode.removeChild(el)
}

export function WCElements(host, elements) {
    const elStates = {}
    const state = {}

    const getEl = key => {
        const els = host.shadowRoot.querySelectorAll(elements[key].selector)

        if (els.length > 1) {
            const e = Array.from(els)
            return e
        }

        return els[0]
    }

    Object.keys(elements).sort().forEach(key => {
        elStates[key] = Observer(getEl(key))

        Object.defineProperty(state, key, {
            get() { return elStates[key].value },
            set(value) {
                if (value !== elStates[key].value) {
                    elStates[key].next(value)
                }
            }
        })

        elStates[key].subscribe(newElement => {
            host.unsubscribeEvents(elStates[key].previous)
            removeOld(elStates[key].previous)

            if (typeof elements[key].onChange === `function`) {
                elements[key].onChange(newElement, host)
            }
        })
    })

    return {
        state,
        disconnect: () => Object.keys(elStates).forEach(key => {
            const el = host.elements[key]
            elStates[key].complete()
            if (el) { ObserverUnsubscribe(el) }
        })
    }
}