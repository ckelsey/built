import { Observer } from './observer.js'
import { ObserveExists } from './observe-exists.js'
import { ObserverReturnEmpty } from './observer-empty.js'
import { ArrayFrom } from './array-from.js'

export function ObserveSlots(element, mustHaveSlotAttribute) {
    if (!mustHaveSlotAttribute) { mustHaveSlotAttribute = false }

    if (!element) { return ObserverReturnEmpty() }

    const observer = Observer()
    const exists = ObserveExists(element)
        .subscribe(function ObserveExistsSub(exists) {
            return exists ? undefined : dispose()
        })

    function newSlots(added, removed) {
        added = added ? added : []
        removed = removed ? removed : []

        return added.length || removed.length ? observer.next({ added: added, removed: removed }) : undefined
    }

    const slotObserver = new MutationObserver(
        function slotObserverMutationObs(mutationsList) {
            const added = []
            const removed = []
            const list = ArrayFrom(mutationsList)
            let len = list.length

            function addToArray(el, arrToAddTo) {
                if ((mustHaveSlotAttribute && el.getAttribute('slot')) || !mustHaveSlotAttribute) {
                    arrToAddTo.push(el)
                }
            }

            while (len--) {
                if (list[len].type === 'childList' && (list[len].addedNodes.length || list[len].removedNodes.length)) {
                    list[len].addedNodes.forEach(function addedEach(el) { addToArray(el, added) })
                    list[len].removedNodes.forEach(function removedEach(el) { addToArray(el, removed) })
                }
            }

            newSlots(added, removed)
        }
    )

    function dispose() {
        try { exists() } catch (error) { }
        observer.complete()
        slotObserver.disconnect()
    }

    slotObserver.observe(element, { childList: true })

    return observer
}