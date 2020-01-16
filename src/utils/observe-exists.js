import { Observer, GetParent, OnNextFrame } from '..'

export function ObserveExists(element) {
    const initialParent = GetParent(element)

    if (!initialParent) {
        const _observer = Observer(false)
        OnNextFrame(() => {
            _observer.next(false)
            _observer.complete()
        })

        return _observer
    }

    let isRunning = false

    const mObserver = new MutationObserver(e => {
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

    const startup = () => {
        if (!GetParent(element) || isRunning) { return }
        isRunning = true
        mObserver.observe(initialParent, { childList: true })
    }

    const observer = Observer(!!initialParent, undefined, startup)
    const shutDown = () => isRunning = false

    const dispose = () => {
        shutDown()
        observer.next(false)
        observer.complete()
        mObserver.disconnect()
    }

    return observer
}