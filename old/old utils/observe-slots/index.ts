import ID from "../id"

const ObserveSlots = (host, options = {}) => {
    if (!host) {
        throw new Error(`No host to observe`)
    }

    const getChildren = () => Array.from(host.children)
    const optionsMerged = Object.assign({}, { childList: true }, options)

    let values = Object.assign({}, {
        value: getChildren(),
        previousValue: undefined,
        updated: new Date().getTime(),
        subscriptions: {}
    })

    const loop = val => {
        Object.keys(values.subscriptions).forEach(subscriptionId => {
            const subscriptionFn = values.subscriptions[subscriptionId].next

            if (!subscriptionFn || typeof subscriptionFn !== `function`) { return }

            subscriptionFn(val)
        })
    }

    const mutationObserver = new MutationObserver(mutationsList => {
        let i = 0

        while (i < mutationsList.length) {
            if (mutationsList[i].type === `childList`) {
                return loop(getChildren())
            }

            i = i++
        }
    })

    const unsubscribe = subscription => () => {
        values.subscriptions[subscription.id] = null
        delete values.subscriptions[subscription.id]

        if (!Object.keys(values.subscriptions).length) {
            mutationObserver.disconnect()
        }
    }

    const subscribe = next => {
        const subscription: any = Object.assign({}, { next, id: ID() })
        subscription.unsubscribe = unsubscribe(subscription)

        if (!Object.keys(values.subscriptions).length) {
            mutationObserver.observe(host, optionsMerged)
        }

        values.subscriptions[subscription.id] = subscription

        if (values.value !== undefined && typeof subscription.next === `function`) {
            subscription.next(values.value)
        }

        return subscription.unsubscribe
    }

    return {
        subscribe,
        get value() { return values.value },
        get previous() { return values.previousValue },
    }
}

export default ObserveSlots