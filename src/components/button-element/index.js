import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { ToBool } from '../../utils/to-bool.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import template from './index.html'
import style from './style.scss'

const componentName = `button-element`
const componentRoot = `.${componentName}-container`
const setStyles = (elKey, host, styles) => WCwhenPropertyReady(host, `elements.${elKey}`).then(el => { SetStyleRules(el, styles) })

const properties = {
    accentcolor: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (val, host) => {
            const setColor = el => el.color = val
            WCwhenPropertyReady(host, `elements.ripple`).then(setColor)
            WCwhenPropertyReady(host, `elements.bounce`).then(setColor)
        }
    },
    class: ComponentClassObject,
    ripple: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => WCwhenPropertyReady(host, `elements.ripple`)
            .then(ripple => WCwhenPropertyReady(host, `elements.button`).then(button => (ripple, button)))
            .then(els => {
                els.ripple.color = host.accentcolor
                els.ripple.targets = host.ripple ? [els.button] : []
            })
    },
    bounce: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => WCwhenPropertyReady(host, `elements.bounce`)
            .then(bounce => WCwhenPropertyReady(host, `elements.button`).then(button => (bounce, button)))
            .then(els => els.bounce.targets = host.bounce ? [els.button] : [])
    },
    name: {
        format: (val, host) => Pipe(ToString, IfInvalid(host.textContent))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host.elements, `button`).then(el => el.setAttribute(`name`, val))
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(`injectedStyles`, host, val)
    },
    theme: {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: (val, host) => setStyles(`theme`, host, val)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: { selector: componentRoot, },
    button: { selector: `${componentRoot} > button` },
    ripple: { selector: `${componentRoot} > button > effect-ripple` },
    bounce: { selector: `${componentRoot} > button > effect-bounce-z`, },
    injectedStyles: { selector: `${componentRoot} style.injectedStyles`, },
    theme: { selector: `${componentRoot} style.themeStyles` }
}

export const ButtonElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onConnected: host => {
        host.elements.button.classList.add(`ready`)
    },
})

WCDefine(componentName, ButtonElement)