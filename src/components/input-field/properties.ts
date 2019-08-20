import { Options } from '../../utils/convert/options'
import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToNumber } from '../../utils/convert/number'
import { ToBool } from '../../utils/convert/bool'
import { ToObject } from '../../utils/convert/object'
import { IndexOf, Map, Filter } from '../../utils/convert/array'
import { ToString, Split } from '../../utils/convert/string'
import onChange from './onChange'
import { trueOrNull, stringOrNull, string, numberOrNull, supportedInputTypes, commasOrArrayOrNull, labelPositions, resizeOptions } from './definitions'

export const inputStates = {
    focused: trueOrNull,
    notempty: trueOrNull,
    invalid: trueOrNull,
    ready: trueOrNull,
    containerClasses: val => pipe(ToObject, IfInvalid({}))(val).value,
    count: val => pipe(ToNumber, IfInvalid(0))(val).value,
    hidefilteredout: trueOrNull,
}

export const inputAttributes = {
    autocomplete: stringOrNull,
    autofocus: trueOrNull,
    disabled: trueOrNull,
    emptySelect: val => val !== undefined ? val : `Select...`,
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
    type: val => pipe(IndexOf(supportedInputTypes), IfInvalid(`text`))(val).value,
    value: val => val
}

export const inputFieldProperties = {
    accentcolor: val => pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
    allowhtml: commasOrArrayOrNull,
    class: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
    clearbutton: stringOrNull,
    disablefilter: val => ToBool(val).value,
    disallowhtml: commasOrArrayOrNull,
    errortext: string,
    format: val => pipe(ToObject, IfInvalid(stringOrNull(val)))(val).value,
    helptext: string,
    hideonfilter: val => ToBool(val).value,
    icon: stringOrNull,
    iconalign: (val: any) => typeof val === `string` && (val === `left` || val === `right`) ? val : `left`,
    label: string,
    labelposition: val => pipe(IndexOf(labelPositions), IfInvalid(`inside`))(val).value,
    options: val => pipe(Options, IfInvalid([]))(val).value,
    processedErrorText: val => pipe(ToString, IfInvalid(``))(val).value,
    resize: val => pipe(IndexOf(resizeOptions), IfInvalid(`auto`))(val).value,
    showcount: trueOrNull,
    warningcolor: val => pipe(ToString, IfInvalid(`#a10005`))(val).value,
}

export const observedAttributes = Object.keys(inputAttributes)
    .concat(Object.keys(inputFieldProperties), Object.keys(inputStates))

const propertyFormatter = Object.assign(
    {},
    inputAttributes,
    inputFieldProperties,
    inputStates
)

Object.keys(propertyFormatter).forEach(key => {
    propertyFormatter[key] = {
        format: propertyFormatter[key],
        onChange: onChange[key] ? onChange[key] : () => { }
    }
})

export const properties = propertyFormatter