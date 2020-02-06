import { Observer } from './observer.js'
import { ObserveExists } from './observe-exists.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { ObserverReturnEmpty } from './observer-empty.js'

function isVisible(e) {
    const instance = e[e.length - 1]
    const isNotDisplayed = instance.target ? window.getComputedStyle(instance.target).display === 'none' : instance.isNotDisplayed
    return (instance.boundingClientRect.width === 0 && instance.boundingClientRect.height === 0) || isNotDisplayed
}

function IObserver(callback) {
    if ('IntersectionObserver' in window) { return new IntersectionObserver(callback) }

    let timer
    let isRunning = false

    return {
        observe: function (element) {
            isRunning = true

            const history = {
                isNotDisplayed: false,
                boundingClientRect: {
                    width: 10000,
                    height: 10000
                }
            }

            function runIObserver() {
                if (!isRunning) { return }

                const isNotDisplayed = window.getComputedStyle(element).display === 'none'
                const rect = element.getBoundingClientRect()

                if (history.isNotDisplayed !== isNotDisplayed || history.boundingClientRect.width !== rect.width || history.boundingClientRect.height !== rect.height) {
                    history.isNotDisplayed = isNotDisplayed
                    history.boundingClientRect.width = rect.width
                    history.boundingClientRect.height = rect.height

                    if (isNotDisplayed || (rect.width === 0 || rect.height === 0)) {
                        callback([{
                            isNotDisplayed: isNotDisplayed,
                            boundingClientRect: { width: rect.width, height: rect.height }
                        }])
                    }
                }

                timer = OnNextFrame(runIObserver)
            }

            runIObserver()
        },
        disconnect: function () {
            isRunning = false
            if (timer) { timer.cancel() }
        }
    }
}

export function ObserveVisibility(element) {
    if (!element) { return ObserverReturnEmpty() }

    let isRunning = false
    let intersectionObserver

    function callback(e) {
        return !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(isVisible(e))
    }

    function startup() {
        if (isRunning || intersectionObserver) { return }
        isRunning = true
        intersectionObserver = IObserver(callback)
        intersectionObserver.observe(element)
    }

    const observer = Observer(undefined, undefined, startup)

    function shutDown() {

        try {
            intersectionObserver.disconnect()
        } catch (error) { }

        intersectionObserver = undefined
        isRunning = false
    }

    function dispose() {
        shutDown()
        observer.complete()
        try { exists() } catch (error) { }
    }

    function subFn(exists) {
        return exists ? undefined : dispose()
    }

    const exists = ObserveExists(element).subscribe(subFn)

    startup()

    return observer
}