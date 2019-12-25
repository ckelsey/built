import { TMonad, Type } from '..'

export function ToBool(value) {
    const result = TMonad(value)

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
        break

    case `1`:
    case 1:
    case `on`:
    case `true`:
    case true:
        result.value = true
        result.valid = true
        break

    default:
        result.value = false
        result.valid = false
        break
    }

    result.type = Type(result.value)
    return result
}