import { Tmonad } from './t-monad'
import pipe from '../pipe'
import Split from './split'
import Map from './map'
import ToPlainText from './to_plain_text'
import Trim from './trim'

export const CommasToArray = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type === `array`) {
        result.instanceof.push(`CommasToArray`)
        return result
    }

    if (result.type === `undefined`) {
        result.valid = false
        result.instanceof.push(`CommasToArray`)
        return result
    }

    return pipe(
        ToPlainText,
        Split(`,`),
        Map(v => Trim(v).value)
    )(result)
}