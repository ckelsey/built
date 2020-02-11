import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'
import { ID } from '../../services/id.js'
import { Get } from '../../utils/get.js'
import { properties } from '../input-shared/properties.js'
import { processedValue } from '../input-shared/processed-value.js'
import { processValue } from '../input-shared/process-value.js'
import { setCustomValidity } from '../input-shared/set-custom-validity.js'
import { validationMessage } from '../input-shared/validation-message.js'
import { ValidateBool } from '../../utils/validate-bool.js'
import { validity } from '../input-shared/validity.js'
import { checkValidity } from '../input-shared/check-validity.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { IfInvalid } from '../../utils/if-invalid.js'

const outerStyle = require('../input-shared/outer.scss').toString()
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'input-bool'
const componentRoot = ''.concat('.', componentName, '-container')
const elements = {
    container: { selector: '.input-field-container-inner' },
    count: { selector: '.input-field-character-count' },
    error: { selector: '.input-field-message-error' },
    help: { selector: '.input-field-message-help' },
    inputContainer: { selector: '.input-field-input-container-inner' },
    root: { selector: '.input-field-container' },
}

const inputProperties = Object.assign({}, properties, {
    showicon: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) {
            WhenAvailable(host, 'elements.container')
                .then(function containerReady(container) {
                    container.setAttribute('showicon', val)
                })
                .catch(function () { })
        }
    }
})

const InputBool = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(inputProperties),
    properties: inputProperties,
    elements: elements,
    methods: {
        processValue: processValue,
        setCustomValidity: setCustomValidity,
        preProcessValue: function (host) {
            return function (value) {
                if (!host.cachedPreProcessValueNeedsUpdate) {
                    return host.cachedPreProcessValue
                }

                return ValidateBool(value)
            }
        },
        postProcessValue: function (host) {
            return function (results) {
                return Promise.all([
                    WhenAvailable(host, 'elements.container')
                        .then(function (container) { return container.classList[results.sanitized ? 'add' : 'remove']('checked') })
                        .catch(function () { }),
                    WhenAvailable(host, 'input')
                        .then(function (input) { return input.checked = results.sanitized })
                        .catch(function () { })
                ])
            }
        },
        checkValidity: checkValidity
    },
    computed: {
        processedValue: processedValue,
        validationMessage: validationMessage,
        validity: validity
    },
    getters: {
        value: function (host) {
            if (!host.cacheNeedsUpdate) { return host.cachedValue.sanitized }
            return host.preProcessValue(Get(host, 'state.value.value', false)).sanitized
        }
    },
    onConnected: function (host) { host.inputID = ID() },
    formElement: true
})

Components.addComponent(componentName, InputBool)

export { InputBool }