import { Observer } from '..'

export function ObserveSlots(element, mustHaveSlotAttribute) {
    if (!element) { return }

    let mObserver = { disconnect: () => { } }
    let slotObserver = { disconnect: () => { } }
    const observer = Observer()

    const dispose = () => {
        observer.complete()
        mObserver.disconnect()
        slotObserver.disconnect()
    }

    const newSlots = (added, removed) => {
        observer.next({ added, removed })
    }

    slotObserver = new MutationObserver(mutationsList => {
        const list = Array.from(mutationsList)

        while (list.length) {
            const mutation = list.shift()
            if (mutation.type === `childList` && (mutation.addedNodes.length || mutation.removedNodes.length)) {
                if (mustHaveSlotAttribute) {
                    const added = []
                    const removed = []

                    mutation.addedNodes.forEach(a => a.getAttribute(`slot`) ? added.push(a) : undefined)
                    mutation.removedNodes.forEach(r => r.getAttribute(`slot`) ? removed.push(r) : undefined)

                    if (added.length || removed.length) {
                        newSlots(added, removed)
                    }
                } else {
                    return newSlots(mutation.addedNodes, mutation.removedNodes)
                }
            }
        }
    })

    mObserver = new MutationObserver(e => {
        let elementIsRemoved = false
        let ii = e.length

        while (!elementIsRemoved && ii) {
            ii = ii - 1
            let i = e[ii].removedNodes.length

            while (!elementIsRemoved && i) {
                i = i - 1
                elementIsRemoved = e[ii].removedNodes[i] === element
            }
        }

        if (elementIsRemoved) { dispose() }
    })

    let max = 1000
    const tryIt = () => {
        max = max - 1

        if (!max) { return dispose() }

        const parent = element.parentNode || element.host
        if (!parent) { return requestAnimationFrame(tryIt) }

        mObserver.observe(parent, { childList: true })
        slotObserver.observe(element, { childList: true })
    }

    tryIt()

    return observer
}