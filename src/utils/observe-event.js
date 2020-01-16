import { Observer, ObserveExists } from '..'

export function ObserveEvent(element, eventName, options = {}) {
    if (!element || !eventName) { return }

    let isRunning = false

    options = Object.assign({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: true
    }, options)

    const isWindow = () => element &&
        element.document &&
        element.location &&
        element.alert &&
        element.setInterval

    const startup = () => {
        if (isRunning) { return }
        isRunning = true
        try { element.addEventListener(eventName, eventHandler, options.useCapture) } catch (error) { }
    }

    const observer = Observer(undefined, undefined, startup)

    const eventHandler = event => {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    const shutDown = () => {

        try {
            element.removeEventListener(eventName, eventHandler, options.useCapture)
        } catch (error) { }

        isRunning = false
    }

    const dispose = () => {
        shutDown()
        observer.complete()
        try { exists() } catch (error) { }
    }

    const exists = isWindow() ? () => { } : ObserveExists(element).subscribe(exists => exists ? undefined : dispose())

    startup()

    return observer
}