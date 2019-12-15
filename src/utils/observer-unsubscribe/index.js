import { /* tree-shaking no-side-effects-when-called */ IsDom, IsObject } from '../../index'

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under `subscriptions` or `eventSubscriptions` properties
 * @return {void}
 */

export function ObserverUnsubscribe(subscription) {

    if (typeof subscription === `function`) {
        return subscription()
    }

    if (Array.isArray(subscription)) {
        return subscription.reduce((result, current) => typeof current === `function` ? current() : undefined, [])
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

        return Object.keys(subscription[key])
            .reduce((result, current) => {
                typeof subscription[key][current] === `function` ? subscription[key][current]() : undefined
                return false
            }, [])
    }

    if (IsObject(subscription)) {
        Object.keys(subscription).reduce((result, current) => typeof subscription[current] === `function` ? subscription[current]() : undefined, [])
    }
}