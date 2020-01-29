import { Observer, ObserveExists } from '..'
import { OnNextFrame } from '../services/on-next-frame'

export function ObserveSlots(element, mustHaveSlotAttribute = false, propsToWatch) {
    const returnEmpty = () => {
        const _observer = Observer(false)
        OnNextFrame(() => {
            _observer.next(false)
            _observer.complete()
        })

        return _observer
    }

    if (!element) { return returnEmpty() }

    const observer = Observer()
    const exists = ObserveExists(element).subscribe(exists => exists ? undefined : dispose())
    const newSlots = (added = [], removed = []) => added.length || removed.length ? observer.next({ added, removed }) : undefined
    const slotObserver = new MutationObserver(mutationsList => {
        const added = []
        const removed = []
        const props = {}
        const list = Array.from(mutationsList)
        let len = list.length

        propsToWatch.forEach(prop => props[prop] = [])

        while (len--) {
            if (list[len].type === `childList` && (list[len].addedNodes.length || list[len].removedNodes.length)) {
                if (mustHaveSlotAttribute) {
                    list[len].addedNodes.forEach(a => a.getAttribute(`slot`) ? added.push(a) : undefined)
                    list[len].removedNodes.forEach(r => r.getAttribute(`slot`) ? removed.push(r) : undefined)
                } else {
                    list[len].addedNodes.forEach(a => added.push(a))
                    list[len].removedNodes.forEach(r => removed.push(r))
                }
            }
        }

        newSlots(added, removed)
    })

    const dispose = () => {
        try { exists } catch (error) { }
        observer.complete()
        slotObserver.disconnect()
    }

    slotObserver.observe(element, Object.assign({ childList: true }, propsToWatch))

    return observer
}