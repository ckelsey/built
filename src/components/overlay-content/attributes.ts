import Convert from '../../utils/convert'

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
    scrim: val => Convert(val).boolean().ifInvalid(false).value,
    target: val => val instanceof HTMLElement ? val : null,
    align: val => Convert(val).indexOf(alignments).ifInvalid(`center`).value,
    from: val => Convert(val).indexOf(alignments).ifInvalid(`center`).value,
    speed: val => Convert(val)
        .number()
        .ifInvalid(333)
        .value,
}
