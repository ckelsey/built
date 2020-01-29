/**
 * add ripple and bounce to toggle container
 */

import { WCConstructor, AppendStyleElement, ComponentClassObject, WCDefine, ToNumber, ToString, IfInvalid, ToBool, Pipe, SetStyleRules, ObserveEvent } from '../..'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { GetParent } from '../../utils/get-parent.js'
import { iconChevron } from '../../services/icons.js'

const style = require(`./style.scss`).toString()
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
            host.setAttribute(`expanded`, val)

            if (host.group && val) {
                const parent = GetParent(host)

                Array
                    .from(parent ? parent.children : [])
                    .forEach(s => s !== host && s.group === host.group && s.expanded === true ? s.expanded = false : undefined)
            }

            WCwhenPropertyReady(host, `elements.transition.transition`)
                .then(transition => {
                    transition(val ? 1 : 0)
                    host.elements.icon.setAttribute(`rotation`, val ? `down` : `right`)
                })
        }
    },
    arrow: {
        format: val => Pipe(ToString, IfInvalid(iconChevron))(val).value,
        onChange(val, host) { WCwhenPropertyReady(host, `elements.icon`).then(el => el.svg = val) }
    },
    group: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.transition`).then(transition => transition.speed = val)

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
    icon: { selector: `.${componentName}-toggler-icon` },
    toggler: {
        selector: `.${componentName}-toggler`,
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded),
                mouseenter: ObserveEvent(el, `mouseenter`).subscribe(() => el.classList.add(`hovering`)),
                mouseleave: ObserveEvent(el, `mouseleave`).subscribe(() => el.classList.remove(`hovering`))
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