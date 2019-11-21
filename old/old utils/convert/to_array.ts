import { Tmonad } from './t-monad'
import pipe from '../pipe'
import ToPlainText from './to_plain_text'
import { Type } from '../_type'
import FromJSON from './from_json'

const ToArray = value => {
    const temp = Tmonad(value)
    if (temp.stop) { return value }

    const result = Array.isArray(temp.value)
        ? temp
        : typeof temp.value === `string`
            ? pipe(ToPlainText, FromJSON)(temp)
            : temp

    result.type = Type(result.value)
    result.valid = result.type === `array`
    result.instanceof.push(`ToArray`)
    return result
}

export default ToArray