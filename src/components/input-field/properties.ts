import pipe from '../../utils/pipe'
import IfNot from '../../utils/convert/if_not'
import IfInvalid from '../../utils/convert/if_invalid'
import CommasToArray from '../../utils/convert/commas-to-array'
import ToNumber from '../../utils/convert/to_number'
import ToBool from '../../utils/convert/bool'
import { ToObject } from '../../utils/convert/object'
import IndexOf from '../../utils/convert/indexof'
import ToArray from '../../utils/convert/to_array'
import ToString from '../../utils/convert/to_string'
import { setInput, setInputID, setInputAttribute, setLabel } from './methods-elements'
import { ValidateHtml } from '../../utils/validate'
import { setColors, setStyles } from './elements'
import { processValue } from './methods-value'
import { setDroppable } from './methods-events'
import { setAttribute } from '../../utils/html/attr'
import replaceElementContents from '../../utils/html/replace-element-contents'
import { labelPositions, resizeOptions } from './definitions'
import ComponentClassObject from '../../utils/html/component-class-object'

const trueOrNull = val => pipe(ToBool, IfNot(true, null))(val).value
const addRemoveContainerClass = (val, host, clss) => host.elements.container.classList[!!val ? `add` : `remove`](clss)
const onChange = () => { }

const inputStates = {
    focused: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `focused`),
    },
    notempty: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, setAttribute(host, `has-value`, `${val}`), `notempty`),
    },
    invalid: {
        format: val => ToBool(val).value,
        onChange: (val, host) => {
            setColors(host, val)
            setAttribute(host.elements.container, `valid`, val)
            addRemoveContainerClass(val, host, `invalid`)
        },
    },
    ready: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `ready`),
    },
    count: {
        format: val => pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (val, host) => replaceElementContents(host.elements.count, val)
    },
}

const inputAttributes = {
    accept: {
        format: val => pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `accept`, val)
    },
    autocomplete: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autocomplete`, val)
    },
    autofocus: {
        format: val => pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autofocus`, val)
    },
    disabled: {
        format: val => pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            setInputAttribute(host, `disabled`, val)
            addRemoveContainerClass(val, host, `disabled`)
        }
    },
    maxlength: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            replaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `maxlength`)
            processValue(host)
        },
    },
    max: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            replaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `max`)
            processValue(host)
        },
    },
    min: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            addRemoveContainerClass(val, host, `min`)
            processValue(host)
        },
    },
    name: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `name`, val),
    },
    pattern: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    placeholder: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
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
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: (val, host) => setInputAttribute(host, `step`, val)
    },
    tabindex: {
        format: val => pipe(ToNumber, IfInvalid(1))(val).value,
        onChange: (val, host) => setInputAttribute(host, `tabIndex`, val)
    },
    type: {
        format: val => pipe(ToArray, IfInvalid(val))(val).value || `text`,
        onChange: (_val, host) => setInput(host),
    },
    value: {
        format: val => val,
        onChange: (_val, host) => processValue(host),
    },
}

const inputFieldProperties = {
    accentcolor: {
        format: val => pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (_val, host) => setColors(host, host.invalid)
    },
    allowhtml: {
        format: val => pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange
    },
    class: ComponentClassObject,
    clearbutton: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            setAttribute(host.elements.clearButton, `type`, val)
            addRemoveContainerClass(!!val, host, `clearbutton`)
        }
    },
    disablefilter: {
        format: val => ToBool(val).value,
        onChange: (val, host) => addRemoveContainerClass(val, host, `disablefilter`)
    },
    disallowhtml: {
        format: val => pipe(CommasToArray, IfInvalid(null))(val).value,
        onChange
    },
    droppable: {
        format: val => ToBool(val).value,
        onChange: (_val, host) => setDroppable(host),
    },

    format: {
        format: val => pipe(ToObject, IfInvalid(pipe(ToString, IfInvalid(null))(val).value))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    helptext: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => replaceElementContents(host.elements.help, ValidateHtml(val, [], [`script`]).sanitized || ``),
    },
    icon: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            setAttribute(host.elements.icon, `type`, val)
            addRemoveContainerClass(val, host, `icon`)
        },
    },
    iconalign: {
        format: (val: any) => typeof val === `string` && (val === `left` || val === `right`) ? val : `left`,
        onChange: (val, host) => setAttribute(host.elements.container, `icon-align`, val),
    },
    inputID: {
        format: val => !!val ? val : ``,
        onChange: (val, host) => setInputID(host, val),
    },

    // Needs to be before the label property otherwise won't be able to find labelContainer in computed
    labelposition: {
        format: val => pipe(IndexOf(labelPositions), IfInvalid(`inside`))(val).value,
        onChange: (val, host) => {
            setAttribute(host.elements.container, `label-position`, val)
            setLabel(host.label, val, host)
        },
    },

    label: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setLabel(val, host.labelposition, host),
    },

    musthave: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
    },

    matchinput: {
        format: val => val,
    },

    processedError: {
        format: val => ValidateHtml(pipe(ToString, IfInvalid(``))(val).value, [], [`script`]).sanitized || ``,
        onChange: (val, host) => !!val ? replaceElementContents(host.elements.error, val) : undefined,
    },

    resize: {
        format: val => pipe(IndexOf(resizeOptions), IfInvalid(`auto`))(val).value,
        onChange: (val, host) => setAttribute(host.elements.container, `resize`, val),
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
        format: val => pipe(ToString, IfInvalid(`#a10005`))(val).value,
        onChange: (_val, host) => setColors(host, host.invalid),
    },
}

export const observedAttributes = Object.keys(inputAttributes)
    .concat(
        Object.keys(inputFieldProperties),
        Object.keys(inputStates)
    )

export const properties = Object.assign(
    {},
    inputAttributes,
    inputFieldProperties,
    inputStates
)