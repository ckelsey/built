import { TMonad } from './t-monad.js'
import { ToMap } from './to-map.js'
import { Pipe } from './pipe.js'
import { ToDigits } from './to-digits.js'
import { ToSplit } from './to-split.js'
import { ToJoin } from './to-join.js'

export function ToUsZip(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const mapper = ToMap((val, index) => {
        if (index < 5 || (index > 5 && index < 9)) {
            return val
        }

        if (index === 5) {
            return `-${val}`
        }

        return ``
    })

    result = Pipe(
        ToDigits,
        ToSplit(``),
        mapper,
        ToJoin(``)
    )(result)

    result.valid = typeof result.value === `string` && (result.value.length === 5 || result.value.length === 10)
    return result
}