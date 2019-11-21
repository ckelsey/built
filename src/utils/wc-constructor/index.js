import {
    AppendStyleElement, ComponentStore, Equals, ToFunction, Get, Pipe,
    IfInvalid, ID, ToBool, Observer, WCElements, SetShadowRoot
} from '../..'

const unsub = (el, elementProperty, eventKey) => Pipe(ToFunction, IfInvalid(() => { }))(Get(el, `${elementProperty}.${eventKey}`)).value()

const unsubscribeEvents = (el, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }
    Object.keys(el[elementProperty]).forEach(eventKey => unsub(el, elementProperty, eventKey))
}

const unsubscribeEvent = (el, eventKey, elementProperty = `eventSubscriptions`) => {
    if (!el || !el[elementProperty]) { return }
    unsub(el, elementProperty, eventKey)
}

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
    if (typeof formatter !== `function`) { return }

    host.state[key] = Observer(formatter(host[key], host))

    setProperty(host, key, formatter, getter, setter)

    if (typeof onChange !== `function`) { return }

    host.state[key].subscribe(val => onChange(val, host))
}

export function WCConstructor(options) {
    const componentName = options.componentName
    const observedAttributes = options.observedAttributes || []
    const template = options.template || `<slot></slot>`
    const style = options.style || ``
    const properties = options.properties || {}
    const elements = options.elements || {}
    const methods = options.methods
    const computed = options.computed
    const getters = options.getters || {}
    const setters = options.setters || {}
    const onConnected = options.onConnected
    const onDisconnected = options.onDisconnected
    const onReady = options.onReady

    if (!componentName) { return }

    const ConnectedFn = element => {

        if (options.appendStylesToParent) {
            AppendStyleElement(style, element.parentElement, componentName)
        }

        element.wcID = ID()
        element.unsubscribeEvent = unsubscribeEvent
        element.unsubscribeEvents = unsubscribeEvents

        if (computed) {
            Object.keys(computed).forEach(key => {
                // eslint-disable-next-line no-empty
                try { Object.defineProperty(element, key, computed[key](element)) } catch (error) { }
            })
        }

        if (methods) {
            Object.keys(methods).forEach(key => element[key] = methods[key](element))
        }

        if (elements) {
            const ElementData = WCElements(element, elements)
            element.elements = ElementData.state
            element.disconnectElements = ElementData.disconnect
        }

        if (properties && !properties.ready) {
            setStateProperty(
                element,
                `ready`,
                val => Pipe(ToBool, IfInvalid(false))(val).value,
                () => { },
                getters.ready,
                setters.ready
            )
        }

        if (properties) {
            Object.keys(properties).forEach(key => setStateProperty(
                element,
                key,
                properties[key].format,
                properties[key].onChange,
                getters[key],
                setters[key]
            ))
        }

        if (onConnected) {
            onConnected(element)
        }

        if (element.state[`ready`]) {
            element.state[`ready`].subscribe(() => element.dispatchEvent(new CustomEvent(`ready`, { detail: element })))
        }

        element[`ready`] = true

        if (onReady) {
            onReady(element)
        }

        element.dispatchEvent(new CustomEvent(`ready`, { detail: element }))
    }

    class componentClass extends HTMLElement {

        static get observedAttributes() { return observedAttributes }

        constructor() {
            super()
            this.wcID = ``
            this.state = {}
            this.elements = {}
            this.disconnectElements = () => { }
            SetShadowRoot(componentName, this, template, style, false, options.appendStylesToHead)
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

            SetShadowRoot(componentName, element, template, style, true, options.appendStylesToHead)

            ConnectedFn(element)

            return element
        }
    }

    return {
        object: newComponentObject(),
        component: componentClass
    }
}