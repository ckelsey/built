import { eventNames } from '../../utils/html'
import pipe from '../../utils/pipe'
import { ToString } from '../../utils/convert/string'
import { IfInvalid, IfEmpty } from '../../utils/convert/if'
import { IndexOf, ToArray } from '../../utils/convert/array'
import { ToNumber } from '../../utils/convert/number'

const directions = [
    `auto`,
    `to left`,
    `to right`,
    `from center`
]

export const UnderlineObservedAttributes = {
    color: val => pipe(ToString, IfInvalid(`#59a2d8`), IfEmpty(`#59a2d8`))(val).value,
    end: val => pipe(IndexOf(eventNames), IfInvalid(`mouseup`))(val).value,
    opacity: val => Math.min(1, Math.max(0, pipe(ToNumber, IfInvalid(0.2))(val).value)),
    direction: val => pipe(ToString, IndexOf(directions), IfInvalid(directions[0]))(val).value,
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

export const UnderlineOperations = {
    color: (that, val) => that.$underline.style.backgroundColor = `${val}`,
    end: () => { },
    opacity: (that, val) => that.$underline.style.opacity = `${val}`,
    speed: (that, val) => that.$underline.style.transition = `opacity ${val}ms ease-in-out, transform ${val * 1.3}ms ease-in-out`,
    start: () => { },
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
