import { Observer, ObserveExists } from '..'
import { OnNextFrame } from '../services/on-next-frame'

export function ObserveVisibility(element) {
    const returnEmpty = () => {
        const _observer = Observer(false)
        OnNextFrame(() => {
            _observer.next(false)
            _observer.complete()
        })

        return _observer
    }

    if (!element) { return returnEmpty() }

    let isRunning = false
    let intersectionObserver

    const callback = e => !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(e)

    const startup = () => {
        if (isRunning || intersectionObserver) { return }
        isRunning = true
        intersectionObserver = new IntersectionObserver(callback)
        intersectionObserver.observe(element)
    }

    const observer = Observer(undefined, undefined, startup)

    const shutDown = () => {

        try {
            intersectionObserver.disconnect()
        } catch (error) { }

        intersectionObserver = undefined
        isRunning = false
    }

    const dispose = () => {
        shutDown()
        observer.complete()
        try { exists() } catch (error) { }
    }

    const exists = ObserveExists(element).subscribe(exists => exists ? undefined : dispose())

    startup()

    return observer
}