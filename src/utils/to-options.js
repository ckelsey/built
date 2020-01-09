import { TMonad } from './t-monad.js'
import { TMonadUpdate } from './t-monad-update.js'
import { Pipe } from './pipe.js'
import { CommasToArray } from './commas-to-array.js'
import { IfInvalid } from './if-invalid.js'
import { ToMap } from './to-map.js'

export function ToOptions(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const mapper = ToMap(value => {
        if (typeof value === `object` && Object.prototype.hasOwnProperty.call(value, `value`)) {
            if (!Object.prototype.hasOwnProperty.call(value, `label`)) {
                value.label = value.value
            }

            return value
        }

        return { value, label: value }
    })

    return TMonadUpdate(Pipe(
        CommasToArray,
        IfInvalid([]),
        mapper
    )(result), `array`, `Options`)
}