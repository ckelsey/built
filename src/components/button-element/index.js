import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { CreateElement } from '../../utils/create-element.js'
import { LoadOnReady } from '../../component-build/load-on-ready.js'

const name = 'button-element'

const properties = {
    name: {
        format: function (val, host) { return Pipe(ToString, IfInvalid(host.textContent.trim()))(val).value },
        onChange: function (val, host) {
            return WhenAvailable(host, 'elements.button')
                .then(function btnReady(btn) {
                    btn.setAttribute('name', val)
                })
                .catch(function () { })
        }
    },
    disabled: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (val, host) {
            return WhenAvailable(host, 'elements.root')
                .then(function rootReady(root) {
                    root.classList[val ? 'add' : 'remove']('disabled')
                })
                .catch(function () { })
        }
    },
    type: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value },
        onChange: function (val, host) {
            return WhenAvailable(host, 'elements.button')
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
                .catch(function () { })
        }
    }
}

const elements = {
    root: { selector: '.' + name + '-container', },
    button: { selector: '.' + name + '-container > button', }
}

const ButtonElement = {
    componentName: name,
    template: require('./index.html'),
    shadowStyle: require('./style.scss').toString(),
    outerStyle: require('./outer.scss').toString(),
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    onConnected: function (host) {
        host.setAttribute('ready', true)
    },
}

LoadOnReady(ButtonElement)

export { ButtonElement }