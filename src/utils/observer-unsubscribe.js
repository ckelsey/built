import { /* tree-shaking no-side-effects-when-called */ IsDom, IsObject } from '..'

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under `subscriptions` or `eventSubscriptions` properties
 * @return {void}
 */

export function ObserverUnsubscribe(subscription) {
    if (!subscription) { return }

    if (typeof subscription === `function`) {
        return subscription()
    }

    if (Array.isArray(subscription)) {
        return subscription.forEach(current => typeof current === `function` ? current() : undefined)
    }

    if (IsDom(subscription)) {
        const key = subscription.eventSubscriptions ? `eventSubscriptions` : `subscriptions`

        if (!subscription[key]) { return }

        return Object.keys(subscription[key])
            .forEach(current => typeof subscription[key][current] === `function` ? subscription[key][current]() : undefined)
    }

    if (IsObject(subscription)) {
        Object.keys(subscription).forEach(current => typeof subscription[current] === `function` ? subscription[current]() : undefined)
    }
}