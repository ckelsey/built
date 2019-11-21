import { Tmonad } from './t-monad'
import { Type } from '../type'

const ToBool = value => {
    const result = Tmonad(value)

    if (result.stop) {
        return result
    }

    switch (result.value) {
        case `0`:
        case 0:
        case `off`:
        case `false`:
        case false:
            result.value = false
            result.valid = true
            break;

        case `1`:
        case 1:
        case `on`:
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

    result.type = Type(result.value)
    result.instanceof.push(`ToBool`)
    return result
}

export default ToBool