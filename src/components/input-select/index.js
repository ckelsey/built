import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'
import { ID } from '../../services/id.js'
import { properties as Properties } from '../input-shared/properties.js'
import { processedValue } from '../input-shared/processed-value.js'
import { processValue } from '../input-shared/process-value.js'
import { setCustomValidity } from '../input-shared/set-custom-validity.js'
import { validationMessage } from '../input-shared/validation-message.js'
import { validity } from '../input-shared/validity.js'
import { checkValidity } from '../input-shared/check-validity.js'
import { Pipe } from '../../utils/pipe.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { ToFilter } from '../../utils/to-filter.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { setInput } from '../input-shared/set-input.js'
import { Get } from '../../utils/get.js'
import { iconTriangle } from '../../services/icons.js'
import { ObjectAssign } from '../../utils/object-assign.js'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'input-select'
const componentRoot = ''.concat('.', componentName, '-container')
function postProcessValue() {
    return function (results) {
        return results.input.value = results.sanitized
    }
}

const properties = ObjectAssign({}, Properties, {
    options: {
        format: function (val) {
            return Pipe(
                CommasToArray,
                IfInvalid([]),
                ToMap(function (option) {
                    if (typeof option !== 'object') {
                        option = { value: option, label: option }
                    }

                    if (!Object.prototype.hasOwnProperty.call(option, 'value')) { return }

                    return option
                }),
                ToFilter(function (o) { return !!o })
            )(val).value
        },

        onChange: function (_val, host) { setInput(host) }

    },

    emptyoption: {
        format: function (val) { return val },
        onChange: function (_val, host) { setInput(host) }
    }
})

const observedAttributes = Object.keys(properties)

const elements = {
    arrow: {
        selector: '.input-field-arrow',
        onChange: function (el) { el.svg = iconTriangle }
    },
    container: { selector: '.input-field-container-inner' },
    error: { selector: '.input-field-message-error' },
    help: { selector: '.input-field-message-help' },
    inputContainer: { selector: '.input-field-input-container-inner' },
    root: { selector: '.input-field-container' },
}

const InputSelect = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements,
    methods: {
        processValue: processValue,
        setCustomValidity: setCustomValidity,
        postProcessValue: postProcessValue,
        checkValidity: checkValidity
    },
    computed: {
        processedValue: processedValue,
        validationMessage: validationMessage,
        validity: validity,
        selectedIndex: function (host) {
            return {
                get: function () {
                    return Get(host, 'input.selectedIndex', 0)
                }
            }
        },
        selectedOptions: function (host) {
            return {
                get: function () {
                    return Array.from(Get(host, 'input.selectedOptions', []))
                }
            }
        },
        optionElements: function (host) {
            return {
                get: function () {
                    return Array.from(Get(host, 'input.options', []))
                }
            }
        },
    },
    getters: { value: function (host) { return Get(host, 'state.value.value', '') } },
    onConnected: function (host) {
        host.inputID = ID()
        host.processValue()
    },
    formElement: true
})

Components.addComponent(componentName, InputSelect)

export { InputSelect }