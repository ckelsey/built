import { WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, OnNextFrame } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const elementSelectors = {
    root: `.icon-element-container`,
    svgContainer: `.svg-container`,
    injectedStyles: `style.injectedStyles`
}

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: key === `injectedStyles`
            ? (el, host) => setStyles(el, host.styles)
            : () => { }
    }
})

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