// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
import '../button-element/index.js'
import { WCConstructor } from '../utils/wc-constructor.js'
import { WCDefine } from '../utils/wc-define.js'
import { SetStyleRules } from '../utils/set-style-rules.js'
import { ComponentClassObject } from '../utils/component-class-object.js'
import { IfInvalid } from '../utils/if-invalid.js'
import { ToBool } from '../utils/to-bool.js'
import { Pipe } from '../utils/pipe.js'
import { ToString } from '../utils/to-string.js'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)

const componentName = `component-name`
const componentRoot = `.${componentName}-container`

const setStyles = (el, styles) => el ? SetStyleRules(el, styles) : undefined

const properties = {
    class: ComponentClassObject,
    expanded: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    }
}

const ComponentInstance = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements
})

WCDefine(componentName, ComponentInstance)

export default ComponentInstance