import { WCConstructor, WCDefine, CreateElement, Pipe, IfInvalid, ToString, WCwhenPropertyReady } from '../..'
import { ToBool } from '../../utils/to-bool'

const template = require(`./index.html`)
const componentName = `button-element`
const componentRoot = `.${componentName}-container`
const style = require(`./style.scss`).toString()

const properties = {
    name: {
        format: (val, host) => Pipe(ToString, IfInvalid(host.textContent))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.button`).then(btn => btn.setAttribute(`name`, val))
    },
    disabled: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.root`).then(root => root.classList[val ? `add` : `remove`](`disabled`))
    },
    type: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.button`)
            .then(btn => {
                if (val) {
                    btn.setAttribute(`type`, `submit`)
                    btn.appendChild(CreateElement({
                        tagName: `input`,
                        type: `submit`
                    }))
                } else {
                    btn.removeAttribute(`type`, `submit`)
                    try { btn.removeChild(btn.querySelector(`input[type="submit"]`)) } catch (error) { }
                }
            })
    }
}

const elements = {
    root: { selector: componentRoot, },
    button: { selector: `${componentRoot} > button` },
    slot: { selector: `slot` }
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