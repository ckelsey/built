import { PolyfillObjectAssign } from './polyfill-object-assign.js'
import { PolyfillMutationObserver } from './polyfill-mutation-observer.js'
import { PolyFillWC } from './polyfill-wc.js'

export function WCDefine(componentName, componentClass) {
    const wc = window.WebComponents
    const ce = window.customElements

    function defineComponent() {
        if (!componentClass) {
            return
        }

        if (!ce) {
            PolyfillObjectAssign()
            PolyfillMutationObserver(window)
            return PolyFillWC(window, componentName, componentClass.object)
        }

        if (!ce.get(componentName)) {
            ce.define(componentName, componentClass)
        }
    }

    if (wc && wc.ready) {
        defineComponent()
    } else {
        window.addEventListener('WebComponentsReady', function () {
            defineComponent()
        })
    }
}

WCDefine.native = !!window.customElements