import { TMonad, Type, IsEmpty } from '../..'

export function ToNumber(value) {
    const result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === `string` && !IsEmpty(result.value)) {
        result.value = parseFloat(result.value)
    }

    result.type = Type(result.value)
    result.instanceof.push(`ToNumber`)
    result.valid = !isNaN(result.value)

    return result
}