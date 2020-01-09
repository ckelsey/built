import { TMonad } from './t-monad.js'
import { Type } from './type.js'

export function ToDate(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    try {
        result.value = new Date(Date.parse(result.value))
    } catch (error) { }

    const isDate = (
        result.value !== `Invalid Date`
        && !isNaN(result.value)
        && result.value instanceof Date
    )

    result.type = isDate ? `date` : Type(result.value)
    result.valid = result.type === `date`
    return result
}