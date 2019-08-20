import ID from "../id"

export const Observe = (initialValue, noInit = false) => {

    let values = Object.assign({}, {
        value: initialValue,
        previousValue: undefined,
        updated: new Date().getTime()
    })

    const subscriptions = {}
    const taps = {}

    const loop = (key, val, obj = {}) => {
        Object.keys(subscriptions).forEach(subscriptionId => {
            const subscriptionFn = subscriptions[subscriptionId][key]

            if (!subscriptionFn || typeof subscriptionFn !== `function`) {
                return
            }

            subscriptionFn(val, obj)
        })

        Object.keys(taps).forEach(tapId => {
            if (typeof taps[tapId] !== `function`) { return }
            taps[tapId](key, val, subscriptions, obj)
        })
    }

    const unsubscribe = subscription => () => {
        subscriptions[subscription.id] = null
        delete subscriptions[subscription.id]

        Object.keys(taps).forEach(tapId => {
            if (typeof taps[tapId] !== `function`) { return }
            taps[tapId](`unsubscribe`, subscription, subscriptions, values)
        })
    }

    return {
        get value() { return values.value },
        get previous() { return values.previousValue },

        next(v) {
            values = Object.assign({}, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime()
            })

            loop(`next`, values.value, values)
        },

        error(err) { loop(`error`, err, values) },
        complete() { loop(`complete`, values) },
        tap(fn) { taps[ID()] = fn },

        subscribe(next, error, complete) {
            const subscription = Object.assign({}, { next, error, complete, id: ID() })
            subscriptions[subscription.id] = subscription

            if (!noInit && values.value !== undefined && typeof subscription.next === `function`) {
                subscription.next(values.value, values)
            }

            return unsubscribe(subscription)
        }
    }
}