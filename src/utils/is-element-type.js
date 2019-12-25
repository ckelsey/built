import { TMonad, Get } from '..'

export function IsElementType(tag) {
    return function (value) {
        const result = TMonad(value)

        if (result.stop) {
            return result
        }

        result.valid = Get(result, `value.tagName`, ``).toLowerCase() === tag.toLowerCase()
        return result
    }
}