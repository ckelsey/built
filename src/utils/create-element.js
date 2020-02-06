import { OnNextFrame } from '../services/on-next-frame.js'
import { GetParent } from './get-parent.js'
import { IsElement } from './is-element.js'
import { Get } from './get.js'

const fragment = document.createDocumentFragment()

export function CreateElement(obj) {
    const el = document.createElement(obj.tagName || 'div')
    fragment.appendChild(el)

    function objKeysEach(key) {
        if (key === 'tagName') { return }

        let max = 1000

        const events = Get(obj, 'eventSubscriptions')

        function tryParent() {
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

            function eventsKeysEach(eventKey) {
                if (typeof events[eventKey] === 'function') {
                    el.eventSubscriptions[eventKey] = events[eventKey]()
                }
            }

            Object.keys(events).forEach(eventsKeysEach)
        }

        function childrenArrayEach(child) {
            return IsElement(child).valid ?
                el.appendChild(child) :
                el.appendChild(CreateElement(child))
        }

        if (key === 'eventSubscriptions') {
            return tryParent()
        }

        if (['textContent', 'innerHTML'].indexOf(key) > -1) {
            return el[key] = obj[key]
        }

        if (key === 'children') {
            if (Array.isArray(obj[key])) {
                return obj[key].forEach(childrenArrayEach)
            } else {
                return IsElement(obj[key]).valid ?
                    el.appendChild(obj[key]) :
                    el.appendChild(CreateElement(obj[key]))
            }
        }

        if (['string', 'number', 'boolean'].indexOf(typeof obj[key]) > -1) {
            el.setAttribute(key, obj[key])
        } else {
            el[key] = obj[key]
        }
    }

    Object.keys(obj).forEach(objKeysEach)

    return el
}