import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { CreateElement } from '../../utils/create-element.js'

const template = require('./index.html')
const componentName = 'button-element'
const componentRoot = '.' + componentName + '-container'
const style = require('./style.scss').toString()

const properties = {
    name: {
        format: function (val, host) { return Pipe(ToString, IfInvalid(host.textContent))(val).value },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.button').then(
                function btnReady(btn) {
                    btn.setAttribute('name', val)
                }
            )
        }
    },
    disabled: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.root').then(
                function rootReady(root) {
                    root.classList[val ? 'add' : 'remove']('disabled')
                }
            )
        }
    },
    type: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.button')
                .then(function btnReady(btn) {
                    if (val) {
                        btn.setAttribute('type', 'submit')
                        btn.appendChild(CreateElement({
                            tagName: 'input',
                            type: 'submit'
                        }))
                    } else {
                        btn.removeAttribute('type', 'submit')
                        try { btn.removeChild(btn.querySelector('input[type="submit"]')) } catch (error) { }
                    }
                })
        }
    }
}

const elements = {
    root: { selector: componentRoot, },
    button: { selector: componentRoot + ' > button' },
    slot: { selector: 'slot' }
}

export const ButtonElement = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: 'button-element{display:inline-block;}',
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    onConnected: function (host) { host.elements.button.classList.add('ready') },
})

WCDefine(componentName, ButtonElement)