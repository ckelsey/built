import { Template } from './template'
import { Elements } from './elements'
import { Observe } from '../observe';

export interface ConstructorOptions {
    componentName: string
    observedAttributes: string[]
    template: string
    style: string
    componentRoot: string
    properties?: {
        [key: string]: {
            format: (v, t) => any
            onChange: (v, t) => any
        }
    }
    elements?: {
        [key: string]: {
            selector: (v, t) => any
            onChange: (v, t) => any
        }
    }
    methods?: {
        [key: string]: () => {}
    }
    computed?: {
        [key: string]: (host) => () => {}
    },
    getters?: {
        [key: string]: (host) => {}
    },
    setters?: {
        [key: string]: (host) => {}
    },
    onConnected?: (host) => {}
}

export const Constructor = options => {

    const componentName = options.componentName
    const observedAttributes = options.observedAttributes || []
    const template = options.template || `<slot></slot>`
    const style = options.style || ``
    const componentRoot = options.componentRoot
    const properties = options.properties
    const elements = options.elements
    const methods = options.methods
    const computed = options.computed
    const getters = options.getters
    const setters = options.setters
    const onConnected = options.onConnected
    const onDisconnected = options.onDisconnected

    if (!componentName) { return }

    class Class extends HTMLElement {
        public state = {}
        public elements = {}
        public disconnectElements = () => { }

        static get observedAttributes(): string[] { return observedAttributes }

        constructor() { super() }

        public attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        public connectedCallback() {
            if (!this.shadowRoot) { Template(componentName, this, template, style, componentRoot) }

            if (computed) {
                Object.keys(computed).forEach(key => {
                    Object.defineProperty(this, key, computed[key](this))
                })
            }

            if (methods) {
                Object.keys(methods).forEach(key => this[key] = methods[key](this))
            }

            if (elements) {
                const ElementData = Elements(this, elements)
                this.elements = ElementData.state
                this.disconnectElements = ElementData.disconnect
            }

            if (properties) {
                Object.keys(properties).forEach(key => {
                    if (typeof properties[key].format !== `function`) { return }

                    this.state[key] = Observe(properties[key].format(this[key], this))

                    try {
                        Object.defineProperty(this, key, {
                            get() {
                                if (getters && getters[key]) { return getters[key](this) }
                                return this.state[key].value
                            },
                            set(value) {
                                if (!this.state[key]) { return }

                                if (setters && setters[key]) { return setters[key](this)(value) }

                                const formattedValue = properties[key].format(value, this)

                                if (this.state[key].value !== formattedValue) {
                                    this.state[key].next(formattedValue)
                                }
                            }
                        })
                    } catch (error) { }

                    if (typeof properties[key].onChange !== `function`) { return }

                    this.state[key].subscribe(val => {
                        properties[key].onChange(val, this)
                    })
                })
            }

            if (onConnected) {
                onConnected(this)
            }
        }

        public disconnectedCallback() {
            if (this.state) {
                Object.keys(this.state).forEach(key => {
                    this.state[key].complete()
                })
            }

            this.disconnectElements()

            if (onDisconnected) {
                onDisconnected(this)
            }
        }
    }

    return Class
}

export const Define = (componentName, Class) => {
    const wc = (window as any).WebComponents

    if (wc && wc.ready) {
        if (!window.customElements.get(componentName)) {
            window.customElements.define(componentName, Class)
        }
    } else {
        window.addEventListener('WebComponentsReady', function () {
            if (!window.customElements.get(componentName)) {
                window.customElements.define(componentName, Class)
            }
        })
    }
}