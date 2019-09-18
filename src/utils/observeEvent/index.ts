interface ObserveEventObject {
    value: any
    previous: any
    dispose: () => void
    subscribe: (n: (a: any) => any, e?: (a?: any) => any, c?: () => any) => () => void
}

interface Opts {
    preventDefault?: boolean
    stopPropagation?: boolean
    useCapture?: boolean
}

const ObserveEvent = (element, eventName, options: Opts = {}): ObserveEventObject => {
    options = Object.assign({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: false
    }, options)

    if (!element || !eventName) { return }

    const subscriptions = {}

    const loop = (method, data) => {
        Object.keys(subscriptions)
            .forEach(
                key => subscriptions[key][method](data)
            )
    }

    const eventHandler = (event) => {
        if (Object.keys(subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        previous = value
        value = event

        loop(`next`, event)
    }

    const startUp = () => {
        element.removeEventListener(eventName, eventHandler, options.useCapture)
        element.addEventListener(eventName, eventHandler, options.useCapture)
    }

    const shutDown = () => {
        element.removeEventListener(eventName, eventHandler, options.useCapture)
    }

    const unSubscribe = subscriberId => () => {
        subscriptions[subscriberId] = null
        delete subscriptions[subscriberId]

        if (Object.keys(subscriptions).length === 0) {
            shutDown()
        }
    }

    let value
    let previous

    const methods = {
        get value() { return value },
        get previous() { return previous },

        dispose() {
            shutDown()
            Object.keys(subscriptions).forEach(key => {
                subscriptions[key].complete()
                unSubscribe(key)
            })

        },

        subscribe(next, error?, complete?) {
            if (typeof next !== `function` && typeof error !== `function` && typeof complete !== `function`) { return }

            const subscriber = Object.assign({}, {
                next,
                error,
                complete
            }, {
                id: `${new Date().getTime()}_${Object.keys(subscriptions).length}_${Math.round(Math.random() * 10000)}`
            })

            subscriptions[subscriber.id] = subscriber

            if (typeof subscriptions[subscriber.id].error !== `function`) {
                subscriptions[subscriber.id].error = unSubscribe(subscriber.id)
            }

            if (typeof subscriptions[subscriber.id].complete !== `function`) {
                subscriptions[subscriber.id].complete = unSubscribe(subscriber.id)
            }

            startUp()

            return unSubscribe(subscriber.id)
        }
    }

    const mObserver = new MutationObserver(e => {
        if (!e || typeof e.forEach !== `function`) { return }
        e.forEach(_e => {
            Array.from(_e.removedNodes).forEach(r => {
                if (r !== element) { return }
                methods.dispose()
            })

        })
    })

    let waiting = 1000
    const waitForParent = () => {
        if (element === window) { return }

        if (!!element.parentNode) {
            try {
                mObserver.observe(element.parentNode, { childList: true })
                return
            } catch (error) { }
        }

        waiting = waiting - 1

        if (!waiting) { return }

        requestAnimationFrame(waitForParent)
    }

    waitForParent()

    return methods
}

export default ObserveEvent