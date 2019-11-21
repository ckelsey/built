import { TMonad, Type } from '../..'

export function ToDate(value) {
    let result = TMonad(value)

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