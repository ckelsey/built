import { ID } from '../services/id.js'

const OnNextFrameKey = Symbol.for(`builtjs.OnNextFrame`)
const hasOnNextFrame = (Object.getOwnPropertySymbols(global).indexOf(OnNextFrameKey) > -1)

const OnNextFrameSet = new Set()
let isRunning = false
let frameTimer
let timeout

function runTasks(startTime) {
    cancelAnimationFrame(frameTimer)
    clearTimeout(timeout)

    const hasTime = () => performance.now() - startTime < runTasks.max

    while (hasTime() && OnNextFrameSet.size) {
        const entries = OnNextFrameSet.values()
        let entry = entries.next()

        while (entry.done === false && hasTime()) {
            const val = entry.value
            OnNextFrameSet.delete(entry.value)
            if (val) { val.resolve(val.task()) }
            entry = entries.next()
        }
    }

    if (OnNextFrameSet.size) {
        return frameTimer = requestAnimationFrame(() => timeout = setTimeout(() => runTasks(performance.now())))
    } else {
        isRunning = false
    }
}

runTasks.max = 5

function RunOnNextFrame() {
    if (isRunning) { return }
    isRunning = true
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
        const data = {
            task,
            promise,
            resolve,
            reject,
            id,
            cancel: () => OnNextFrameSet.delete(data)
        }

        OnNextFrameSet.add(data)
        RunOnNextFrame()

        return data
    }

    global[OnNextFrameKey].max = max => { runTasks.max = max }
}

export const OnNextFrame = Object.freeze(global[OnNextFrameKey])