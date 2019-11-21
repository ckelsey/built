import { TMonad, Get } from '../..'

export function IsElement(value) {
    const result = TMonad(value)

    if (result.stop) {
        return result
    }

    result.valid = Get(result, `value.nodeType`) === 1

    result.instanceof.push(`IsElement`)

    return result
}