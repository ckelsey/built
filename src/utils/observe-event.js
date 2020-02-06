import { Observer } from './observer.js'
import { ObserveExists } from './observe-exists.js'
import { AssignObject } from './assign.js'

export function ObserveEvent(element, eventName, options) {
    if (!element || !eventName) { return }

    options = options ? options : {}

    let isRunning = false

    options = AssignObject({}, {
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
        try { element.addEventListener(eventName, eventHandler, options.useCapture) } catch (error) { }
    }

    const observer = Observer(undefined, undefined, startup)

    function eventHandler(event) {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    function shutDown() {

        try {
            element.removeEventListener(eventName, eventHandler, options.useCapture)
        } catch (error) { }

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

    const exists = isWindow() ? function () { } : ObserveExists(element).subscribe(subFn)

    startup()

    return observer
}