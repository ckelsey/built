import { Equals } from './equals.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { Observer } from './observer.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { WCElements } from './wc-elements.js'
import { Pipe } from './pipe.js'
import { ToBool } from './to-bool.js'
import { IfInvalid } from './if-invalid.js'
import { SetShadowRoot } from './set-shadow-root.js'
import { ComponentStore } from '../services/componentStore.js'
import { ID } from '../services/id.js'

/** Does not actually mutate anything, tho itself gets mutated across setting styles, properties, etc */

const setProperty = (host, key, formatter, getter, setter) => {
    try {
        Object.defineProperty(host, key, {
            get() {
                if (typeof getter === `function`) { return getter(host) }
                return host.state[key].value
            },
            set(value) {
                if (!host.state[key]) { return }

                if (typeof setter === `function`) { return setter(host)(value) }

                const formattedValue = formatter(value, host)
                const previous = host.state[key].value

                if (typeof previous === `function` && typeof formattedValue === `function` && formattedValue.toString() !== previous.toString()) {
                    return host.state[key].next(formattedValue)
                }

                if (!Equals(host.state[key].value, formattedValue)) {
                    host.state[key].next(formattedValue)
                }
            }
        })
        // eslint-disable-next-line no-empty
    } catch (error) { }
}

const setStateProperty = (host, key, formatter, onChange, getter, setter) => {
    OnNextFrame(() => {
        if (typeof formatter !== `function`) { return }

        host.state[key] = Observer(formatter(host[key], host))

        setProperty(host, key, formatter, getter, setter)

        if (typeof onChange !== `function`) { return }

        host.state[key].subscribe(val => onChange(val, host))
    })
}

export function WCConstructor(options) {
    const {
        componentName,
        computed = {},
        elements = {},
        getters = {},
        methods = {},
        observedAttributes = [],
        onConnected = () => { },
        onDisconnected = () => { },
        onReady = () => { },
        properties = {},
        setters = {},
        style = ``,
        template = `<slot></slot>`,
    } = options

    if (!componentName) { return }

    const ConnectedFn = element => {
        OnNextFrame(() => {
            element.wcID = ID()

            element.unsubscribeEvents = () => ObserverUnsubscribe(element)

            Object.keys(computed).forEach(key => {
                // eslint-disable-next-line no-empty
                try { Object.defineProperty(element, key, computed[key](element)) } catch (error) { }
            })

            Object.keys(methods).forEach(key => element[key] = methods[key](element))

            if (elements) {
                const ElementData = WCElements(element, elements)
                element.elements = ElementData.state
                element.disconnectElements = ElementData.disconnect
            }

            if (!properties.ready) {
                setStateProperty(
                    element,
                    `ready`,
                    val => Pipe(ToBool, IfInvalid(false))(val).value,
                    () => { },
                    getters.ready,
                    setters.ready
                )
            }

            Object.keys(properties).forEach(key => setStateProperty(
                element,
                key,
                properties[key].format,
                properties[key].onChange,
                getters[key],
                setters[key]
            ))

            OnNextFrame(() => {
                element[`ready`] = true
                onReady(element)
                onConnected(element)

                // check - when should events go off?
                element.dispatchEvent(new CustomEvent(`ready`, { detail: element }))
            })
        })
    }

    class componentClass extends HTMLElement {

        static get observedAttributes() { return observedAttributes }

        constructor() {
            const self = super()
            self.wcID = ``
            self.state = {}
            self.elements = {}
            self.disconnectElements = () => { }
            SetShadowRoot({ componentName, template, style, element: self })
            return self
        }

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

    function newComponentObject() {
        return function (element) {
            element.observedAttributes = observedAttributes.slice()
            element.state = {}
            element.elements = {}
            element.disconnectElements = () => { }
            element.attributeChangedCallback = () => { }
            element.disconnectedCallback = () => { }
            SetShadowRoot(componentName, element, template, style, true, options.appendStylesToHead)
            ConnectedFn(element)
            return element
        }
    }

    /** TODO - to provide support for old ass browsers eventually */
    const object = newComponentObject()

    return {
        object,
        component: componentClass
    }
}