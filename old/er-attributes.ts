import { eventNames } from '../src/utils/html'
import pipe from '../src/utils/pipe'
import { ToString } from '../src/utils/convert/string'
import { IfInvalid, IfEmpty } from '../src/utils/convert/if'
import { IndexOf, ToArray } from '../src/utils/convert/array'
import { ToNumber } from '../src/utils/convert/number'

export const RippleObservedAttributes = {
    color: val => pipe(ToString, IfInvalid(`#59a2d8`), IfEmpty(`#59a2d8`))(val).value,
    end: val => pipe(IndexOf(eventNames), IfInvalid(null))(val).value,
    opacity: val => Math.min(1, Math.max(0, pipe(ToNumber, IfInvalid(0.2))(val).value)),
    speed: val => pipe(ToNumber, IfInvalid(333))(val).value,
    start: val => pipe(IndexOf(eventNames), IfInvalid(`mousedown`))(val).value,
    targets: val => pipe(
        ToArray,
        IfInvalid(
            pipe(
                IfEmpty([])
            )([val])
        )
    )(val).value,
    class: val => val
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
    },
    class: (that, val) => {
        const newClasses = !!val && typeof val === `string` ? val.split(` `).map(c => c.trim()) : []
        const clss = that.$container.className.split(` `).map(c => c.trim())
        const prev = !!that.state.class.previous && typeof that.state.class.previous === `string` ? that.state.class.previous.split(` `).map(c => c.trim()) : []

        prev.forEach(c => {
            const indexInClss = clss.indexOf(c)
            if (newClasses.indexOf(c) === -1 && indexInClss > -1) {
                clss.splice(indexInClss, 1)
            }
        })

        newClasses.forEach(c => {
            if (clss.indexOf(c) === -1) {
                clss.push(c)
            }
        })

        that.$container.className = clss.map(c => c.trim()).filter(c => !!c).join(` `)
    }
}
