import { Type } from './type'
import FromJSON from './from-json'

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
    return result
}