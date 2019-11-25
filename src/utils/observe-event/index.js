import { Observer } from '../..'

export function ObserveEvent(element, eventName, options = {}) {
    if (!element || !eventName) { return }

    options = Object.assign({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: true
    }, options)

    const observer = Observer()

    const eventHandler = event => {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    const shutDown = () => element.removeEventListener(eventName, eventHandler, options.useCapture)

    const dispose = () => {
        shutDown()
        observer.complete()
    }

    const mObserver = new MutationObserver(e => {
        let foundElement = false
        let ii = e.length

        while (!foundElement && ii) {
            ii = ii - 1
            let i = e[ii].removedNodes.length

            while (!foundElement && i) {
                i = i - 1
                foundElement = e[ii].removedNodes[i] === element
            }
        }

        if (foundElement) { dispose() }
    })

    let max = 1000
    const tryIt = () => {
        max = max - 1

        if (!max) { return }

        /** TODO - does not work for root elements of web components as they don't have parentElement */
        if (!element.parentElement) {
            return requestAnimationFrame(tryIt)
        }

        mObserver.observe(element.parentElement, { childList: true })
        element.addEventListener(eventName, eventHandler, options.useCapture)
    }

    tryIt()

    return observer
}