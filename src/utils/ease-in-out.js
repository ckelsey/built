import { GetEase } from './get-ease.js'
import { EasePower } from './ease-power.js'

export function EaseInOut(values, duration, pow) {
    pow = pow === undefined ? 4 : pow

    function fn(index, frames, pow) {
        return EasePower((index / frames) * (index / frames), pow)
    }

    return GetEase(values, duration, pow, fn)
}