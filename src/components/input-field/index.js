// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
import { WCConstructor, WCDefine, ID } from '../..'
import { observedAttributes, properties } from './properties'
import { setEffects } from './methods-elements'
import { processedValue, labelContainer, formattedValue, valid, validationMessage } from './computed'
import elements from './elements'
import { setError } from './methods-value'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `input-field`
const componentRoot = `.input-field-container`

export const InputField = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: {
        setError
    },
    computed: {
        processedValue,
        formattedValue,
        labelContainer,
        valid,
        validationMessage
    },
    getters: {
        value: host => host.formattedValue,
        invalid: host => !host.valid
    },
    setters: {
        value: host => value => host.state.value.next(value)
    },
    onConnected: host => {
        host.inputID = ID()
        setEffects(host)

        requestAnimationFrame(() => {
            host.elements.checkIcon.svg = `<svg xmlns="http://www.w3.org/2000/svg" style="stroke:currentColor;stroke-width:2px;" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
        })
    }
})

WCDefine(componentName, InputField)