import { Tmonad } from './t-monad'
import { Type, isEmpty } from '../type'

const ToNumber = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type === `string` && !isEmpty(result.value)) {
        result.value = parseFloat(result.value)
    }

    result.type = Type(result.value)
    result.instanceof.push(`ToNumber`)
    result.valid = !isNaN(result.value)

    return result
}

export default ToNumber