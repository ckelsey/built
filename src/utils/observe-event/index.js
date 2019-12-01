import { Observer } from '../..'

export function ObserveEvent(element, eventName, options = {}) {
    if (!element || !eventName) { return }

    let isRunning = false
    let mObserver = { disconnect: () => { } }

    options = Object.assign({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: true
    }, options)

    const startup = () => {
        if (!element || (!element.parentNode && !element.host) || isRunning) { return }

        isRunning = true

        element.addEventListener(eventName, eventHandler, options.useCapture)
    }

    const observer = Observer(undefined, undefined, startup)

    const eventHandler = event => {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    const shutDown = () => {
        element.removeEventListener(eventName, eventHandler, options.useCapture)
        isRunning = false
    }

    const dispose = () => {
        shutDown()
        observer.complete()
        mObserver.disconnect()
    }

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
        const parent = element.parentNode || element.host
        max = max - 1

        if (!max) { return dispose() }
        if (!parent) { return requestAnimationFrame(tryIt) }

        mObserver.observe(parent, { childList: true })
        startup()
    }

    tryIt()

    return observer
}