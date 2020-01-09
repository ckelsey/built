import { TMonad } from './t-monad.js'
import { Pipe } from './pipe.js'
import { TMonadUpdate } from './t-monad-update.js'
import { ToArray } from './to-array.js'
import { StopIfInvalid } from './stop-if-invalid.js'

export function ToFilter(predicate) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        const filter = v => {
            v.value = v.value.filter(predicate)
            return v
        }

        return TMonadUpdate(Pipe(
            ToArray,
            StopIfInvalid,
            filter
        )(result), `array`, `Filter`)
    }
}