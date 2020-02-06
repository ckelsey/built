import { ID } from '../services/id.js'
import { Get } from './get.js'
import { ToString } from './to-string.js'
import { ToJSON } from './to-json.js'

function emptyFn() { }

export function ObserveWorker(func) {
    let value
    let previous
    let worker
    let functionString = ToString(func).value
    const subscriptions = {}
    const firstBracket = functionString.indexOf('{')
    const beginingSlice = functionString.slice(firstBracket)
    const pendingSubscriptions = []

    functionString = ''.concat('function webworker()', beginingSlice, 'webworker()')

    function loop(method, data, subs) {
        function loopInner(key) {
            return Get(subs, ''.concat(key, '.', method), emptyFn())(data)
        }

        return Object.keys(subs).forEach(loopInner)
    }

    function shutDown() {
        if (worker) { worker.terminate() }
        worker = undefined
        return false
    }

    function startUp() {
        if (worker) { return }

        let blob

        try {
            blob = window.URL.createObjectURL(new Blob([functionString], { type: 'application/javascript' }))
        } catch (error) { }

        if (!blob) { return }

        worker = new Worker(blob)

        worker.onmessage = function onmessageFn(e) {
            previous = value
            value = e.data
            return loop('next', value, subscriptions)
        }

        worker.onerror = function onerrorFn(e) {
            return loop('error', e.message, subscriptions)
        }
        return worker
    }

    function noShutdown(subs) {
        return Object.keys(subs).length === 0 ? shutDown() : true
    }

    function unSubscribe(subscriberId) {
        return function unSubscribeInner() {
            subscriptions[subscriberId] = null
            delete subscriptions[subscriberId]
            noShutdown(subscriptions)
        }
    }

    function completeAll(subs) {
        function completeAllEach(key) {
            subs[key].complete()
            unSubscribe(key)
        }

        return Object.keys(subs).forEach(completeAllEach)
    }

    const methods = {
        dispose: function () { completeAll(subscriptions) },

        post: function (msg) {
            const index = pendingSubscriptions.length

            return new Promise(
                function postPromise(resolve, reject) {
                    function res(e) {
                        pendingSubscriptions[index]()
                        return resolve(e)
                    }

                    function rej(e) {
                        pendingSubscriptions[index]()
                        return reject(e)
                    }

                    pendingSubscriptions.push(methods.subscribe(res, rej, rej))
                    worker.postMessage(ToJSON(msg).value)
                }
            )
        },

        subscribe: function (next, error, complete) {
            error = error ? error : emptyFn
            complete = complete ? complete : emptyFn

            if (typeof next !== 'function') {
                return
            }

            const subscriber = {
                next: next,
                error: error,
                complete: complete,
                id: ID()
            }

            subscriptions[subscriber.id] = subscriber

            if (typeof subscriptions[subscriber.id].error !== 'function') {
                subscriptions[subscriber.id].error = unSubscribe(subscriber.id)
            }

            if (typeof subscriptions[subscriber.id].complete !== 'function') {
                subscriptions[subscriber.id].complete = unSubscribe(subscriber.id)
            }

            startUp()

            return unSubscribe(subscriber.id)
        }
    }

    Object.defineProperties(methods, {
        value: {
            get: function () {
                return value
            }
        },
        previous: {
            get: function () {
                return previous
            }
        },
        functionString: {
            get: function () {
                return functionString
            }
        },
        subscriptions: {
            get: function () {
                return subscriptions
            }
        },
        pending: {
            get: function () {
                return pendingSubscriptions
            }
        }
    })

    return methods
}