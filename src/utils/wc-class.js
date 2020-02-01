import { SetShadowRoot } from "./set-shadow-root"
import { ComponentStore } from "../services/componentStore"
import { ObserverUnsubscribe } from "./observer-unsubscribe"
import { WCOuterStyle } from "./wc-outer-style"


export function WCClass(
    componentName,
    template,
    style,
    outerStyle,
    observedAttributes,
    ConnectedFn,
    onDisconnected,
    formElement,
) {
    console.log(componentName)
    class ComponentClass extends HTMLElement {
        static get observedAttributes() { return observedAttributes }

        constructor() {
            console.log(`suosp`)
            const s = super()
            s.wcID = ``
            s.state = {}
            s.elements = {}
            s.disconnectElements = () => { }
            SetShadowRoot({ componentName, template, style, element: s })
            try { s.internals_ = s.attachInternals() } catch (error) { }
            return s
        }

        get form() { return this.internals_.form }

        attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        connectedCallback() {
            WCOuterStyle(componentName, this, outerStyle)
            ComponentStore.addComponent(this)
            ConnectedFn(this)
        }

        disconnectedCallback() {
            ComponentStore.removeComponent(this)

            if (this.state) {
                Object.keys(this.state).forEach(key => {
                    this.state[key].complete()
                })
            }

            this.disconnectElements()

            ObserverUnsubscribe(this)

            if (onDisconnected) {
                onDisconnected(this)
            }
        }
    }

    console.log(ComponentClass)

    if (formElement) {
        class FormElementComponent extends ComponentClass {
            static get formAssociated() { return true }
            constructor() {
                const self = super()
                try { self.internals_ = self.attachInternals() } catch (error) { }
            }
        }

        return FormElementComponent
    }

    return ComponentClass
}