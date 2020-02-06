import { IsDom } from './is-dom.js'
import { IsObject } from './is-object.js'

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under 'subscriptions' or 'eventSubscriptions' properties
 * @return {void}
 */

export function ObserverUnsubscribe(subscription) {
    if (!subscription) { return }

    if (typeof subscription === 'function') {
        return subscription()
    }

    function subscriptionEach(current) {
        return typeof current === 'function' ? current() : undefined
    }

    function subscriptionKeysEach(key) {
        return function subscriptionKeysEachInner(current) {
            return typeof subscription[key][current] === 'function' ? subscription[key][current]() : undefined
        }
    }

    function subscriptionObjectKeysEach(current) {
        return typeof subscription[current] === 'function' ? subscription[current]() : undefined
    }

    if (Array.isArray(subscription)) {
        return subscription.forEach(subscriptionEach)
    }

    if (IsDom(subscription)) {
        const key = subscription.eventSubscriptions ? 'eventSubscriptions' : 'subscriptions'

        if (!subscription[key]) { return }

        const _subscriptionKeysEach = subscriptionKeysEach(key)

        return Object.keys(subscription[key]).forEach(_subscriptionKeysEach)
    }

    if (IsObject(subscription)) {
        Object.keys(subscription).forEach(subscriptionObjectKeysEach)
    }
}