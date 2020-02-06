import { Equals } from './equals.js'
import { Pipe } from './pipe.js'
import { IfInvalid } from './if-invalid.js'
import { ID } from '../services/id.js'
import { ToBool } from './to-bool.js'
import { Observer } from './observer.js'
import { WCElements } from './wc-elements.js'
import { WCWhenPropertyReady } from './wc-when-property-ready.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { ComponentClassObject } from './component-class-object.js'
import { SetStyleRules } from './set-style-rules.js'
import { WCOuterStyle } from './wc-outer-style.js'
import { WCClass } from './wc-class.js'

function emptyFn() { }

function setProperty(host, key, formatter, getter, setter) {
    try {
        Object.defineProperty(host, key, {
            get: function () {
                if (typeof getter === 'function') { return getter(host) }
                return host.state[key].value
            },
            set: function (value) {
                if (!host.state[key]) { return }

                if (typeof setter === 'function') { return setter(host)(value) }

                const formattedValue = formatter(value, host)
                const previous = host.state[key].value

                if (typeof previous === 'function' && typeof formattedValue === 'function' && formattedValue.toString() !== previous.toString()) {
                    return host.state[key].next(formattedValue)
                }

                if (!Equals(host.state[key].value, formattedValue)) {
                    host.state[key].next(formattedValue)
                }
            }
        })
    } catch (error) { }
}

function setStateProperty(host, key, formatter, onChange, getter, setter) {
    OnNextFrame(function setStatePropertyNext() {
        if (typeof formatter !== 'function') { return }

        host.state[key] = Observer(formatter(host[key], host))

        setProperty(host, key, formatter, getter, setter)

        if (typeof onChange !== 'function') { return }

        host.state[key].subscribe(function stateNext(val) { return onChange(val, host) })
    })
}

export function WCConstructor(options) {
    const componentName = options.componentName
    const computed = options.computed || {}
    const elements = options.elements || {}
    const getters = options.getters || {}
    const methods = options.methods || {}
    const onConnected = options.onConnected || emptyFn
    const onDisconnected = options.onDisconnected || emptyFn
    const onReady = options.onReady || emptyFn
    const properties = options.properties || {}
    const setters = options.setters || {}
    const style = options.style || ''
    const outerStyle = options.outerStyle
    const template = options.template || '<slot></slot>'
    const formElement = options.formElement || false

    if (!componentName) { return }

    const propertyKeys = Object.keys(properties)
    options.observedAttributes = options.observedAttributes || propertyKeys

    properties['class'] = ComponentClassObject

    properties['outertheme'] = {
        format: function (val) { return typeof val === 'string' ? val : '' },
        onChange: function (val, host) { return WCOuterStyle(componentName, host, val, 'outertheme') }
    }

    properties['styles'] = {
        format: function (val) { return typeof val === 'string' ? val : '' },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.injectedStyles')
                .then(function (stylesElement) { return SetStyleRules(stylesElement, val) })
                .catch(emptyFn())
        }
    }

    properties['theme'] = {
        format: function (val, host) { return typeof val === 'string' ? val : host.theme },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.theme')
                .then(function (themeElement) { return SetStyleRules(themeElement, val) })
                .catch(emptyFn)
        }
    }

    options.observedAttributes.push('class')
    options.observedAttributes.push('styles')
    options.observedAttributes.push('theme')
    options.observedAttributes.push('outertheme')

    elements['injectedStyles'] = { selector: 'style.injectedStyles' }
    elements['theme'] = { selector: 'style.themeStyles' }
    elements['componentStyle'] = { selector: 'style.componentStyle' }

    const observedAttributes = options.observedAttributes

    function ConnectedFn(element) {
        OnNextFrame(function ConnectedFnNext() {
            element.wcID = ID()

            function unsubscribeEvents() {
                return ObserverUnsubscribe(element)
            }

            function computedEach(key) {
                try { Object.defineProperty(element, key, computed[key](element)) } catch (error) { }
            }

            function methodsEach(key) {
                element[key] = methods[key](element)
            }

            function validationFn(val) {
                return Pipe(ToBool, IfInvalid(false))(val).value
            }

            function setPropFn(key) {
                return setStateProperty(
                    element,
                    key,
                    properties[key].format,
                    properties[key].onChange,
                    getters[key],
                    setters[key]
                )
            }

            function finishNext() {
                element['ready'] = true
                onReady(element)
                onConnected(element)
                element.dispatchEvent(new CustomEvent('ready', { detail: element }))
            }

            element.unsubscribeEvents = unsubscribeEvents
            Object.keys(computed).forEach(computedEach)
            Object.keys(methods).forEach(methodsEach)

            if (elements) {
                const ElementData = WCElements(element, elements)
                element.elements = ElementData.state
                element.disconnectElements = ElementData.disconnect
            }

            if (!properties.ready) {
                setStateProperty(
                    element,
                    'ready',
                    validationFn,
                    emptyFn,
                    getters.ready,
                    setters.ready
                )
            }

            Object.keys(properties).forEach(setPropFn)

            OnNextFrame(finishNext)
        })

    }

    return WCClass(
        componentName,
        template,
        style,
        outerStyle,
        observedAttributes,
        ConnectedFn,
        onDisconnected,
        formElement
    )
}