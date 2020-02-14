import { Observer } from './observer.js'
import { ObserveExists } from './observe-exists.js'
import { ObjectAssign } from './object-assign.js'

export function ObserveEvent(element, eventName, options) {
    if (!element || !eventName) { return }

    options = options ? options : {}

    let isRunning = false
    let disposeTimer = setTimeout(function () { })

    options = ObjectAssign({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: true
    }, options)

    function isWindow() {
        return element &&
            element.document &&
            element.location &&
            element.alert &&
            element.setInterval
    }

    function startup() {
        if (isRunning) { return }
        isRunning = true
        try {
            element.addEventListener(eventName, eventHandler, options.useCapture)
        } catch (error) { }
    }

    const observer = Observer(undefined, undefined, startup)

    function eventHandler(event) {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    function shutDown() {
        try { element.removeEventListener(eventName, eventHandler, options.useCapture) } catch (error) { }
        isRunning = false
    }

    function dispose() {
        shutDown()

        disposeTimer = setTimeout(function () {
            observer.complete()
            try { exists() } catch (error) { }
        }, 1000)
    }

    function subFn(exists) {
        clearTimeout(disposeTimer)

        if (!exists) {
            dispose()
        } else {
            startup()
        }
    }

    const exists = isWindow() ? function () { } : ObserveExists(element).subscribe(subFn)

    return observer
}