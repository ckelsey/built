import { ObjectAssignPolyfill, MutationObserverPolyfill, WebComponentPolyFill } from '../polyfills'

const Define = /*#__PURE__*/ (componentName, componentClass) => {
    const wc = (window as any).WebComponents
    const ce = (window as any).customElements

    const defineComponent = () => {
        if (!ce) {
            ObjectAssignPolyfill()
            MutationObserverPolyfill(window)
            return WebComponentPolyFill(window, componentName, componentClass.object)
        }

        if (!ce.get(componentName)) {
            ce.define(componentName, componentClass.component)
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

export default Define