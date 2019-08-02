import { TMonad } from '.'
import { Tmonad } from './t-monad'
import { getType } from '../type'

export const ToBool: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    switch (result.value) {
        case `0`:
        case 0:
        case `false`:
        case false:
            result.value = false
            result.valid = true
            break;

        case `1`:
        case 1:
        case `true`:
        case true:
            result.value = true
            result.valid = true
            break;

        default:
            result.value = false
            result.valid = false
            break;
    }

    result.type = getType(result.value)
    result.instanceof.push(`ToBool`)

    return result
}