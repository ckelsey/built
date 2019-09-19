import Observe from '../observe'

const removeOld = el => {
    if (!el || !el.parentNode) { return }

    el.parentNode.removeChild(el)
}

const Elements = /*#__PURE__*/ (host, elements) => {
    const elStates = {}
    const state = {}

    const getEl = key => {
        const els = host.shadowRoot.querySelectorAll(elements[key].selector)
        if (els.length > 1) { return Array.from(els) }
        return els[0]
    }

    Object.keys(elements).sort().forEach(key => {
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
            elStates[key].complete()
        })
    }
}

export default Elements