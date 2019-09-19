import GetEase from './get-ease'
import EasePower from './ease-power'

const EaseInOut = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower((index / frames) * (index / frames), pow)
    )

export default EaseInOut