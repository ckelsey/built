import { eventNames } from '../src/utils/html'
import pipe from '../src/utils/pipe'
import { IndexOf, ToArray } from '../src/utils/convert/array'
import { IfInvalid, IfEmpty } from '../src/utils/convert/if'
import { ToNumber } from '../src/utils/convert/number'

export const BounceZObservedAttributes = {
    end: val => pipe(IndexOf(eventNames), IfInvalid(null))(val).value,
    amount: val => pipe(ToNumber, IfInvalid(0))(val).value,
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
