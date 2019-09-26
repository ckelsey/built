import { Tmonad } from './t-monad'
import pipe from '../pipe'
import { ToDigits } from './number'
import Split from './split'
import Map from './map'
import Join from './join'

export const ToUsZip = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const mapper = Map((val, index) => {
        if (index < 5 || (index > 5 && index < 9)) {
            return val
        }

        if (index === 5) {
            return `-${val}`
        }

        return ``
    })

    result = pipe(
        ToDigits,
        Split(``),
        mapper,
        Join(``)
    )(result)

    result.valid = typeof result.value === `string` && (result.value.length === 5 || result.value.length === 10)
    result.instanceof.push(`ToUsZip`)
    return result
}