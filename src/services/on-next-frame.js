const OnNextFrameKey = Symbol.for(`builtjs.OnNextFrameKey`)
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasOnNextFrame = (globalSymbols.indexOf(OnNextFrameKey) > -1)

const OnNextFrameQueue = []
let isRunning = false

function RunOnNextFrame() {
    if (isRunning) { return }

    isRunning = true

    const runTasks = startTime => {
        let ran = 0
        do {
            ran = ran + 1
            OnNextFrameQueue.shift()()
        } while (performance.now() - startTime < 3 && OnNextFrameQueue.length)

        // console.log(`Ran`, ran, performance.now() - startTime)
        if (OnNextFrameQueue.length) {
            return requestAnimationFrame(() => setTimeout(() => {
                runTasks(performance.now())
            }))
        } else {
            isRunning = false
        }
    }

    runTasks(performance.now())
}

if (!hasOnNextFrame) {
    global[OnNextFrameKey] = task => {
        // task()
        OnNextFrameQueue.push(task)
        RunOnNextFrame()
    }
}

export const OnNextFrame = Object.freeze(global[OnNextFrameKey])