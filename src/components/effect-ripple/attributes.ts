import Convert from '../../utils/convert'
import { eventNames } from '../../utils/html'

export const RippleObservedAttributes = {
    color: val => Convert(val)
        .string()
        .ifInvalid(`#59a2d8`)
        .ifEmpty(`#59a2d8`)
        .value,
    end: val => Convert(val)
        .indexOf(eventNames)
        .ifInvalid(`mouseup`)
        .value,
    opacity: val => Math.min(1, Math.max(0,
        Convert(val)
            .number()
            .ifInvalid(0.2)
            .value
    )),
    speed: val => Convert(val)
        .number()
        .ifInvalid(333)
        .value,
    start: val => Convert(val)
        .indexOf(eventNames)
        .ifInvalid(`mousedown`)
        .value,
    targets: val => Convert(val)
        .array()
        .ifInvalid(
            Convert(val)
                .ifEmpty(null)
                .ifNot(null, [val])
                .value
        )
        .value
}

export const RippleOperations = {
    color: (that, val) => that.$rippleInner.style.backgroundColor = `${val}`,
    end: (that) => {
        that.unloadTargets()
        that.loadTargets()
    },
    opacity: (that, val) => that.$rippleInner.style.opacity = `${val}`,
    speed: (that, val) => {
        that.$ripple.style.transition = `opacity ${val}ms ease-in-out`
        that.$rippleInner.style.transition = `transform ${val * 1.3}ms ease-in-out, opacity ${val * 0.7}ms ease-in-out`
    },
    start: (that) => {
        that.unloadTargets()
        that.loadTargets()
    },
    targets: that => {
        that.unloadTargets()
        that.loadTargets()
    }
}
