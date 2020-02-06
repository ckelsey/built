import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { AssignObject } from '../../utils/assign.js'

const style = require('./style.scss').toString()
const outerStyle = 'icon-element { display: inline-flex; align-items: center; justify-content: flex-start; }'
const elements = { svgContainer: { selector: '.svg-container' }, }

const attributes = {
    svg: {
        format: function (val) {
            return typeof val === 'string' ? val : null
        },
        onChange: function (value, host) {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            OnNextFrame(function () {
                WCWhenPropertyReady(host, 'elements.svgContainer').then(function (el) { el.innerHTML = value })
                host.dispatchEvent(new CustomEvent('iconloaded', { detail: host }))
            })
        }
    },
    color: {
        format: function (val) {
            return typeof val === 'string' ? val : null
        },
        onChange: function (value, host) {
            OnNextFrame(function () {
                WCWhenPropertyReady(host, 'elements.svgContainer').then(function (el) { el.style.color = value })
            })
        }
    },
    size: {
        format: function (val) {
            return typeof val === 'string' ? val : '1.5em'
        },
        onChange: function (value, host) {
            OnNextFrame(function () {
                WCWhenPropertyReady(host, 'elements.svgContainer').then(function (el) { el.style.height = el.style.width = value })
            })
        }
    }
}

const properties = AssignObject({}, {
    subscription: {
        format: function (val) {
            return val
        }
    }
}, attributes)

const template = require('./index.html')
const componentName = 'icon-element'
const componentRoot = ''.concat('.', componentName, '-container')
export const IconElement = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(attributes),
    properties: properties,
    elements: elements
})

WCDefine(componentName, IconElement)