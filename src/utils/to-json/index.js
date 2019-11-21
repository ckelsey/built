import { Type, FromJSON } from '../..'

export function ToJSON(value) {
    const result = FromJSON(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.stringify(result.value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)
    result.instanceof.push(`ToJSON`)
    return result
}