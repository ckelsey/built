import { WCConstructor, WCDefine, OnNextFrame, WCwhenPropertyReady } from '../..'

const style = require(`./style.scss`).toString()
const elements = { svgContainer: { selector: `.svg-container` }, }

const attributes = {
    svg: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            OnNextFrame(() => {
                WCwhenPropertyReady(host, `elements.svgContainer`).then(el => el.innerHTML = value)
                host.dispatchEvent(new CustomEvent(`iconloaded`, { detail: host }))
            })
        }
    },
    color: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => OnNextFrame(() => WCwhenPropertyReady(host, `elements.svgContainer`).then(el => el.style.color = value))
    },
    size: {
        format: val => typeof val === `string` ? val : `1.5em`,
        onChange: (value, host) => OnNextFrame(() => WCwhenPropertyReady(host, `elements.svgContainer`).then(el => el.style.height = el.style.width = value))
    }
}

const properties = Object.assign({}, {
    subscription: { format: val => val }
}, attributes)

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