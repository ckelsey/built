import { Options } from '../../utils/convert/options'
import pipe from '../../utils/pipe'
import { IfInvalid, IfNot } from '../../utils/convert/if'
import { CommasToArray } from '../../utils/convert/commas-to-array'
import { ToNumber } from '../../utils/convert/number'
import { ToBool } from '../../utils/convert/bool'
import { ToObject } from '../../utils/convert/object'
import { IndexOf, ToArray } from '../../utils/convert/array'
import { ToString } from '../../utils/convert/string'
import { setInput, setInputID, setInputAttribute, setLabel } from './methods-elements'
import { ValidateHtml } from '../../utils/validate'
import { setColors, setOptions, setStyles, setSelectProperties } from './elements'
import { processValue } from './methods-value'
import { setDroppable } from './methods-events'
import { setAttribute, wcClassObject } from '../../utils/html/attr'
import { replaceElementContents } from '../../utils/html/markup'
import { labelPositions, resizeOptions } from './definitions'
import { INPUTFIELD } from './theme'

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
            setColors(host)
            setAttribute(host.elements.container, `valid`, val)
            addRemoveContainerClass(val, host, `invalid`)
        },
    },
    ready: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `ready`),
    },
    count: {
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.count))(val).value,
        onChange: (val, host) => replaceElementContents(host.elements.count, val)
    },
}

const inputAttributes = {
    accept: {
        format: val => pipe(CommasToArray, IfInvalid(INPUTFIELD.accept))(val).value,
        onChange: (val, host) => setInputAttribute(host, `accept`, val)
    },
    autocomplete: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.autocomplete))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autocomplete`, val)
    },
    autofocus: {
        format: val => pipe(ToBool, IfNot(true, INPUTFIELD.autofocus))(val).value,
        onChange: (val, host) => setInputAttribute(host, `autofocus`, val)
    },
    disabled: {
        format: val => pipe(ToBool, IfNot(true, INPUTFIELD.disabled))(val).value,
        onChange: (val, host) => {
            setInputAttribute(host, `disabled`, val)
            addRemoveContainerClass(val, host, `disabled`)
        }
    },
    emptyoption: {
        format: val => val !== undefined ? val : INPUTFIELD.emptyoption,
        onChange: (_val, host) => {
            setSelectProperties(host)
        }
    },
    maxlength: {
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.maxlength))(val).value,
        onChange: (val, host) => {
            replaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `maxlength`)
            processValue(host)
        },
    },
    max: {
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.max))(val).value,
        onChange: (val, host) => {
            replaceElementContents(host.elements.max, val || ``)
            addRemoveContainerClass(val, host, `max`)
            processValue(host)
        },
    },
    min: {
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.min))(val).value,
        onChange: (val, host) => {
            addRemoveContainerClass(val, host, `min`)
            processValue(host)
        },
    },
    multiple: {
        format: val => ToBool(val).value,
        onChange: (val, host) => setInputAttribute(host, `multiple`, val),
    },
    name: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.name))(val).value,
        onChange: (val, host) => setInputAttribute(host, `name`, val),
    },
    pattern: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.pattern))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    placeholder: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.placeholder))(val).value,
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
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.step))(val).value,
        onChange: (val, host) => setInputAttribute(host, `step`, val)
    },
    tabindex: {
        format: val => pipe(ToNumber, IfInvalid(INPUTFIELD.tabindex))(val).value,
        onChange: (val, host) => setInputAttribute(host, `tabIndex`, val)
    },
    type: {
        format: val => pipe(ToArray, IfInvalid(val))(val).value || INPUTFIELD.type,
        onChange: (_val, host) => setInput(host),
    },
    value: {
        format: val => val,
        onChange: (val, host) => {

            if (host.type === `select`) {
                host.elements.input.value = val
            }

            processValue(host)
        },
    },
}

const inputFieldProperties = {
    accentcolor: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.accentcolor))(val).value,
        onChange: (_val, host) => setColors(host)
    },
    allowhtml: {
        format: val => pipe(CommasToArray, IfInvalid(INPUTFIELD.allowhtml))(val).value,
        onChange
    },
    class: wcClassObject,
    clearbutton: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.clearbutton))(val).value,
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
        format: val => pipe(CommasToArray, IfInvalid(INPUTFIELD.disallowhtml))(val).value,
        onChange
    },
    droppable: {
        format: val => ToBool(val).value,
        onChange: (_val, host) => setDroppable(host),
    },
    errortext: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.errortext))(val).value,
        onChange: (val, host) => replaceElementContents(host.elements.error, ValidateHtml(val, [], [`script`]).sanitized || ``),
    },
    format: {
        format: val => pipe(ToObject, IfInvalid(pipe(ToString, IfInvalid(INPUTFIELD.format))(val).value))(val).value,
        onChange: (_val, host) => processValue(host),
    },
    helptext: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.helptext))(val).value,
        onChange: (val, host) => replaceElementContents(host.elements.help, ValidateHtml(val, [], [`script`]).sanitized || ``),
    },
    hideonfilter: {
        format: val => ToBool(val).value,
        onChange: (val, host) => addRemoveContainerClass(val, host, `hidefilteredout`),
    },
    icon: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.icon))(val).value,
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
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.label))(val).value,
        onChange: (val, host) => setLabel(val, host.labelposition, host),
    },

    options: {
        format: val => pipe(Options, IfInvalid([]))(val).value,
        onChange: (val, host) => setOptions(host.elements.input, val),
    },
    processedErrorText: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => !!val ? replaceElementContents(host.elements.error, val) : undefined,
    },

    resize: {
        format: val => pipe(IndexOf(resizeOptions), IfInvalid(INPUTFIELD.resize))(val).value,
        onChange: (val, host) => setAttribute(host.elements.container, `resize`, val),
    },
    showcount: {
        format: trueOrNull,
        onChange: (val, host) => addRemoveContainerClass(val, host, `showcount`),
    },
    styles: {
        format: val => typeof val === `string` ? val : INPUTFIELD.styles,
        onChange: (val, host) => {
            setStyles(host.elements.injectedStyles, val)
            setSelectProperties(host)
        }
    },
    warningcolor: {
        format: val => pipe(ToString, IfInvalid(INPUTFIELD.warningcolor))(val).value,
        onChange: (_val, host) => setColors(host),
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