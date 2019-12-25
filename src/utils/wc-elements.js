import { Observer, ObserverUnsubscribe, Get, OnNextFrame } from '..'

const removeOld = el => {
    const parent = Get(el, `parentNode`, Get(el, `host`))
    if (!parent) { return }
    parent.removeChild(el)
}

export function WCElements(host, elements) {
    const elStates = {}
    const state = {}
    const elCache = {}

    const getEl = key => {
        const get = () => {
            const els = host.shadowRoot.querySelectorAll(elements[key].selector)
            let result = els.length > 1 ? Array.from(els) : els[0]
            state[key] = result

            return result
        }

        if (elCache[key]) {
            OnNextFrame(get)
            return elCache[key]
        }

        return get()
    }

    Object.keys(elements).forEach(key => {
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
            ObserverUnsubscribe(elStates[key].previous)
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