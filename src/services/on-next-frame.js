import { ID } from '..'

const OnNextFrameKey = Symbol.for(`builtjs.OnNextFrameKey`)
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasOnNextFrame = (globalSymbols.indexOf(OnNextFrameKey) > -1)

const OnNextFrameQueueObject = {}
const OnNextFrameQueue = []
let isRunning = false
let frameTimer
let timeout

function RunOnNextFrame() {
    if (isRunning) { return }

    isRunning = true

    const runTasks = startTime => {
        cancelAnimationFrame(frameTimer)
        clearTimeout(timeout)

        do {
            const id = OnNextFrameQueue.shift()

            if (OnNextFrameQueueObject[id]) {
                OnNextFrameQueueObject[id].resolve(OnNextFrameQueueObject[id].task())
                requestAnimationFrame(() => OnNextFrameQueueObject[id])
            }

        } while (performance.now() - startTime < 5 && OnNextFrameQueue.length)

        if (OnNextFrameQueue.length) {
            return frameTimer = requestAnimationFrame(() =>
                timeout = setTimeout(
                    () => runTasks(performance.now())
                )
            )
        } else {
            isRunning = false
        }
    }

    runTasks(performance.now())
}

if (!hasOnNextFrame) {
    global[OnNextFrameKey] = task => {

        let resolve, reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        const id = ID()

        OnNextFrameQueueObject[id] = {
            task,
            promise,
            resolve,
            reject,
            id,
            cancel: () => {
                OnNextFrameQueueObject[id] = null
                delete OnNextFrameQueueObject[id]
            }
        }

        OnNextFrameQueue.push(id)
        RunOnNextFrame()

        return OnNextFrameQueueObject[id]
    }
}

export const OnNextFrame = Object.freeze(global[OnNextFrameKey])