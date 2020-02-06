import { TMonad } from './t-monad.js'
import { Pipe } from './pipe.js'
import { ToPlainText } from './to-plain-text.js'
import FromJSON from './from-json.js'
import { Type } from './type.js'

export function ToArray(value) {
    const temp = TMonad(value)
    if (temp.stop) { return value }

    const result = Array.isArray(temp.value)
        ? temp
        : typeof temp.value === 'string'
            ? Pipe(ToPlainText, FromJSON)(temp)
            : temp

    result.type = Type(result.value)
    result.valid = result.type === 'array'
    return result
}