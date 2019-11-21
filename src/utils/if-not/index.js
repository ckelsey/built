import { TMonad } from "../.."

export function IfNot(compare, replace) {
    return function (value) {
        const result = TMonad(value)
        compare = TMonad(compare)

        result.valid = result.value === compare.value

        if (!result.valid) {
            const res = TMonad(replace)
            res.instanceof.push(`IfNot`)
            return res
        }

        result.instanceof.push(`IfNot`)

        return result
    }
}