import { ID } from '..'

const OnNextFrameKey = Symbol.for(`builtjs.OnNextFrameKey`)
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasOnNextFrame = (globalSymbols.indexOf(OnNextFrameKey) > -1)

const OnNextFrameQueueObject = {}
const OnNextFrameQueue = []
let isRunning = false

function RunOnNextFrame() {
    if (isRunning) { return }

    isRunning = true

    const runTasks = startTime => {
        let ids = []

        do {
            const id = OnNextFrameQueue.shift()

            if (OnNextFrameQueueObject[id]) {
                OnNextFrameQueueObject[id].resolve(OnNextFrameQueueObject[id].task())
            }

        } while (performance.now() - startTime < 6 && OnNextFrameQueue.length)

        requestAnimationFrame(() => setTimeout(() => ids.forEach(i => delete OnNextFrameQueueObject[i])))

        if (OnNextFrameQueue.length) {
            return requestAnimationFrame(() => setTimeout(() => runTasks(performance.now())))
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