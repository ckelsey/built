import { Tmonad } from './t-monad'
import { TMonad } from '.'
import { getType, empty } from '../type'

export const ToNumber: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type === `string` && !empty(result.value)) {
        result.value = parseFloat(
            result
                .value
                .replace(/[^0-9,.]+/g, ``)
        )
    }

    result.type = getType(result.value)
    result.instanceof.push(`ToNumber`)
    result.valid = !isNaN(result.value)

    return result
}