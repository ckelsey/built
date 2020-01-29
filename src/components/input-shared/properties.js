import { IsElement } from '../../utils/is-element.js'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready.js'
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

const trueOrNull = val => Pipe(ToBool, IfNot(true, null))(val).value
const stringOrEmpty = val => Pipe(ToString, IfInvalid(``))(val).value
const addRemoveContainerClass = (val, host, clss) => Get(host, `elements.container.classList`, { add: () => { }, remove: () => { } })[val ? `add` : `remove`](clss)
const setInputAttribute = (host, name, value) => WCwhenPropertyReady(host, `input`).then(input => SetAttribute(input, name, value))
const defaultType = host => {
    const tag = host.tagName.toLowerCase()
    return tag === `input-bool` ?
        `checkbox` :
        tag === `input-select` ?
            `select` :
            `text`
}

export const properties = {
    autofocus: {
        format: trueOrNull,
        onChange: (val, host) => setInputAttribute(host, `autofocus`, val)
    },

    disabled: {
        format: trueOrNull,
        onChange: (val, host) => {
            setInputAttribute(host, `disabled`, val)
            addRemoveContainerClass(val, host, `disabled`)
        }
    },

    focused: {
        format: trueOrNull,
        onChange: (val, host) => {
            addRemoveContainerClass(val, host, `focused`)
            host.setAttribute(`focused`, val ? val : `false`)
            host.processValue()
            dispatch(host, `focus`, host)
        },
    },

    format: {
        format: val => Pipe(ToObject, IfInvalid(Pipe(ToString, IfInvalid(null))(val).value))(val).value,
        onChange: (_val, host) => host.processValue(),
    },

    helptext: {
        format: stringOrEmpty,
        onChange: (val, host) => WCwhenPropertyReady(host, `elements.help`).then(el => el.innerHTML = ValidateHtml(val, [], [`script`]).sanitized || ``)
    },

    inputID: {
        format: stringOrEmpty,
        onChange: (_val, host) => setInputID(host),
    },

    invalid: {
        format: val => ToBool(val).value,
        onChange: (val, host) => {
            SetAttribute(host.elements.container, `valid`, val)
            addRemoveContainerClass(val, host, `invalid`)
            WCwhenPropertyReady(host, `elements.error`).then(el => el.innerHTML = ValidateHtml(host.validationMessage, [], [`script`]).sanitized || ``)
            onInvalid(host)
        },
    },

    labelposition: {
        format: (val, host) => Pipe(IndexOf(labelPositions), IfInvalid(getDefaultLabelPosition(host)))(val).value,
        onChange: (val, host) => {
            WCwhenPropertyReady(host, `elements.container`).then(container => SetAttribute(container, `label-position`, val))
            WCwhenPropertyReady(host, `labelelement`).then(label => label.slot = `label-${val}`)
        },
    },

    label: {
        format: stringOrEmpty,
        onChange: (_val, host) => setLabel(host),
    },

    matchinput: { format: val => IsElement(val) ? val : undefined },

    name: {
        format: stringOrEmpty,
        onChange: (val, host) => setInputAttribute(host, `name`, val),
    },

    notempty: {
        format: val => ToBool(val).value,
        onChange: (val, host) => addRemoveContainerClass(val, SetAttribute(host, `has-value`, `${val}`), `notempty`),
    },

    readonly: {
        format: trueOrNull,
        onChange: (val, host) => setInputAttribute(host, `readonly`, val)
    },

    ready: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `ready`),
    },

    required: {
        format: trueOrNull,
        onChange: (val, host) => {
            setInputAttribute(host, `required`, val)
            setInputAttribute(host, `aria-required`, val)
        },
    },

    tabindex: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (val, host) => setInputAttribute(host, `tabIndex`, val)
    },

    type: {
        format: (val, host) => Pipe(IndexOf(supportedInputTypes), IfInvalid(defaultType(host)))(val).value,
        onChange: (_val, host) => setInput(host),
    },

    value: {
        format: (val, host) => {
            if (host.type === `checkbox` || host.type === `radio`) { return ToBool(val).value }
            return val
        },
        onChange: (_val, host) => {
            host.processValue()
            dispatch(host, `inputchange`, host.value)
            dispatch(host, `input`, host.value)
        },
    },

    // clearbutton: {
    //     format: val => Pipe(ToString, IfInvalid(null))(val).value,
    //     onChange: (val, host) => {
    //         SetAttribute(host.elements.clearButton, `type`, val)
    //         addRemoveContainerClass(!!val, host, `clearbutton`)
    //     }
    // },
}

export const observedAttributes = Object.keys(properties)