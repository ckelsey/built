import { ToArray } from './to-array.js'
import { TMonad } from './t-monad.js'

export function IndexOf(array) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        let arr = ToArray(array)

        if (!arr.valid) {
            result.valid = false
            return result
        }

        result.valid = arr.value.indexOf(result.value) > -1
        return result
    }
}