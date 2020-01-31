import { ObserveEvent } from '../../utils/observe-event.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { ID } from '../../services/id.js'
import { WCDefine } from '../../utils/wc-define.js'
import { Pipe } from '../../utils/pipe.js'
import { ToString } from '../../utils/to-string.js'
import { Get } from '../../utils/get.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
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

const outerStyle = require(`../input-shared/outer.scss`).toString()
const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `input-field`
const componentRoot = `.${componentName}-container`

const preProcessValue = host => value => {
    if (!host.cachedPreProcessValueNeedsUpdate) {
        return host.cachedPreProcessValue
    }

    const validated = valueValidation(value, host.type, host.allowhtml, host.disallowhtml)
    const formatParsed = valueFormat(host.format, validated.sanitized)
    const parsedValue = valueMaxMin(host, formatParsed.value)

    const data = {
        valid: validated.valid && parsedValue.valid && formatParsed.valid,
        reason: [
            !formatParsed.valid ? `Value does not match pattern` : undefined,
            parsedValue.errorText,
        ]
            .concat(validated.reason)
            .filter(m => !!m),
        value: parsedValue.value,
        sanitized: parsedValue.value
    }

    host.cachedPreProcessValue = data

    return data
}

const postProcessValue = host => results => {
    results.input.value = results.sanitized
    host.count = host.type === `number` ? results.sanitized : results.sanitized ? results.sanitized.length : 0
}

const properties = Object.assign({}, Properties, {
    pattern: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => WCWhenPropertyReady(host, `input`).then(input => SetAttribute(input, `pattern`, val))
    },
    cachedPreProcessValueNeedsUpdate: { format: val => Pipe(ToBool, IfInvalid(true))(val).value },
    cachedPreProcessValue: {
        format: val => val,
        onChange: (_val, host) => host.cachedPreProcessValueNeedsUpdate = false
    }
})

const elements = {
    clearButton: {
        selector: `.input-field-clear`,
        /** TODO needs to add back functionality */
    },
    container: { selector: `.input-field-container-inner` },
    count: { selector: `.input-field-character-count` },
    error: { selector: `.input-field-message-error` },
    help: { selector: `.input-field-message-help` },
    icon: {
        selector: `.input-field-icon`,
        onChange: (el, host) => el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => {
                host.dispatchEvent(new CustomEvent(`iconclick`, { detail: host }))
            })
        }
    },
    inputContainer: { selector: `.input-field-input-container-inner` },
    max: { selector: `.input-field-character-count-max` },
    root: { selector: `.input-field-container` }
}

export const InputField = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    properties,
    observedAttributes: Object.keys(properties),
    elements,
    methods: {
        processValue,
        setCustomValidity,
        checkValidity,
        preProcessValue,
        postProcessValue,
    },
    computed: {
        processedValue,
        validationMessage,
        validity
    },
    getters: {
        value: host => {
            if (!host.cacheNeedsUpdate) { return host.cachedValue.sanitized }
            return host.preProcessValue(Get(host, `state.value.value`, ``)).sanitized
        }
    },
    onConnected: host => host.inputID = ID(),
    formElement: true
})

WCDefine(componentName, InputField, `input`)