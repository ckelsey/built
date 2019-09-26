import { Tmonad } from './t-monad'
import pipe from '../pipe'
import ToPlainText from './to_plain_text'
import UseIf from './use_if'
import { Type } from '../type'
import FromJSON from './from_json'

const ToArray = value => {
    const temp = Tmonad(value)
    if (temp.stop) { return value }

    const result = Array.isArray(temp.value)
        ? temp
        : UseIf(
            V => V.type === `array`,
            V => V,
            pipe(ToPlainText, FromJSON)(value)
        )

    result.type = Type(result.value)
    result.valid = result.type === `array`
    result.instanceof.push(`ToArray`)
    return result
}

export default ToArray