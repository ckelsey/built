import { Observer, ObserveExists } from '..'
import { OnNextFrame } from '../services/on-next-frame'

function isVisible(e) {
    const instance = e[e.length - 1]
    const isNotDisplayed = instance.target ? window.getComputedStyle(instance.target).display === `none` : instance.isNotDisplayed
    return (instance.boundingClientRect.width === 0 && instance.boundingClientRect.height === 0) || isNotDisplayed
}

const IObserver = callback => {
    if (`IntersectionObserver` in window) { return new IntersectionObserver(callback) }

    let timer
    let isRunning = false

    return {
        observe: element => {
            isRunning = true

            const history = {
                isNotDisplayed: false,
                boundingClientRect: {
                    width: 10000,
                    height: 10000
                }
            }

            const runIObserver = () => {
                if (!isRunning) { return }

                const isNotDisplayed = window.getComputedStyle(element).display === `none`
                const rect = element.getBoundingClientRect()

                if (history.isNotDisplayed !== isNotDisplayed || history.boundingClientRect.width !== rect.width || history.boundingClientRect.height !== rect.height) {
                    history.isNotDisplayed = isNotDisplayed
                    history.boundingClientRect.width = rect.width
                    history.boundingClientRect.height = rect.height

                    if (isNotDisplayed || (rect.width === 0 || rect.height === 0)) {
                        callback([{ isNotDisplayed, boundingClientRect: { width: rect.width, height: rect.height } }])
                    }
                }

                timer = OnNextFrame(runIObserver)
            }

            runIObserver()
        },
        disconnect: () => {
            isRunning = false
            if (timer) { timer.cancel() }
        }
    }
}

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

    const callback = e => !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(isVisible(e))

    const startup = () => {
        if (isRunning || intersectionObserver) { return }
        isRunning = true
        intersectionObserver = IObserver(callback)
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