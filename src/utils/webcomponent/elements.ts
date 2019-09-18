import { Observe } from '../observe'
import Get from '../get'
import pipe from '../pipe'
import { ToFunction } from '../convert/function'
import { IfInvalid } from '../convert/if'

const unsub = (el, elementProperty, eventKey) => pipe(ToFunction, IfInvalid(() => { }))(Get(el, `${elementProperty}.${eventKey}`)).value()

export const unsubscribeEvents = (el, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }

    Object.keys(el[elementProperty]).forEach(eventKey => unsub(el, elementProperty, eventKey))
}

export const unsubscribeEvent = (el, eventKey, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }

    unsub(el, elementProperty, eventKey)
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
            unsubscribeEvents(elStates[key].previous)
            removeOld(elStates[key].previous)

            // const loop = () => {
            //     if (Object.getOwnPropertyNames(newElement).length) {
            //         if (typeof elements[key].onChange === `function`) {
            //             elements[key].onChange(newElement, host)
            //         }
            //         return
            //     }

            //     requestAnimationFrame(() => loop())
            // }

            // loop()

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