import { GetEase, EasePower } from '../..'

export function EaseInOut(values, duration, pow = 4) {
    return GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower((index / frames) * (index / frames), pow)
    )
}