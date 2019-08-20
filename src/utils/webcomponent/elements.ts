import { Observe } from '../observe'

export const unsubscribeEvents = el => {
    if (!el || !el.eventSubscriptions) { return }

    Object.keys(el.eventSubscriptions).forEach(eventKey => {
        el.eventSubscriptions[eventKey]()
    })
}

const removeOld = el => {
    if (!el || !el.parentNode) { return }

    el.parentNode.removeChild(el)
}

export const Elements = (host, elements) => {
    const elStates = {}
    const state = {}

    const getEl = key => {
        const els = host.shadowRoot.querySelectorAll(elements[key].selector)
        if (els.length > 1) { return Array.from(els) }
        return els[0]
    }

    Object.keys(elements).forEach(key => {
        elStates[key] = Observe(getEl(key))

        Object.defineProperty(state, key, {
            get() { return elStates[key].value },
            set(value) {
                if (value !== elStates[key].value) {
                    elStates[key].next(value)
                }
            }
        })

        elStates[key].subscribe(newElement => {
            unsubscribeEvents(elStates[key].previous)
            removeOld(elStates[key].previous)
            elements[key].onChange(newElement, host)
        })
    })

    return {
        state,
        disconnect: () => Object.keys(elStates).forEach(key => {
            elStates[key].complete()
        })
    }
}