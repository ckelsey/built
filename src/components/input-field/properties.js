import {
    IndexOf, CommasToArray, IfNot, ComponentClassObject, Pipe, IfInvalid,
    ToNumber, ToBool, ToObject, ToArray, ToString, ValidateHtml,
    ReplaceElementContents, SetAttribute
} from '../..'
import { setInput, setInputID, setInputAttribute, setLabel } from './methods-elements'
import { setColors, setStyles } from './elements'
import { processValue } from './methods-value'
import { setDroppable } from './methods-events'
import { labelPositions, resizeOptions } from './definitions'

const trueOrNull = val => Pipe(ToBool, IfNot(true, null))(val).value
const addRemoveContainerClass = (val, host, clss) => host.elements.container.classList[val ? `add` : `remove`](clss)
const onChange = () => { }

const inputStates = {
    focused: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `focused`),
    },
    notempty: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, SetAttribute(host, `has-value`, `${val}`), `notempty`),
    },
    invalid: {
        format: val => ToBool(val).value,
        onChange: (val, host) => {
            setColors(host, val)
            SetAttribute(host.elements.container, `valid`, val)
            addRemoveContainerClass(val, host, `invalid`)
        },
    },
    ready: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `ready`),
    },
    count: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (val, host) => ReplaceElementContents(host.elements.count, val)
    },
}

const inputAttributes = {
    accept: {
        format: val => Pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `accept`, val)
    },
    autocomplete: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autocomplete`, val)
    },
    autofocus: {
        format: val => Pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autofocus`, val)
    },
    disabled: {
        format: val => Pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            setInputAttribute(host, `disabled`, val)
            addRemoveContainerClass(val, host, `disabled`)
        }
    },
    maxlength: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            ReplaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `maxlength`)
            processValue(host)
        },
    },
    max: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            ReplaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `max`)
            processValue(host)
        },
    },
    min: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            addRemoveContainerClass(val, host, `min`)
            processValue(host)
        },
    },
    name: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `name`, val),
    },
    pattern: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    placeholder: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `placeholder`, val)
    },
    readonly: {
        format: trueOrNull,
        onChange: (val, host) => setInputAttribute(host, `readonly`, val)
    },
    required: {
        format: trueOrNull,
        onChange: (val, host) => setInputAttribute(host, `required`, val),
    },
    step: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `step`, val)
    },
    tabindex: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (val, host) => setInputAttribute(host, `tabIndex`, val)
    },
    type: {
        format: val => Pipe(ToArray, IfInvalid(val))(val).value || `text`,
        onChange: (_val, host) => setInput(host),
    },
    value: {
        format: val => val,
        onChange: (_val, host) => processValue(host),
    },
}

const inputFieldProperties = {
    accentcolor: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (_val, host) => setColors(host, host.invalid)
    },
    allowhtml: {
        format: val => Pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange
    },
    class: ComponentClassObject,
    clearbutton: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            SetAttribute(host.elements.clearButton, `type`, val)
            addRemoveContainerClass(!!val, host, `clearbutton`)
        }
    },
    disablefilter: {
        format: val => ToBool(val).value,
        onChange: (val, host) => addRemoveContainerClass(val, host, `disablefilter`)
    },
    disallowhtml: {
        format: val => Pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange
    },
    droppable: {
        format: val => ToBool(val).value,
        onChange: (_val, host) => setDroppable(host),
    },

    format: {
        format: val => Pipe(ToObject, IfInvalid(Pipe(ToString, IfInvalid(null))(val).value))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    helptext: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => ReplaceElementContents(host.elements.help, ValidateHtml(val, [], [`script`]).sanitized || ``),
    },
    icon: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            if (val) {
                SetAttribute(host.elements.icon, val.slice(0, 5) === `<svg ` ? `svg` : `type`, val)
            }
            addRemoveContainerClass(val, host, `icon`)
        },
    },
    iconalign: {
        format: val => typeof val === `string` && (val === `left` || val === `right`) ? val : `left`,
        onChange: (val, host) => SetAttribute(host.elements.container, `icon-align`, val),
    },
    inputID: {
        format: val => val ? val : ``,
        onChange: (val, host) => setInputID(host, val),
    },

    // Needs to be before the label property otherwise won't be able to find labelContainer in computed
    labelposition: {
        format: val => Pipe(IndexOf(labelPositions), IfInvalid(`inside`))(val).value,
        onChange: (val, host) => {
            SetAttribute(host.elements.container, `label-position`, val)
            setLabel(host.label, val, host)
        },
    },

    label: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setLabel(val, host.labelposition, host),
    },

    musthave: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
    },

    matchinput: {
        format: val => val,
    },

    processedError: {
        format: val => ValidateHtml(Pipe(ToString, IfInvalid(``))(val).value, [], [`script`]).sanitized || ``,
        onChange: (val, host) => val ? ReplaceElementContents(host.elements.error, val) : undefined,
    },

    resize: {
        format: val => Pipe(IndexOf(resizeOptions), IfInvalid(`auto`))(val).value,
        onChange: (val, host) => SetAttribute(host.elements.container, `resize`, val),
    },

    showcount: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `showcount`),
    },

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },

    theme: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    },

    warningcolor: {
        format: val => Pipe(ToString, IfInvalid(`#a10005`))(val).value,
        onChange: (_val, host) => setColors(host, host.invalid),
    },
}

export const observedAttributes = Object.keys(inputAttributes)
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    .concat(
        Object.keys(inputFieldProperties),
        Object.keys(inputStates)
    )

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
export const properties = Object.assign(
    {},
    inputAttributes,
    inputFieldProperties,
    inputStates
)