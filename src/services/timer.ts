import ID from '../utils/id'

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
        const currentFrame = new Date().getTime() - subscription.started

        if (!!subscription.duration && typeof subscription.frames[currentFrame] === 'undefined') {
            return subscriptions[key].cancel()
        }

        subscription.fn(subscription.frames[currentFrame])
    })

    requestAnimationFrame(loop)
}

const Timer = /*#__PURE__*/ (duration, stepFn, frameValues = undefined, completeFn = () => { }) => {
    if (!duration && duration !== 0) { return }

    const id = ID(`timer`)

    subscriptions[id] = {
        id,
        duration,
        complete: typeof completeFn !== `function` ? () => { } : completeFn,
        fn: typeof stepFn !== `function` ? () => { } : stepFn,
        frames: !!frameValues ? frameValues.slice() : !!duration ? Array(duration).fill(0) : [],
        cancel: () => {
            subscriptions[id].complete()
            subscriptions[id] = null
            delete subscriptions[id]
        },
        started: new Date().getTime()
    }

    if (!isRunning) {
        loop()
    }

    return subscriptions[id]
}

export default Timer