import Convert from '../../utils/convert'
import { inputTypes } from '../../utils/html'
import { Options } from '../../utils/convert/options'

const commasOrArrayOrNull = (val: any) => Convert(val)
    .plainText()
    .jsonParse()
    .commasToArray()
    .array()
    .ifInvalid(null)
    .value

const numberOrNull = (val: any) => Convert(val)
    .number()
    .ifInvalid(null)
    .value

const trueOrNull = (val: any) => Convert(val)
    .boolean()
    .ifNot(true, null)
    .value

const stringOrNull = (val: any) => typeof val === `string` ? val : null

const labelPositions = [`top`, `bottom`, `left`, `right`, `inside`]

const resizeOptions = [`true`, `false`, `horizontal`, `vertical`, `auto`]

const inputFieldInputTypes = [`input`, `select`, `textarea`, `checkbox`, `radio`, `password`]

export const containerClasses = [
    `focused`,
    `notempty`,
    `invalid`,
    `ready`,
    `disabled`,
    `showcount`,
    `icon`,
    `clearbutton`,
]

export const inputStates = {
    focused: trueOrNull,
    notempty: trueOrNull,
    invalid: trueOrNull,
    ready: trueOrNull,
    processedValue: (val) => val,
    inputType: (val) => inputFieldInputTypes.indexOf(val) > -1 ? val : inputFieldInputTypes[0],
    containerClasses: (val) => Convert(val).object().ifInvalid({}).value,
    count: (val) => Convert(val)
        .number()
        .ifInvalid(0)
        .value
}

export const inputAttributes = {
    autocomplete: stringOrNull,
    autofocus: trueOrNull,
    disabled: trueOrNull,
    emptySelect: (val) => val !== undefined ? val : `Select...`,
    maxlength: numberOrNull,
    max: numberOrNull,
    min: numberOrNull,
    multiple: trueOrNull,
    name: stringOrNull,
    pattern: stringOrNull,
    placeholder: stringOrNull,
    readonly: trueOrNull,
    required: trueOrNull,
    step: numberOrNull,
    tabindex: numberOrNull,
    type: (val: any) => Convert(val).indexOf(inputTypes.concat([`rotary`])).ifInvalid(`text`).value,
    value: (val: any) => val
}

export const inputFieldProperties = {
    allowhtml: commasOrArrayOrNull,
    disallowhtml: commasOrArrayOrNull,
    errortext: stringOrNull,
    format: stringOrNull,
    helptext: stringOrNull,
    icon: stringOrNull,
    iconalign: (val: any) => typeof val === `string` && (val === `left` || val === `right`) ? val : `left`,
    label: stringOrNull,
    labelposition: (val: any) => Convert(val).indexOf(labelPositions).ifInvalid(`inside`).value,
    options: (val, that) => {
        const res = Options(val)
        return res.valid ? res.value : !!that.options && that.options.length ? that.options : []
    },
    clearbutton: stringOrNull,
    showcount: trueOrNull,
    resize: (val: any) => Convert(val).indexOf(resizeOptions).ifInvalid(`auto`).value,
}

export const observedAttributes = Object.assign(
    { class: val => val },
    inputAttributes,
    inputFieldProperties
)

export const AllProperties = Object.assign(
    {},
    observedAttributes,
    inputStates
)
