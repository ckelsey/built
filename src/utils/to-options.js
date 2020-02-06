import { TMonad } from './t-monad.js'
import { TMonadUpdate } from './t-monad-update.js'
import { ToMap } from './to-map.js'
import { Pipe } from './pipe.js'
import { CommasToArray } from './commas-to-array.js'
import { IfInvalid } from './if-invalid.js'

export function ToOptions(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    function mapper(value) {
        if (typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'value')) {
            if (!Object.prototype.hasOwnProperty.call(value, 'label')) {
                value.label = value.value
            }

            return value
        }

        return { value: value, label: value }
    }

    return TMonadUpdate(Pipe(
        CommasToArray,
        IfInvalid([]),
        ToMap(mapper)
    )(result), 'array', 'Options')
}