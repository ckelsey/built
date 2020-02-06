import { OnNextFrame } from '../services/on-next-frame'

function emptyFn() { }

export function Animator(options) {

    const duration = options.duration ? options.duration : 0
    const stepFn = options.stepFn ? options.stepFn : emptyFn
    const frameValues = options.frameValues ? options.frameValues : []
    const completeFn = options.completeFn ? options.completeFn : emptyFn

    if (!duration || isNaN(duration) || !Array.isArray(frameValues) || !frameValues.length) { return }

    const startTime = Date.now()

    function run() {
        const currentTime = Date.now()
        const currentFrame = frameValues[currentTime - startTime]

        if (currentTime - startTime > duration || currentFrame === undefined) {
            return completeFn()
        }

        OnNextFrame(function runNext() { return stepFn(currentFrame) })
        OnNextFrame(run)
    }

    run()
}