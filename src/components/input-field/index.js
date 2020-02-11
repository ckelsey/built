import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ID } from '../../services/id.js'
import { Pipe } from '../../utils/pipe.js'
import { ToString } from '../../utils/to-string.js'
import { Get } from '../../utils/get.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { SetAttribute } from '../../utils/set-attribute.js'

import { processedValue } from '../input-shared/processed-value.js'
import { properties as Properties } from '../input-shared/properties.js'
import { processValue } from '../input-shared/process-value.js'
import { setCustomValidity } from '../input-shared/set-custom-validity.js'
import { validationMessage } from '../input-shared/validation-message.js'
import { validity } from '../input-shared/validity.js'
import { checkValidity } from '../input-shared/check-validity.js'

import { valueValidation } from './value-validation.js'
import { valueMaxMin } from './value-max-min.js'
import { valueFormat } from './value-format.js'
import { ToBool } from '../../utils/to-bool.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { ToNumber } from '../../utils/to-number.js'

const outerStyle = require('../input-shared/outer.scss').toString()
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'input-field'
const componentRoot = ''.concat('.', componentName, '-container')

function preProcessValue(host) {
    return function (value) {
        if (!host.cachedPreProcessValueNeedsUpdate) {
            return host.cachedPreProcessValue
        }

        const validated = valueValidation(value, host.type, host.allowhtml, host.disallowhtml)
        const formatParsed = valueFormat(host.format, validated.sanitized)
        const parsedValue = valueMaxMin(host, formatParsed.value)

        const data = {
            valid: validated.valid && parsedValue.valid && formatParsed.valid,
            reason: [
                !formatParsed.valid ? 'Value does not match pattern' : undefined,
                parsedValue.errorText,
            ]
                .concat(validated.reason)
                .filter(function (m) { return !!m }),
            value: parsedValue.value,
            sanitized: parsedValue.value
        }

        host.cachedPreProcessValue = data

        return data
    }
}

function postProcessValue(host) {
    return function (results) {
        results.input.value = results.sanitized
        host.count = host.type === 'number' ? results.sanitized : results.sanitized ? results.sanitized.length : 0
    }
}

const properties = Object.assign({}, Properties, {
    pattern: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value },
        onChange: function (val, host) {
            WhenAvailable(host, 'input')
                .then(function (input) { return SetAttribute(input, 'pattern', val) })
                .catch(function () { })
        }
    },
    cachedPreProcessValueNeedsUpdate: { format: function (val) { return Pipe(ToBool, IfInvalid(true))(val).value } },
    cachedPreProcessValue: {
        format: function (val) { return val },
        onChange: function (_val, host) { host.cachedPreProcessValueNeedsUpdate = false }
    },
    resize: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('none'))(val).value
        },
        onChange: function (val, host) {
            WhenAvailable(host, 'elements.inputContainer')
                .then(function (inputContainer) {
                    inputContainer.setAttribute('resize', val)
                })
                .catch(function () { })
        }
    },
    max: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(null))(val).value },
        onChange: function (val, host) {
            WhenAvailable(host, 'input')
                .then(function (input) {
                    if (host.type === 'number') {
                        return SetAttribute(input, 'max', val)
                    }

                    return SetAttribute(input, 'maxlength', val)
                })
                .catch(function () { })
        }
    },
    min: {
        onChange: function (val, host) {
            WhenAvailable(host, 'input')
                .then(function (input) {
                    if (host.type === 'number') {
                        return SetAttribute(input, 'min', val)
                    }

                    return SetAttribute(input, 'minlength', val)
                })
                .catch(function () { })
        }
    }
})

const elements = {
    clearButton: {
        selector: '.input-field-clear',
        /** TODO needs to add back functionality */
    },
    container: { selector: '.input-field-container-inner' },
    count: { selector: '.input-field-character-count' },
    error: { selector: '.input-field-message-error' },
    help: { selector: '.input-field-message-help' },
    icon: {
        selector: '.input-field-icon',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(function () {
                    DispatchEvent(host, 'iconclick', host)
                })
            }
        }
    },
    inputContainer: { selector: '.input-field-input-container-inner' },
    max: { selector: '.input-field-character-count-max' },
    root: { selector: '.input-field-container' }
}

const InputField = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    properties: properties,
    observedAttributes: Object.keys(properties),
    elements: elements,
    methods: {
        processValue: processValue,
        setCustomValidity: setCustomValidity,
        checkValidity: checkValidity,
        preProcessValue: preProcessValue,
        postProcessValue: postProcessValue,
    },
    computed: {
        processedValue: processedValue,
        validationMessage: validationMessage,
        validity: validity
    },
    getters: {
        value: function (host) {
            if (!host.cacheNeedsUpdate) { return host.cachedValue.sanitized }
            return host.preProcessValue(Get(host, 'state.value.value', '')).sanitized
        }
    },
    onConnected: function (host) {
        host.inputID = ID()
    },
    formElement: true
})

Components.addComponent(componentName, InputField)

export { InputField }