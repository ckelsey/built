import { Tmonad } from "./t-monad"

const IfNot = (compare, replace) => value => {
    const result = Tmonad(value)
    compare = Tmonad(compare)

    result.valid = result.value === compare.value

    if (!result.valid) {
        const res = Tmonad(replace)
        res.instanceof.push(`IfNot`)
        return res
    }

    result.instanceof.push(`IfNot`)

    return result
}

export default IfNot