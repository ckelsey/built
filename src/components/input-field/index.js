import { WCConstructor, WCDefine, ID } from '../..'
import { observedAttributes, properties } from './properties'
import { processedValue, formattedValue, valid, validationMessage } from './computed'
import { elements } from './elements'
import { setError } from './methods-value'

const style = require(`./style.scss`).toString()
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
    methods: { setError },
    computed: {
        processedValue,
        formattedValue,
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
    onConnected: host => host.inputID = ID(),
    formElement: true
})

WCDefine(componentName, InputField, `input`)