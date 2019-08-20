import pipe from '../../utils/pipe'
import { ToBool } from '../../utils/convert/bool'
import { IfInvalid } from '../../utils/convert/if'
import { IndexOf } from '../../utils/convert/array'
import { ToNumber } from '../../utils/convert/number'

const alignments = [
    `center`,
    `left`,
    `right`,
    `top`,
    `bottom`,
    `center center`,
    `center top`,
    `center bottom`,
    `left center`,
    `left top`,
    `left bottom`,
    `right center`,
    `right top`,
    `right bottom`,
]

export const OverlayContentObservedAttributes = {
    scrim: val => pipe(ToBool, IfInvalid(false))(val).value,
    target: val => val instanceof HTMLElement ? val : null,
    align: val => pipe(IndexOf(alignments), IfInvalid(`center`))(val).value,
    from: val => pipe(IndexOf(alignments), IfInvalid(`center`))(val).value,
    speed: val => pipe(ToNumber, IfInvalid(333))(val).value,
    class: val => val
}
