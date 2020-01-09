import { iconTriangle } from '../../services/icons.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToString } from '../../utils/to-string.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

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