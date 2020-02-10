import { IsElement } from '../../utils/is-element.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { SetAttribute } from '../../utils/set-attribute.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { IfNot } from '../../utils/if-not.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Get } from '../../utils/get.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToObject } from '../../utils/to-object.js'
import { setInput } from './set-input.js'
import { setInputID } from './set-input-id.js'
import { setLabel } from './set-label.js'
import { IndexOf } from '../../utils/index-of.js'
import { labelPositions, supportedInputTypes } from './definitions.js'
import { getDefaultLabelPosition } from './get-label-position.js'
import { dispatch } from './dispatch.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { onInvalid } from './on-invalid.js'

function trueOrNull(val) {
    return Pipe(ToBool, IfNot(true, null))(val).value
}

function stringOrEmpty(val) {
    return Pipe(ToString, IfInvalid(''))(val).value
}

function addRemoveContainerClass(val, host, clss) {
    return Get(host, 'elements.container.classList', { add: function () { }, remove: function () { } })[val ? 'add' : 'remove'](clss)
}

function setInputAttribute(host, name, value) {
    return WhenAvailable(host, 'input').then(function (input) {
        return SetAttribute(input, name, value)
    })
}

function defaultType(host) {
    const tag = host.tagName.toLowerCase()
    return tag === 'input-bool' ?
        'checkbox' :
        tag === 'input-select' ?
            'select' :
            'text'
}

export const properties = {
    autofocus: {
        format: trueOrNull,
        onChange: function (val, host) { setInputAttribute(host, 'autofocus', val) }
    },

    cacheNeedsUpdate: {
        format: function (val) { return Pipe(ToBool, IfInvalid(true))(val).value }
    },
    cachedValue: {
        format: function (val) { return val },
        onChange: function (_val, host) { host.cacheNeedsUpdate = false }
    },

    disabled: {
        format: trueOrNull,
        onChange: function (val, host) {
            setInputAttribute(host, 'disabled', val)
            addRemoveContainerClass(val, host, 'disabled')
        }
    },

    focused: {
        format: trueOrNull,
        onChange: function (val, host) {
            addRemoveContainerClass(val, host, 'focused')
            host.setAttribute('focused', val ? val : 'false')
            host.processValue()
            dispatch(host, 'focus', host)
        },
    },

    format: {
        format: function (val) {
            return Pipe(ToObject, IfInvalid(Pipe(ToString, IfInvalid(null))(val).value))(val).value
        },
        onChange: function (_val, host) { host.processValue() },
    },

    helptext: {
        format: stringOrEmpty,
        onChange: function (val, host) {
            WhenAvailable(host, 'elements.help').then(function (el) {
                return el.innerHTML = ValidateHtml(val, [], ['script']).sanitized || ''
            })
        }
    },

    inputID: {
        format: stringOrEmpty,
        onChange: function (_val, host) {
            setInputID(host)
        },
    },

    invalid: {
        format: function (val) {
            return ToBool(val).value
        },
        onChange: function (val, host) {
            SetAttribute(host.elements.container, 'valid', val)
            addRemoveContainerClass(val, host, 'invalid')
            WhenAvailable(host, 'elements.error').then(function (el) {
                return el.innerHTML = ValidateHtml(host.validationMessage, [], ['script']).sanitized || ''
            })
            onInvalid(host)
        },
    },

    labelposition: {
        format: function (val, host) {
            return Pipe(IndexOf(labelPositions), IfInvalid(getDefaultLabelPosition(host)))(val).value
        },
        onChange: function (val, host) {
            WhenAvailable(host, 'elements.container').then(function (container) {
                return SetAttribute(container, 'label-position', val)
            })
            WhenAvailable(host, 'labelelement').then(function (label) {
                return label.slot = ''.concat('label-', val, '')
            })
        },
    },

    label: {
        format: stringOrEmpty,
        onChange: function (_val, host) {
            setLabel(host)
        },
    },

    matchinput: {
        format: function (val) {
            return IsElement(val).valid ? val : undefined
        }
    },

    name: {
        format: stringOrEmpty,
        onChange: function (val, host) {
            return setInputAttribute(host, 'name', val)
        },
    },

    notempty: {
        format: function (val) {
            return ToBool(val).value
        },
        onChange: function (val, host) {
            addRemoveContainerClass(val, SetAttribute(host, 'has-value', ''.concat(val)), 'notempty')
        },
    },

    readonly: {
        format: trueOrNull,
        onChange: function (val, host) {
            setInputAttribute(host, 'readonly', val)
        }
    },

    ready: {
        format: trueOrNull,
        onChange: function (val, host) { addRemoveContainerClass(val, host, 'ready') },
    },

    required: {
        format: trueOrNull,
        onChange: function (val, host) {
            setInputAttribute(host, 'required', val)
            setInputAttribute(host, 'aria-required', val)
        },
    },

    tabindex: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(0))(val).value
        },
        onChange: function (val, host) { setInputAttribute(host, 'tabIndex', val) }
    },

    type: {
        format: function (val, host) { return Pipe(IndexOf(supportedInputTypes), IfInvalid(defaultType(host)))(val).value },
        onChange: function (_val, host) {
            setInput(host)
        },
    },

    value: {
        format: function (val, host) { return host.type === 'checkbox' || host.type === 'radio' ? ToBool(val).value : val },
        onChange: function (_val, host) {
            if (!host.eventSubscriptions) { host.eventSubscriptions = {} }

            if (!host.eventSubscriptions.valuecaching) {
                host.eventSubscriptions.valuecaching = host.state.value.subscribe(function () {
                    host.cacheNeedsUpdate = true
                    host.cachedPreProcessValueNeedsUpdate = true
                })
            }

            host.processValue()

            const val = host.value
            dispatch(host, 'inputchange', val)
            dispatch(host, 'input', val)
        },
    }
}

export const observedAttributes = Object.keys(properties)