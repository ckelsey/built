import GetEase from './get-ease'
import EasePower from './ease-power'

const EaseOut = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower(index / frames, pow)
    )

export default EaseOut
