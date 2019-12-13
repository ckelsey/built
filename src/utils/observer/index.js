import { ID } from "../id"

function Observer(initialValue, noInit = false, onSubscribe = () => { }) {
    let values = Object.assign({}, {
        value: initialValue,
        errors: [],
        previousValue: undefined,
        updated: new Date().getTime(),
        subscriptions: {},
        isComplete: false
    })

    const destroy = () => {
        Object.keys(values.subscriptions).forEach(subscriptionId => values.subscriptions[subscriptionId].unsubscribe())

        Object.defineProperties(result, {
            value: { get() { return undefined } },
            previous: { get() { return undefined } },
            subscriptions: { get() { return undefined } },
            next: { value: () => { } },
            error: { value: () => { } },
            complete: { value: () => { } },
            subscribe: { value: () => { } },
            unsubscribe: { value: () => { } },
        })

        values.isComplete = true
    }

    const loop = (key, val, valuesObj = {}) => {
        Object.keys(values.subscriptions).forEach(subscriptionId => {
            const subscriptionFn = values.subscriptions[subscriptionId][key]
            if (typeof subscriptionFn !== `function`) { return }
            subscriptionFn(val, valuesObj, subscriptionId)
        })

        if (key === `complete`) {
            destroy()
        }
    }

    const unsubscribe = subscription => () => {
        values.subscriptions[subscription.id] = null
        delete values.subscriptions[subscription.id]
    }

    const result = {
        get isComplete() { return values.isComplete },
        get value() { return values.value },
        get previous() { return values.previousValue },
        get subscriptions() { return values.subscriptions },

        next(v) {
            values = Object.assign({}, values, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime(),
            })

            loop(`next`, values.value, values)
        },

        error(err) {
            values = Object.assign({}, values, {
                errors: values.errors.concat([err]),
                updated: new Date().getTime(),
            })

            loop(`error`, err, values)
        },
        complete() { loop(`complete`, values) },

        subscribe(next, error = () => { }, complete = () => { }) {
            const subscription = Object.assign({}, { next, error, complete, id: ID() })
            subscription.unsubscribe = unsubscribe(subscription)
            values.subscriptions[subscription.id] = subscription

            if (!noInit && values.value !== undefined && typeof subscription.next === `function`) {
                subscription.next(values.value, values, subscription.id)
            }

            onSubscribe(subscription)

            return unsubscribe(subscription)
        },

        unsubscribe(subscription) {
            if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) { return }

            return unsubscribe(subscription)
        }
    }

    return result
}

export { Observer }
