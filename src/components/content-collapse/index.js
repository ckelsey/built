/**
 * add ripple and bounce to toggle container
 */

import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, AppendStyleElement, ComponentClassObject, WCDefine,
    ToNumber, ToString, IfInvalid, ToBool, Pipe, SetStyleRules, ObserveEvent
    // ObserverUnsubscribe, ObserveSlots
} from '../..'
import './style.scss'
import { iconTriangle } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `content-collapse`
const componentRoot = `.${componentName}-container`

const setStyles = (el, styles) => el ? SetStyleRules(el, styles) : undefined

export const setStyleElement = host => {
    let outerStyle = host.querySelector(`style[name="outer"]`)
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)

    const styleString = [
        style,
        host.theme,
        host.styles
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const properties = {
    class: ComponentClassObject,
    expanded: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            const transition = host.elements.transition
            if (transition && typeof transition.transitionTo === `function`) {
                transition.transitionTo(val ? 1 : 0)
                host.elements.icon.setAttribute(`rotation`, val ? `down` : `right`)
            }
        }
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange: (val, host) => {
            const transition = host.elements.transition
            if (transition) {
                transition.speed = val
            }
        }
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setStyleElement(host)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setStyleElement(host)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: { selector: componentRoot, },
    transition: { selector: `.${componentName}-transition` },
    icon: {
        selector: `.${componentName}-toggler-icon`,
        onChange(el) { el.svg = iconTriangle }
    },
    toggler: {
        selector: `.${componentName}-toggler`,
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded)
            }
        }
    },
}

export const ContentCollapse = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onConnected(host) {
        setStyleElement(host)
    }
})

WCDefine(componentName, ContentCollapse)