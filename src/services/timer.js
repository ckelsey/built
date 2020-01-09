import { Singleton } from './singleton.js'
import { ID } from './id.js'
import { OnNextFrame } from './on-next-frame.js'

const subscriptions = {}
let isRunning = false

const removeSubscription = subscription => {
    if (!subscription || !subscription.id) { return }

    const id = subscription.id

    if (!subscriptions[id] || subscriptions[id].resolved) { return }

    subscriptions[id].resolved = true
    subscriptions[id].resolve()

    OnNextFrame(() => {
        subscriptions[id] = null
        delete subscriptions[id]
    })
}

const loop = () => {
    isRunning = true
    const subscriptionKeys = Object.keys(subscriptions)

    if (!subscriptionKeys.length) {
        isRunning = false
        return
    }

    subscriptionKeys.forEach(key => {
        if (!subscriptions[key] || subscriptions[key].resolved) { return }
        const subscription = subscriptions[key]
        const index = new Date().getTime() - subscription.started

        if (index >= subscription.frameValues.length) {
            subscription.end = index
            OnNextFrame(() => subscription.stepFn(subscription.frameValues[subscription.frameValues.length - 1]))
            OnNextFrame(() => removeSubscription(subscription))
        } else {
            OnNextFrame(() => subscription.stepFn(subscription.frameValues[index]))
        }
    })

    OnNextFrame(loop)
}

export const Timer = Singleton(`Timer`, (stepFn, frameValues) => {
    if (!Array.isArray(frameValues) || frameValues.length === 0) { return }
    if (typeof stepFn !== `function`) { return }

    const id = ID()
    let resolve, reject
    const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
    })

    subscriptions[id] = {
        id,
        stepFn,
        frameValues: frameValues,
        resolved: false,
        started: new Date().getTime(),
        cancel: () => removeSubscription(subscriptions[id]),
        then: (fn) => promise.then(fn),
        catch: (fn) => promise.catch(fn),
        promise,
        resolve,
        reject
    }

    if (!isRunning) { loop() }

    return subscriptions[id]
})