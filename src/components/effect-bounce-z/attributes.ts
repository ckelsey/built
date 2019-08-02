import Convert from '../../utils/convert'
import { eventNames } from '../../utils/html'

export const BounceZObservedAttributes = {
    end: val => Convert(val)
        .indexOf(eventNames)
        .ifInvalid(null)
        .value,
    amount: val => Convert(val)
        .number()
        .ifInvalid(0)
        .value,
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

export const BounceZOperations = {
    end: (that) => {
        that.unloadTargets()
        that.loadTargets()
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
