import { ID, Get, ToJSON, ToString } from '../..'

export function ObserveWorker(func) {
    let value
    let previous
    let worker
    let functionString = ToString(func).value
    const subscriptions = {}
    const firstBracket = functionString.indexOf(`{`)
    const beginingSlice = functionString.slice(firstBracket)
    const pendingSubscriptions = []

    functionString = `function webworker()${beginingSlice}webworker()`

    const loop = (method, data, subs) =>
        Object.keys(subs)
            .forEach(key =>
                Get(subs, `${key}.${method}`, () => { })(data)
            )

    const shutDown = () => {
        if (worker) { worker.terminate() }
        worker = undefined
        return false
    }

    const startUp = () => {
        if (worker) { return }

        let blob

        try {
            blob = window.URL.createObjectURL(new Blob([functionString], { type: `application/javascript` }))
        } catch (error) { }

        if (!blob) { return }

        worker = new Worker(blob)

        worker.onmessage = e => {
            previous = value
            value = e.data
            return loop(`next`, value, subscriptions)
        }
        worker.onerror = e => loop(`error`, e.message, subscriptions)
        return worker
    }

    const noShutdown = subs => Object.keys(subs).length === 0 ? shutDown() : true

    const unSubscribe = subscriberId => () => {
        subscriptions[subscriberId] = null
        delete subscriptions[subscriberId]
        noShutdown(subscriptions)
    }

    const completeAll = subs => Object.keys(subs)
        .forEach(key => {
            subs[key].complete()
            unSubscribe(key)
        })

    const methods = {
        get value() { return value },
        get previous() { return previous },
        get functionString() { return functionString },
        get subscriptions() { return subscriptions },
        get pending() { return pendingSubscriptions },

        dispose() { completeAll(subscriptions) },

        post(msg) {
            const index = pendingSubscriptions.length

            return new Promise((resolve, reject) => {
                const res = e => {
                    pendingSubscriptions[index]()
                    return resolve(e)
                }

                const rej = e => {
                    pendingSubscriptions[index]()
                    return reject(e)
                }

                pendingSubscriptions.push(methods.subscribe(res, rej, rej))
                worker.postMessage(ToJSON(msg).value)
            })
        },

        subscribe(next, error = () => { }, complete = () => { }) {
            if (typeof next !== `function`) { return }

            const subscriber = {
                next,
                error,
                complete,
                id: ID()
            }

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

    return methods
}