import { SetShadowRoot } from "./set-shadow-root"
import { ComponentStore } from "../services/componentStore"
import { ObserverUnsubscribe } from "./observer-unsubscribe"

const outlineRule = `outline: none !important;`

export function WCClass(
    componentName,
    template,
    style,
    observedAttributes,
    ConnectedFn,
    onDisconnected,
    formElement,
) {
    const modifiedStyle = `:host(${componentName}){${outlineRule}} ${componentName}{${outlineRule}} ${style}`

    class ComponentClass extends HTMLElement {
        static get observedAttributes() { return observedAttributes }

        constructor() {
            const self = super()
            self.wcID = ``
            self.state = {}
            self.elements = {}
            self.disconnectElements = () => { }
            SetShadowRoot({ componentName, template, style: modifiedStyle, element: self })
            return self
        }

        get form() { return this.internals_.form }

        attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        connectedCallback() {
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

    if (formElement) {
        class FormElementComponent extends ComponentClass {
            static formAssociated = true
            constructor() {
                const self = super()
                try { self.internals_ = self.attachInternals() } catch (error) { }
            }
        }

        return FormElementComponent
    }

    return ComponentClass
}