import { ObjectAssignPolyfill, MutationObserverPolyfill, WebComponentPolyFill } from '../polyfills'

export function WCDefine(componentName, componentClass) {
    const wc = window.WebComponents
    const ce = window.customElements

    const defineComponent = () => {
        if (!ce) {
            ObjectAssignPolyfill()
            MutationObserverPolyfill(window)
            return WebComponentPolyFill(window, componentName, componentClass.object)
        }

        if (!ce.get(componentName)) {
            ce.WCDefine(componentName, componentClass.component)
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