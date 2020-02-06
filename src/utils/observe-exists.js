import { Observer } from './observer.js'
import { ObserverReturnEmpty } from './observer-empty.js'
import { GetParent } from './get-parent.js'

export function ObserveExists(element) {
    const initialParent = GetParent(element)

    if (!initialParent) { return ObserverReturnEmpty() }

    let isRunning = false

    const mObserver = new MutationObserver(function mObserverInner(e) {
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

    function startup() {
        if (!GetParent(element) || isRunning) { return }
        isRunning = true
        mObserver.observe(initialParent, { childList: true })
    }

    const observer = Observer(!!initialParent, undefined, startup)

    function shutDown() {
        isRunning = false
    }

    function dispose() {
        shutDown()
        observer.next(false)
        observer.complete()
        mObserver.disconnect()
    }

    return observer
}