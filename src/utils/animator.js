import { OnNextFrame } from '..'

export function Animator(
    {
        duration = 0,
        stepFn = () => { },
        frameValues = [],
        completeFn = () => { }
    }
) {

    if (!duration || isNaN(duration) || !Array.isArray(frameValues) || !frameValues.length) { return }

    const startTime = Date.now()

    const run = () => {
        const currentTime = Date.now()
        const currentFrame = frameValues[currentTime - startTime]

        if (currentTime - startTime > duration || currentFrame === undefined) {
            return completeFn()
        }

        OnNextFrame(() => stepFn(currentFrame))
        OnNextFrame(run)
    }

    run()
}