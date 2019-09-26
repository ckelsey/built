import { Tmonad } from "./t-monad"

const IfIs = (compare, replace) => value => {
    let result = Tmonad(value)
    compare = Tmonad(compare)

    result.valid = result.value === compare.value

    if (result.value === compare.value) {
        result.value = Tmonad(replace).value
        result = Tmonad(result.value)
    }

    result.instanceof.push(`IfIs`)

    return result
}

export default IfIs