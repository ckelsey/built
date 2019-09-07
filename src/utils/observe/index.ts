import ID from "../id"

export const Observe = (initialValue, noInit = false) => {

    let values = Object.assign({}, {
        value: initialValue,
        previousValue: undefined,
        updated: new Date().getTime(),
        subscriptions: {}
    })

    const loop = (key, val, valuesObj = {}) => {
        Object.keys(values.subscriptions).forEach(subscriptionId => {
            const subscriptionFn = values.subscriptions[subscriptionId][key]

            if (!subscriptionFn || typeof subscriptionFn !== `function`) { return }

            subscriptionFn(val, valuesObj, subscriptionId)
        })
    }

    const unsubscribe = subscription => () => {
        values.subscriptions[subscription.id] = null
        delete values.subscriptions[subscription.id]
    }

    return {
        get value() { return values.value },
        get previous() { return values.previousValue },

        next(v) {
            values = Object.assign({}, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime(),
                subscriptions: values.subscriptions
            })

            loop(`next`, values.value, values)
        },

        error(err) { loop(`error`, err, values) },
        complete() { loop(`complete`, values) },

        subscribe(next, error = (_e) => { }, complete = () => { }) {
            const subscription: any = Object.assign({}, { next, error, complete, id: ID() })
            subscription.unsubscribe = unsubscribe(subscription)
            values.subscriptions[subscription.id] = subscription

            if (!noInit && values.value !== undefined && typeof subscription.next === `function`) {
                subscription.next(values.value, values, subscription.id)
            }

            return unsubscribe(subscription)
        },

        unsubscribe(subscription) {
            if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) { return }

            return unsubscribe(subscription)
        }
    }
}

export default Observe