import Template from './template'
import Elements from './elements'
import Observe from '../observe'
import { ToBool } from '../convert/bool'
import ID from '../id';
import { IfInvalid } from '../convert/if'
import pipe from '../pipe'
import Get from '../get'
import { ToFunction } from '../convert/function'

const unsub = (el, elementProperty, eventKey) => pipe(ToFunction, IfInvalid(() => { }))(Get(el, `${elementProperty}.${eventKey}`)).value()

const unsubscribeEvents = (el, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }
    Object.keys(el[elementProperty]).forEach(eventKey => unsub(el, elementProperty, eventKey))
}

const unsubscribeEvent = (el, eventKey, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }
    unsub(el, elementProperty, eventKey)
}

const setProperty = (host, key, formatter, getter, setter) => {

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

            if (host.state[key].value !== formattedValue) {
                host.state[key].next(formattedValue)
            }
        }
    })
}

const setStateProperty = (host, key, formatter, onChange, getter, setter) => {
    if (typeof formatter !== `function`) { return }

    host.state[key] = Observe(formatter(host[key], host))

    setProperty(host, key, formatter, getter, setter)

    if (typeof onChange !== `function`) { return }

    host.state[key].subscribe(val => onChange(val, host))
}

const Constructor = /*#__PURE__*/ options => {
    const componentName = options.componentName
    const observedAttributes = options.observedAttributes || []
    const template = options.template || `<slot></slot>`
    const style = options.style || ``
    const properties = options.properties
    const elements = options.elements
    const methods = options.methods
    const computed = options.computed
    const getters = options.getters || {}
    const setters = options.setters || {}
    const onConnected = options.onConnected
    const onDisconnected = options.onDisconnected
    const onReady = options.onReady

    if (!componentName) { return }

    const ConnectedFn = element => {
        element.wcID = ID(`wc`)
        element.unsubscribeEvent = unsubscribeEvent
        element.unsubscribeEvents = unsubscribeEvents

        if (computed) {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(element, key, computed[key](element))
            })
        }

        if (methods) {
            Object.keys(methods).forEach(key => element[key] = methods[key](element))
        }

        if (elements) {
            const ElementData = Elements(element, elements)
            element.elements = ElementData.state
            element.disconnectElements = ElementData.disconnect
        }

        if (!properties.ready) {
            setStateProperty(
                element,
                `ready`,
                val => pipe(ToBool, IfInvalid(false))(val).value,
                () => { },
                getters.ready,
                setters.ready
            )
        }

        if (properties) {
            Object.keys(properties).forEach(key => setStateProperty(element, key, properties[key].format, properties[key].onChange, getters[key], setters[key]))
        }

        if (onConnected) {
            onConnected(element)
        }

        element.state[`ready`].subscribe(() => element.dispatchEvent(new CustomEvent(`ready`, { detail: element })))
        element[`ready`] = true

        if (onReady) {
            onReady(element)
        }
    }

    class componentClass extends HTMLElement {
        public wcID
        public state = {}
        public elements = {}
        public disconnectElements = () => { }

        static get observedAttributes(): string[] { return observedAttributes }

        constructor() {
            super()
            Template(componentName, this, template, style, false, options.appendStylesToHead)
        }

        public attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        public connectedCallback() { ConnectedFn(this) }

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

    function newComponentObject() {
        return function (element) {
            element.observedAttributes = observedAttributes.slice()
            element.state = {}
            element.elements = {}
            element.disconnectElements = () => { }

            element.attributeChangedCallback = () => {

            }

            element.disconnectedCallback = () => {

            }

            Template(componentName, element, template, style, true, options.appendStylesToHead)

            ConnectedFn(element)

            return element
        }
    }

    return {
        object: newComponentObject(),
        component: componentClass
    }
}

export default Constructor