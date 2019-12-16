import { ID } from '..'

const subscriptions = {}
let isRunning = false

const loop = () => {
    isRunning = true
    const subscriptionKeys = Object.keys(subscriptions)

    if (!subscriptionKeys.length) {
        isRunning = false
        return
    }

    subscriptionKeys.forEach(key => {
        const subscription = subscriptions[key]

        requestAnimationFrame(() => setTimeout(() => {
            const currentFrame = new Date().getTime() - subscription.started

            if (!!subscription.duration && typeof subscription.frames[currentFrame] === `undefined`) {
                return subscription.cancel()
            }

            subscription.fn(subscription.frames[currentFrame])
        }, 0))
    })

    requestAnimationFrame(loop)
}

export function Timer(duration, stepFn, frameValues = undefined, completeFn = () => { }) {
    if (!duration && duration !== 0) { return }

    const id = ID()

    subscriptions[id] = {
        id,
        duration,
        complete: typeof completeFn !== `function` ? () => { } : completeFn,
        cancel: () => {
            if (!subscriptions[id]) { return }

            subscriptions[id].complete()
            subscriptions[id] = null
            delete subscriptions[id]
        },
        fn: typeof stepFn !== `function` ? () => { } : stepFn,
        frames: frameValues ? frameValues.slice() : duration ? Array(duration).fill(0) : [],
        started: new Date().getTime()
    }

    if (!isRunning) {
        loop()
    }

    return subscriptions[id]
}