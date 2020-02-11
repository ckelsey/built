import { OnNextFrame } from '../../services/on-next-frame.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { Components } from '../../services/components.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'

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
                WhenAvailable(host, 'elements.svgContainer')
                    .then(function (el) { el.innerHTML = value })
                    .catch(function () { })
                DispatchEvent(host, 'iconloaded', host)
            })
        }
    },
    color: {
        format: function (val) {
            return typeof val === 'string' ? val : null
        },
        onChange: function (value, host) {
            OnNextFrame(function () {
                WhenAvailable(host, 'elements.svgContainer')
                    .then(function (el) { el.style.color = value })
                    .catch(function () { })
            })
        }
    },
    size: {
        format: function (val) {
            return typeof val === 'string' ? val : '1.5em'
        },
        onChange: function (value, host) {
            OnNextFrame(function () {
                WhenAvailable(host, 'elements.svgContainer')
                    .then(function (el) { el.style.height = el.style.width = value })
                    .catch(function () { })
            })
        }
    }
}

const properties = Object.assign({}, {
    subscription: {
        format: function (val) {
            return val
        }
    }
}, attributes)

const template = require('./index.html')
const componentName = 'icon-element'
const componentRoot = ''.concat('.', componentName, '-container')

const IconElement = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(attributes),
    properties: properties,
    elements: elements
})

Components.addComponent(componentName, IconElement)

export { IconElement }