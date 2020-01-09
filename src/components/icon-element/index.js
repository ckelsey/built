import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { OnNextFrame } from '../../services/on-next-frame.js'

const style = require(`./style.scss`).toString()
const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {
    root: { selector: `.icon-element-container` },
    svgContainer: { selector: `.svg-container` },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    }
}

const attributes = {
    svg: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            OnNextFrame(() => {
                host.elements.svgContainer.innerHTML = value
                host.dispatchEvent(new CustomEvent(`iconloaded`, { detail: host }))
            })
        }
    },
    color: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => OnNextFrame(() => host.elements.svgContainer.style.color = value)
    },
    size: {
        format: val => typeof val === `string` ? val : `1.5em`,
        onChange: (value, host) => OnNextFrame(() => host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value)
    },
    class: ComponentClassObject,
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const properties = Object.assign({}, {
    subscription: {
        format: val => val
    }
}, attributes)

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `icon-element`
const componentRoot = `.icon-element-container`
export const IconElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    properties,
    elements,
})

WCDefine(componentName, IconElement)