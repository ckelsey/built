import { TMonad } from './t-monad.js'

export function IfIs(compare, replace) {
    return function (value) {
        let result = TMonad(value)
        compare = TMonad(compare)

        result.valid = result.value === compare.value

        if (result.value === compare.value) {
            result.value = TMonad(replace).value
            result = TMonad(result.value)
        }

        return result
    }
}
