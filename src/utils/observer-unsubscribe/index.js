import { /* tree-shaking no-side-effects-when-called */ ReduceMap, IsDom, IsObject } from '../../index'

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under `subscriptions` or `eventSubscriptions` properties
 * @return {void}
 */

export function ObserverUnsubscribe(subscription) {
    // todo add filter for check
    const callArrayOfSubscriptions = ReduceMap(val => typeof val === `function` ? val() : undefined)

    if (typeof subscription === `function`) {
        return subscription()
    }

    if (Array.isArray(subscription)) {
        return subscription.reduce(callArrayOfSubscriptions, [])
    }

    if (IsDom(subscription)) {
        let key

        if (subscription.subscriptions) {
            key = `subscriptions`
        }

        if (subscription.eventSubscriptions) {
            key = `eventSubscriptions`
        }

        if (!key) { return }

        return Object.keys(subscription[key]).reduce(callArrayOfSubscriptions, [])
    }

    if (IsObject(subscription)) {
        Object.keys(subscription).reduce(callArrayOfSubscriptions, [])
    }
}