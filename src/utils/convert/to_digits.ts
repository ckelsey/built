import { Tmonad } from './t-monad'
import { Type } from '../type'
import { RemoveMeta } from './meta'
import ToString from './to_string'

const ToDigits = value => {
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

    result.type = Type(result.value)
    result.instanceof.push(`ToDigits`)

    return result
}

export default ToDigits