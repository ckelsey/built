import Observe from '../observe'

const removeOld = el => {
    if (!el || !el.parentNode) { return }

    el.parentNode.removeChild(el)
}

const Elements = /*#__PURE__*/ (host, elements) => {
    const elStates = {}
    const state = {}
    // let currentEl

    // const currentElExists = () => !!currentEl && (
    //     (Array.isArray(currentEl) && currentEl.filter(el => !!el && !!el.parentElement).length) ||
    //     !!currentEl.parentNode
    // )

    const getEl = key => {
        const start = performance.now()
        // console.log(elements[key].selector, currentElExists(), currentEl)
        // if (currentElExists()) { return currentEl }

        const els = host.shadowRoot.querySelectorAll(elements[key].selector)

        if (els.length > 1) {
            // currentEl = Array.from(els)
            const e = Array.from(els)
            console.log(elements[key].selector, performance.now() - start)
            return e
        }

        // currentEl = els[0]
        console.log(elements[key].selector, performance.now() - start)
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