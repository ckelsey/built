import { Constructor, Define } from '../../utils/webcomponent/constructor'
import { observedAttributes, properties } from './properties'
import { setEffects } from './methods-elements'
import { processedValue, labelContainer, selected, optionElements, formattedValue } from './computed'
import elements from './elements'
import { checkIcon } from './definitions'
import ID from '../../utils/id'

import '../effect-bounce-z'
import '../effect-ripple'
import '../effect-underline'
import '../icon-element'
import '../overlay-content'

const template = require('./index.html')
const style = require('./style.html')
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
    computed: {
        processedValue,
        formattedValue,
        labelContainer,
        selected,
        optionElements
    },
    getters: {
        value: host => host.formattedValue,
        invalid: host => !host.processedValue.valid
    },
    setters: {
        value: host => value => host.state.value.next(value)
    },
    onConnected: host => {
        host.inputID = ID(`input-field`)
        setEffects(host)

        requestAnimationFrame(() => {
            host.elements.checkIcon.svg = checkIcon
            host.ready = true
        })
    }
})

Define(componentName, InputField)

export default InputField