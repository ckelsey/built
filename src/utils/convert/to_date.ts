import { Tmonad } from './t-monad'
import { Type } from '../type'

const ToDate = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.instanceof[result.instanceof.length] === `DateToObject`) {
        result.value = result.value.date
    }

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
    result.instanceof.push(`ToDate`)

    return result
}

export default ToDate