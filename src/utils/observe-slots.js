import { Observer, ObserveExists } from '..'

export function ObserveSlots(element, mustHaveSlotAttribute = false) {
    if (!element) { return }

    const observer = Observer()
    const exists = ObserveExists(element).subscribe(exists => exists ? undefined : dispose())
    const newSlots = (added = [], removed = []) => added.length || removed.length ? observer.next({ added, removed }) : undefined
    const slotObserver = new MutationObserver(mutationsList => {
        const added = []
        const removed = []
        const list = Array.from(mutationsList)
        let len = list.length

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

    slotObserver.observe(element, { childList: true })

    return observer
}