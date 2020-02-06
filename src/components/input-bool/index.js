import { WCConstructor } from '../../utils/wc-constructor.js'
import { ID } from '../../services/id.js'
import { WCDefine } from '../../utils/wc-define.js'
import { Get } from '../../utils/get.js'
import { observedAttributes, properties } from '../input-shared/properties.js'
import { processedValue } from '../input-shared/processed-value.js'
import { processValue } from '../input-shared/process-value.js'
import { setCustomValidity } from '../input-shared/set-custom-validity.js'
import { validationMessage } from '../input-shared/validation-message.js'
import { ValidateBool } from '../../utils/validate-bool.js'
import { validity } from '../input-shared/validity.js'
import { checkValidity } from '../input-shared/check-validity.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'

const outerStyle = require('../input-shared/outer.scss').toString()
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'input-bool'
const componentRoot = ''.concat('.', componentName, '-container')
const elements = {
    checkIcon: {
        selector: '.input-field-checkbox-icon',
        onChange: function (el) {
            el.svg = '<svg xmlns="http://www.w3.org/2000/svg" style="stroke:currentColor;stroke-width:2px;" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
        }
    },
    container: { selector: '.input-field-container-inner' },
    count: { selector: '.input-field-character-count' },
    error: { selector: '.input-field-message-error' },
    help: { selector: '.input-field-message-help' },
    inputContainer: { selector: '.input-field-input-container-inner' },
    root: { selector: '.input-field-container' },
}

export const InputBool = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
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
                    WCWhenPropertyReady(host, 'elements.container').then(function (container) { return container.classList[results.sanitized ? 'add' : 'remove']('checked') }),
                    WCWhenPropertyReady(host, 'input').then(function (input) { return input.checked = results.sanitized })
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

WCDefine(componentName, InputBool)