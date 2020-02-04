import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

const style = require(`./style.scss`).toString()
const outerStyle = `icon-element { display: inline-flex; align-items: center; justify-content: flex-start; }`
const elements = { svgContainer: { selector: `.svg-container` }, }

const attributes = {
    svg: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            OnNextFrame(() => {
                WCWhenPropertyReady(host, `elements.svgContainer`).then(el => el.innerHTML = value)
                host.dispatchEvent(new CustomEvent(`iconloaded`, { detail: host }))
            })
        }
    },
    color: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => OnNextFrame(() => WCWhenPropertyReady(host, `elements.svgContainer`).then(el => el.style.color = value))
    },
    size: {
        format: val => typeof val === `string` ? val : `1.5em`,
        onChange: (value, host) => OnNextFrame(() => WCWhenPropertyReady(host, `elements.svgContainer`).then(el => el.style.height = el.style.width = value))
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
    outerStyle,
    observedAttributes: Object.keys(attributes),
    properties,
    elements,
})

WCDefine(componentName, IconElement)