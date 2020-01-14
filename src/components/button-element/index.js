import {
    WCConstructor, WCDefine, Pipe, IfInvalid, ComponentClassObject,
    ToString, SetStyleRules, ToBool, WCwhenPropertyReady
} from '../..'

const template = require(`./index.html`)
const componentName = `button-element`
const componentRoot = `.${componentName}-container`
const style = require(`./style.scss`).toString()

const properties = {
    class: ComponentClassObject,
    name: {
        format: (val, host) => Pipe(ToString, IfInvalid(host.textContent))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.button`).then(btn => btn.setAttribute(`name`, `submit`))
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.injectedStyles`).then(stylesElement => SetStyleRules(stylesElement, val))
    },
    theme: {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.theme`).then(themeElement => SetStyleRules(themeElement, val))
    },
    submit: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange(val, host) {
            WCwhenPropertyReady(host, `elements.button`).then(btn => btn.setAttribute(`type`, `submit`))
        }
    }
}

const elements = {
    root: { selector: componentRoot, },
    button: { selector: `${componentRoot} > button` },
    injectedStyles: { selector: `${componentRoot} style.injectedStyles`, },
    theme: { selector: `${componentRoot} style.themeStyles`, }
}

export const ButtonElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    onConnected: host => host.elements.button.classList.add(`ready`),
})

WCDefine(componentName, ButtonElement)