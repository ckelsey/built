import { ID } from '../services/id.js'
import { AssignObject } from './assign.js'

const emptyFn = function () { }

function Observer(initialValue, noInit, onSubscribe) {
    noInit = noInit ? true : false
    onSubscribe = onSubscribe && typeof onSubscribe === 'function' ? onSubscribe : emptyFn

    let values = AssignObject({}, {
        value: initialValue,
        errors: [],
        previousValue: undefined,
        updated: new Date().getTime(),
        subscriptions: {},
        isComplete: false
    })

    function valuesSubsEach(subscriptionId) {
        return values.subscriptions[subscriptionId].unsubscribe()
    }

    function destroy() {
        Object.keys(values.subscriptions).forEach(valuesSubsEach)

        Object.defineProperties(result, {
            value: { get: function () { return undefined } },
            previous: { get: function () { return undefined } },
            subscriptions: { get: function () { return undefined } },
            next: { value: emptyFn },
            error: { value: emptyFn },
            complete: { value: emptyFn },
            subscribe: { value: emptyFn },
            unsubscribe: { value: emptyFn },
        })

        values.isComplete = true
    }

    function loopSubsEach(key, val, valuesObj) {
        return function loopSubsEachInner(subscriptionId) {
            const subscriptionFn = values.subscriptions[subscriptionId][key]
            if (typeof subscriptionFn !== 'function') { return }
            subscriptionFn(val, valuesObj, subscriptionId)
        }
    }

    function loop(key, val, valuesObj) {
        valuesObj = valuesObj ? valuesObj : {}

        const _loopSubsEach = loopSubsEach(key, val, valuesObj)

        Object.keys(values.subscriptions).forEach(_loopSubsEach)

        if (key === 'complete') {
            destroy()
        }
    }

    function unsubscribe(subscription) {
        return function unsubscribeInner() {
            values.subscriptions[subscription.id] = null
            delete values.subscriptions[subscription.id]
        }
    }

    function trace() {
        return new Error().stack
    }

    const result = {
        get isComplete() { return values.isComplete },
        get value() { return values.value },
        get previous() { return values.previousValue },
        get subscriptions() { return values.subscriptions },

        next: function (v) {
            values = AssignObject({}, values, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime(),
            })

            loop('next', values.value, values)
        },

        error: function (err) {
            values = AssignObject({}, values, {
                errors: values.errors.concat([err]),
                updated: new Date().getTime(),
            })

            loop('error', err, values)
        },

        complete: function () { loop('complete', values) },

        subscribe: function (next, error, complete) {
            error = error ? error : emptyFn
            complete = complete ? complete : emptyFn

            const subscription = AssignObject({}, {
                next: next,
                error: error,
                complete: complete,
                id: ID(),
                trace: trace()
            })

            subscription.unsubscribe = unsubscribe(subscription)
            values.subscriptions[subscription.id] = subscription

            if (!noInit && values.value !== undefined && typeof subscription.next === 'function') {
                subscription.next(values.value, values, subscription.id)
            }

            onSubscribe(subscription)

            return unsubscribe(subscription)
        },

        unsubscribe: function (subscription) {
            if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) { return }

            return unsubscribe(subscription)
        }
    }

    return result
}

export { Observer }
