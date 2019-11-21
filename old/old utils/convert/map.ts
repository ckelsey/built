import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import StopIfInvalid from './stop_if_invalid'
import { Type } from '../_type'
import ToArray from './to_array'

const Map = fn => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const map = v => {
        if (Type(v.value) !== `array`) {
            v.valid = false
            return v
        }

        v.value = v.value.map(fn)
        return v
    }

    return finishTMonad(pipe(
        ToArray,
        StopIfInvalid,
        map
    )(result), `array`, `Map`)
}

export default Map