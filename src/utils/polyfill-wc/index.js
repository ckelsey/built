const setBUIltComponents = w => w.bUIltComponents ? undefined : w.bUIltComponents = {}
const setBUIltComponentsListener = w => {
    if (!w.bUIltComponents.listener) {
        w.bUIltComponents.listener = new w.MutationObserver(function () {
            Object.keys(w.bUIltComponents)
                .forEach(key => {
                    Array.from(document.body.querySelectorAll(key))
                        .forEach(el => {
                            if (!el.ready) {
                                w.bUIltComponents[key](el)
                            }
                        })
                })
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