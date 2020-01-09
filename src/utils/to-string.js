import { Get } from './get.js'
import { TMonad } from './t-monad.js'
import { Type } from './type.js'

export function ToString(value) {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return TMonad(value)
    }

    let result = TMonad(value)

    try {
        if (!!result.value || result.value === ``) {
            result.value = result.value.toString()
            result.valid = typeof result.value === `string`
        } else {
            result.value = ``
            result.valid = false
        }
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)
    return result
}