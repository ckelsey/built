import { Tmonad, finishTMonad } from "./t-monad"
import pipe from "../pipe"
import ToArray from "./to_array"
import StopIfInvalid from './stop_if_invalid'

const Filter = predicate => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const filter = v => {
        v.value = v.value.filter(predicate)
        return v
    }

    return finishTMonad(pipe(
        ToArray,
        StopIfInvalid,
        filter
    )(result), `array`, `Filter`)
}

export default Filter