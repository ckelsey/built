import { TMonad } from './t-monad.js'
import { Type } from './type.js'
import { TMonadUpdate } from './t-monad-update.js'
import { ToArray } from './to-array.js'
import { StopIfInvalid } from './stop-if-invalid.js'
import { Pipe } from './pipe.js'

export function ToMap(fn) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        function map(v) {
            if (Type(v.value) !== 'array') {
                v.valid = false
                return v
            }

            v.value = v.value.map(fn)
            return v
        }

        return TMonadUpdate(Pipe(
            ToArray,
            StopIfInvalid,
            map
        )(result), 'array', 'Map')
    }
}