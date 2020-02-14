import { Get } from '../utils/get.js'
import { ArrayFrom } from '../utils/array-from.js'
import { Observer } from '../utils/observer.js'
import { ObserverUnsubscribe } from '../utils/observer-unsubscribe.js'
import { ForIn } from '../utils/for-in.js'
import { Filter } from '../utils/filter.js'

export function CreateElements(host, elements) {
    const state = {}
    const results = {}

    function removeOld(el) {
        ObserverUnsubscribe(el)

        const parent = Get(el, 'parentNode', Get(el, 'host'))
        if (!parent) { return }
        parent.removeChild(el)
    }

    function getEl(elementData, key) {
        let els

        if (key == 'outertheme') {
            els = Filter(function (child) { return child.className == 'outertheme' }, host.children)
        } else {
            els = ArrayFrom(host.shadowRoot.querySelectorAll(elementData.selector))
        }

        return els.length > 1 ? els : els[0]
    }

    function elementsEach(elementData, key) {
        state[key] = Observer(getEl(elementData))

        Object.defineProperty(results, key, {
            get: function () {
                const el = getEl(elementData, key)

                if (el != state[key].value) {
                    state[key].next(el)
                }
                return el
            },
            set: function (value) {
                if (value !== state[key].value) {
                    state[key].next(value)
                }
            }
        })

        function newElState(newElement) {
            removeOld(state[key].previous)

            if (typeof elementData.onChange == 'function') {
                elementData.onChange(newElement, host)
            }
        }

        state[key].subscribe(newElState)
    }

    ForIn(elementsEach, elements)

    return results
}