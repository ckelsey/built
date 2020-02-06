import { TMonad } from './t-monad.js'
import { Pipe } from './pipe.js'
import { ToPlainText } from './to-plain-text.js'
import { ToSplit } from './to-split.js'
import { ToMap } from './to-map.js'
import { ToTrim } from './to-trim.js'

function trim(el) {
    return ToTrim(el).value
}

export function CommasToArray(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === 'array') {
        return result
    }

    if (result.type === 'undefined') {
        result.valid = false
        return result
    }

    const piped = Pipe(
        ToPlainText,
        ToSplit(','),
        ToMap(trim)
    )(result)

    return piped
}