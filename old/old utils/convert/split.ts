import { Tmonad, finishTMonad } from "./t-monad"
import ToString from "./to_string"
import { SplitMeta } from "./meta"

const Split = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = ToString(result)
    }

    const splat = SplitMeta(result.value, delimeter)

    if (typeof splat.value === `string`) {
        result.valid = false
        return finishTMonad(result, `array`, `Split`)
    }

    result.stringChanges = result.stringChanges.concat(splat.stringChanges)
    result.value = splat.value

    return finishTMonad(result, `array`, `Split`)
}

export default Split