import pipe from '../../utils/pipe'
import { CommasToArray } from '../../utils/convert/commas-to-array'
import { IfInvalid, IfNot } from '../../utils/convert/if'
import { ToNumber } from '../../utils/convert/number'
import { ToBool } from '../../utils/convert/bool'
import { ToString } from '../../utils/convert/string'

export const commasOrArrayOrNull = val => pipe(CommasToArray, IfInvalid(null))(val).value
export const numberOrNull = val => pipe(ToNumber, IfInvalid(null))(val).value
export const trueOrNull = val => pipe(ToBool, IfNot(true, null))(val).value
export const stringOrNull = val => pipe(ToString, IfInvalid(null))(val).value
export const string = val => pipe(ToString, IfInvalid(``))(val).value
export const labelPositions = [`top`, `bottom`, `left`, `right`, `inside`]
export const resizeOptions = [`true`, `false`, `horizontal`, `vertical`, `auto`]
export const inputFieldInputTypes = [`input`, `select`, `textarea`, `checkbox`, `radio`, `password`]

export const boolInputTypes = [`checkbox`, `radio`]
export const numberInputTypes = [`number`]
export const typesWithOptions = [`select`, `rotary`]
export const typesWithOverlay = [`select`, `datetime`]

export const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" style="stroke:currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`

export const containerClasses = [
    `focused`,
    `notempty`,
    `invalid`,
    `ready`,
    `disabled`,
    `showcount`,
    `icon`,
    `clearbutton`,
    `hidefilteredout`
]

export const InputFieldInputAttributes = {
    all: [
        `autocomplete`, `autofocus`, `disabled`, `maxlength`, `name`,
        `pattern`, `placeholder`, `readonly`, `required`, `tabindex`,
        `value`
    ],
    bool: [`disabled`, `name`, `readonly`, `required`, `tabindex`, `value`]
}

export const supportedInputTypes = [
    `number`,
    `textarea`,
    `text`,
    `url`,
    `email`,
    `password`,
    `tel`,
    `radio`,
    `checkbox`,
    `select`,
    `rotary`,
    `datetime`,
    `date`,
    `time`,
    `usphone`,
    `uszip`,
]

export const processedNullValue = () => ({
    original: ``,
    sanitized: ``,
    valid: true,
    reason: []
})