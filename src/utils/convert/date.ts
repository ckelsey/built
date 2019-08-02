import { Tmonad } from './t-monad'
import { TMonad } from '.'
import { getType } from '../type'

export const ToDate: (v: any) => TMonad = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    try {
        result.value = new Date(Date.parse(result.value))
    } catch (error) { }

    const isDate = (
        result.value !== `Invalid Date`
        && !isNaN(result.value)
        && result.value instanceof Date
    )

    result.type = isDate ? `date` : getType(result.value)
    result.valid = result.type === `date`
    result.instanceof.push(`ToDate`)

    return result
}