import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { observedAttributes, properties } from './properties'
import { setEffects } from './methods-elements'
import { processedValue, labelContainer, formattedValue, valid, validationMessage } from './computed'
import elements from './elements'
import ID from '../../utils/id'

import '../effect-bounce-z'
import '../effect-ripple'
import '../effect-underline'
import '../icon-element'
import './style.scss'
import { setError } from './methods-value'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `input-field`
const componentRoot = `.input-field-container`

const InputField = /*#__PURE__*/ Constructor({
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

Define(componentName, InputField)

export default InputField