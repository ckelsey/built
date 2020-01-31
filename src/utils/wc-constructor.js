import { Equals } from './equals.js'
import { Pipe } from './pipe.js'
import { IfInvalid } from './if-invalid.js'
import { ID } from '../services/id.js'
import { ToBool } from './to-bool.js'
import { Observer } from './observer.js'
import { WCElements } from './wc-elements.js'
import { SetShadowRoot } from './set-shadow-root.js'
import { WCWhenPropertyReady } from './wc-when-property-ready.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { WCClass } from './wc-class.js'
import { ComponentClassObject } from './component-class-object.js'
import { SetStyleRules } from './set-style-rules.js'
import { WCOuterStyle } from './wc-outer-style.js'

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
        onConnected = () => { },
        onDisconnected = () => { },
        onReady = () => { },
        properties = {},
        setters = {},
        style = ``,
        outerStyle,
        template = `<slot></slot>`,
        formElement = false
    } = options

    if (!componentName) { return }

    const propertyKeys = Object.keys(properties)
    options.observedAttributes = options.observedAttributes || propertyKeys

    properties[`class`] = ComponentClassObject

    properties[`outertheme`] = {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => WCOuterStyle(componentName, host, val, `outertheme`)
    }

    properties[`styles`] = {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => WCWhenPropertyReady(host, `elements.injectedStyles`)
            .then(stylesElement => SetStyleRules(stylesElement, val))
            .catch(() => { })
    }

    properties[`theme`] = {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: (val, host) => WCWhenPropertyReady(host, `elements.theme`)
            .then(themeElement => SetStyleRules(themeElement, val))
            .catch(() => { })
    }

    options.observedAttributes.push(`class`)
    options.observedAttributes.push(`styles`)
    options.observedAttributes.push(`theme`)
    options.observedAttributes.push(`outertheme`)

    elements[`injectedStyles`] = { selector: `style.injectedStyles` }
    elements[`theme`] = { selector: `style.themeStyles` }
    elements[`componentStyle`] = { selector: `style.componentStyle` }

    const observedAttributes = options.observedAttributes

    const ConnectedFn = element => {
        OnNextFrame(() => {
            element.wcID = ID()

            element.unsubscribeEvents = () => ObserverUnsubscribe(element)

            Object.keys(computed).forEach(key => {
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

    const componentClass = WCClass(
        componentName,
        template,
        style,
        outerStyle,
        observedAttributes,
        ConnectedFn,
        onDisconnected,
        formElement,
    )

    function newComponentObject() {
        return function (element) {
            element.observedAttributes = observedAttributes.slice()
            element.state = {}
            element.elements = {}
            element.disconnectElements = () => { }
            element.attributeChangedCallback = () => { }
            element.disconnectedCallback = () => { }
            SetShadowRoot({ componentName, template, style, element })
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