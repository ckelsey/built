import { GetEase } from '..'

export function EaseIn(values, duration, pow = 4) {
    return GetEase(
        values,
        duration,
        pow,
        (index, frames) => {
            const t = index / frames
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        }
    )
}