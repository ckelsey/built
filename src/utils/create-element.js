import { OnNextFrame } from '../services/on-next-frame.js'
import { GetParent } from './get-parent.js'

const fragment = document.createDocumentFragment()

export const CreateElement = obj => {
    const el = document.createElement(obj.tagName || `div`)
    fragment.appendChild(el)

    Object.keys(obj).forEach(key => {
        if (key === `tagName`) { return }

        if (key === `eventSubscriptions`) {
            let max = 1000
            const events = obj.eventSubscriptions

            const tryParent = () => {
                max = max - 1

                const parent = GetParent(el)

                if (!parent && max) {
                    if (max) {
                        return OnNextFrame(tryParent)
                    }
                }

                if (!el.eventSubscriptions) {
                    el.eventSubscriptions = {}
                }

                Object.keys(events).forEach(eventKey => {
                    if (typeof events[eventKey] === `function`) {
                        el.eventSubscriptions[eventKey] = events[eventKey]()
                    }
                })
            }

            return tryParent()
        }

        if ([`textContent`, `innerHTML`].indexOf(key) > -1) {
            return el[key] = obj[key]
        }

        if (key === `children`) {
            if (Array.isArray(obj[key])) {
                return obj[key].forEach(child => el.appendChild(CreateElement(child)))
            } else {
                return el.appendChild(CreateElement(obj[key]))
            }
        }

        if ([`string`, `number`, `boolean`].indexOf(typeof obj[key]) > -1) {
            el.setAttribute(key, obj[key])
        } else {
            el[key] = obj[key]
        }
    })

    return el
}