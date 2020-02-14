import { ForIn } from '../utils/for-in.js'
import { ObserverUnsubscribe } from '../utils/observer-unsubscribe.js'
import { SetShadowRoot } from './set-shadow-root.js'

export function ClassConstructor(componentOptions) {
    const observedAttributes = Object.keys(componentOptions.properties)

    class Component extends HTMLElement {
        static get observedAttributes() { return observedAttributes }

        constructor() {
            const self = super()
            self.componentName = componentOptions.componentName
            self.componentId = ''
            self.state = {}
            self.elements = {}
            self.disconnectElements = function () { }
            SetShadowRoot(this, componentOptions.componentName, componentOptions.template, componentOptions.shadowStyle, componentOptions.outerStyle)
            return self
        }

        attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        connectedCallback() {
            componentOptions.onConnected(this)
        }

        disconnectedCallback() {
            ForIn(function stateLoop(state) { state.complete() }, this.state, true)

            this.disconnectElements()
            ObserverUnsubscribe(this)
            componentOptions.onDisconnected(this)
        }
    }

    if (componentOptions.formElement) {
        class FormElementComponent extends Component {
            static get formAssociated() { return true }

            constructor() {
                const self = super()
                try { self.internals_ = self.attachInternals() } catch (error) { }
            }

            get form() { return this.internals_.form }
        }

        return FormElementComponent
    }

    return Component
}