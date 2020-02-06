import { SetShadowRoot } from './set-shadow-root.js'
import { ComponentStore } from '../services/componentStore.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { WCOuterStyle } from './wc-outer-style.js'

export function WCClass(componentName, template, style, outerStyle, observedAttributes, ConnectedFn, onDisconnected, formElement) {
    // class ComponentClass {
    //     constructor() { }
    // }

    // return ComponentClass
    class ComponentClass extends HTMLElement {
        static get observedAttributes() { return observedAttributes }
        constructor() {
            const s = super()
            s.wcID = ''
            s.state = {}
            s.elements = {}
            s.disconnectElements = function () { }
            SetShadowRoot({ componentName: componentName, template: template, style: style, element: s })
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
            const t = this

            if (this.state) {
                Object.keys(this.state).forEach(function (key) {
                    t.state[key].complete()
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