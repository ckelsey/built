import { PolyfillObjectAssign, PolyfillMutationObserver, PolyFillWC } from '..'

export function WCDefine(componentName, componentClass) {
    const wc = window.WebComponents
    const ce = window.customElements

    const defineComponent = () => {
        if (!ce) {
            PolyfillObjectAssign()
            PolyfillMutationObserver(window)
            return PolyFillWC(window, componentName, componentClass.object)
        }

        if (!ce.get(componentName)) {
            ce.define(componentName, componentClass.component)
        }
    }

    if (wc && wc.ready) {
        defineComponent()
    } else {
        window.addEventListener(`WebComponentsReady`, function () {
            defineComponent()
        })
    }
}