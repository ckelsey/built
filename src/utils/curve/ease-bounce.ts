import GetEase from './get-ease'
import EasePower from './ease-power'

const EaseBounce = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower(1 - (index / frames), pow)
    )

export default EaseBounce