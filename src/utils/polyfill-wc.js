import { ArrayFrom } from './array-from.js'

function setBUIltComponents(w) {
    return w.bUIltComponents ? undefined : w.bUIltComponents = {}
}

function setBUIltComponentsListener(w) {
    function querySelectorAllEach(key) {
        return function querySelectorAllEachInner(el) {
            if (!el.ready) {
                w.bUIltComponents[key](el)
            }
        }
    }

    function bUIltComponentsEach(key) {
        const _querySelectorAllEach = querySelectorAllEach(key)

        ArrayFrom(document.body.querySelectorAll(key))
            .forEach(_querySelectorAllEach)
    }

    if (!w.bUIltComponents.listener) {
        w.bUIltComponents.listener = new w.MutationObserver(function () {
            Object.keys(w.bUIltComponents)
                .forEach(bUIltComponentsEach)
        })

        w.bUIltComponents.listener.observe(document.body)
    }
}

export function PolyFillWC(w, componentName, componentClass) {
    setBUIltComponents(w)

    if (w.bUIltComponents[componentName]) { return }

    setBUIltComponentsListener(w)

    w.bUIltComponents[componentName] = componentClass
}