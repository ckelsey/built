import { GetEase } from './get-ease.js'
import { EasePower } from './ease-power.js'

export function EaseInOut(values, duration, pow = 4) {
    return GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower((index / frames) * (index / frames), pow)
    )
}