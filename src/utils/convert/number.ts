import { Tmonad } from './t-monad'
import { getType, empty } from '../type'
import { RemoveMeta } from './meta'
import { ToString } from './string';

export const ToNumber = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type === `string` && !empty(result.value)) {
        result.value = parseFloat(result.value)
    }

    result.type = getType(result.value)
    result.instanceof.push(`ToNumber`)
    result.valid = !isNaN(result.value)

    return result
}

export const ToDigits = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    try {
        const cleaned = RemoveMeta(result.value, /[^\d]+/g)
        result.stringChanges = result.stringChanges.concat(cleaned.stringChanges)
        result.value = cleaned.value.toString()
        result.valid = !!result.value
    } catch (error) {
        result.valid = false
    }

    result.type = getType(result.value)
    result.instanceof.push(`ToDigits`)

    return result
}