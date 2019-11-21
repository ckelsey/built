import { Observer } from '../..'

const removeOld = el => {
    if (!el || !el.parentNode) { return }

    el.parentNode.removeChild(el)
}


export function WCElements(host, elements) {
    const elStates = {}
    const state = {}
    // let currentEl

    // const currentElExists = () => !!currentEl && (
    //     (Array.isArray(currentEl) && currentEl.filter(el => !!el && !!el.parentElement).length) ||
    //     !!currentEl.parentNode
    // )

    const getEl = key => {
        // if (currentElExists()) { return currentEl }

        const els = host.shadowRoot.querySelectorAll(elements[key].selector)

        if (els.length > 1) {
            // currentEl = Array.from(els)
            const e = Array.from(els)
            return e
        }

        // currentEl = els[0]
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
            elStates[key].complete()
        })
    }
}