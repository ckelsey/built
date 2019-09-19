import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { observedAttributes, properties } from './properties'
import { setEffects } from './methods-elements'
import { processedValue, labelContainer, formattedValue } from './computed'
import elements from './elements'
import ID from '../../utils/id'
import { INPUTFIELD } from './theme'

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

const InputField = Constructor({
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
        labelContainer
    },
    getters: {
        value: host => host.formattedValue,
        invalid: host => Array.isArray(host.processedValue) ? host.processedValue.map(v => !v.valid).filter(v => !!v).length > 1 : !host.processedValue.valid
    },
    setters: {
        value: host => value => host.state.value.next(value)
    },
    onConnected: host => {
        host.inputID = ID(`input-field`)
        setEffects(host)

        requestAnimationFrame(() => {
            host.elements.checkIcon.svg = INPUTFIELD.checkIcon
        })
    }
})

Define(componentName, InputField)

export default InputField