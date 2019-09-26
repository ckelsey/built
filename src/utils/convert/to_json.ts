import { Type } from '../type'
import FromJSON from './from_json'

const ToJSON = value => {
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

export default ToJSON