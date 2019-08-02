import Convert from '../../utils/convert'
import { eventNames } from '../../utils/html'

const directions = [
    `auto`,
    `to left`,
    `to right`,
    `from center`
]

export const UnderlineObservedAttributes = {
    color: val =>
        Convert(val)
            .string()
            .ifInvalid(`#59a2d8`)
            .ifEmpty(`#59a2d8`)
            .value,
    direction: val => {
        val = Convert(val)
            .string()
            .value

        return directions.indexOf(val) === -1 ? directions[0] : val
    },
    end: val =>
        Convert(val)
            .indexOf(eventNames)
            .ifInvalid(`mouseup`)
            .value,
    opacity: val =>
        Math.min(1, Math.max(0,
            Convert(val)
                .number()
                .ifInvalid(0.2)
                .value
        )),
    speed: val =>
        Convert(val)
            .number()
            .ifInvalid(333)
            .value,
    start: val =>
        Convert(val)
            .indexOf(eventNames)
            .ifInvalid(`mousedown`)
            .value,
    targets: val =>
        Convert(val)
            .array()
            .ifInvalid(
                Convert(val)
                    .ifEmpty(null)
                    .ifNot(null, [val])
                    .value
            )
            .value
}

export const UnderlineOperations = {
    color: (that, val) => that.$underline.style.backgroundColor = `${val}`,
    end: () => { },
    opacity: (that, val) => that.$underline.style.opacity = `${val}`,
    speed: (that, val) => that.$underline.style.transition = `opacity ${val}ms ease-in-out, transform ${val * 1.3}ms ease-in-out`,
    start: () => { },
    targets: that => {
        that.unloadTargets()
        that.loadTargets()
    }
}
