import { Constructor, Define } from '../../utils/webcomponent/constructor'
import { observedAttributes, properties } from './properties'
import { clearInput, processThis, processValue } from './methods-value'
import { filterSelect, setOptions, setNativeOptions } from './methods-select'
import { setClearButton, setCount, setInputAttributes, setIcon, setLabel, setMax, setEffects, setInputID } from './methods-elements'
import { onInput, onFocus, onBlur, onKeyDown, onLabelClick, onDone, onInvalid, dispatch } from './methods-events'
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
    methods: {
        clearInput,
        dispatch,
        filterSelect,
        onBlur,
        onDone,
        onFocus,
        onInput,
        onInvalid,
        onKeyDown,
        onLabelClick,
        processValue,
        processThis,
        setClearButton,
        setCount,
        setEffects,
        setInputAttributes,
        setIcon,
        setLabel,
        setMax,
        setNativeOptions,
        setOptions,
        setInputID,
    },
    computed: {
        processedValue,
        formattedValue,
        labelContainer,
        selected,
        optionElements
    },
    getters: {
        value: host => host.formattedValue
    },
    setters: {
        value: host => value => host.state.value.next(value)
    },
    onConnected: host => {
        host.inputID = ID(`input-field`)
        host.setInputID(host.inputID)
        host.setEffects()

        requestAnimationFrame(() => {
            host.elements.checkIcon.svg = checkIcon
            host.ready = true
        })
    }
})

Define(componentName, InputField)

export default InputField