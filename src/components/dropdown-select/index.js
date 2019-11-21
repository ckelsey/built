import { WCConstructor, WCDefine } from '../..'
import { observedAttributes, properties, selectedIndex, selectedOptionElement, optionElements } from './properties'
import elements from './elements'
import { initInput, focus, blur } from './methods'
import './style.scss'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const formatter = (host, value, key) => {
    if (value === undefined && typeof host.state[key].value === `function`) { return }
    const formatted = host.properties[key].format(value)
    if (formatted !== host.state[key].value) { host.state[key].next(formatted) }
}
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `dropdown-select`
const componentRoot = `.${componentName}-container`
export const DropdownSelect = /*#__PURE__*/ WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: {
        focus,
        blur
    },
    computed: {
        selectedIndex,
        selectedOptionElement,
        optionElements
    },
    setters: {
        formatlabel: host => value => formatter(host, value, `formatlabel`),
        formatvalue: host => value => formatter(host, value, `formatvalue`),
        formatvaluelabel: host => value => formatter(host, value, `formatvaluelabel`),
    },
    onReady: host => initInput(host)
})

WCDefine(componentName, DropdownSelect)