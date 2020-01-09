import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { observedAttributes, properties } from './properties.js'
import { setEffects } from './methods-elements.js'
import { processedValue, labelContainer, formattedValue, valid, validationMessage } from './computed.js'
import elements from './elements.js'
import { setError } from './methods-value.js'
import { ID } from '../../services/id.js'

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