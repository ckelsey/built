import { Tmonad } from "./t-monad"

const Capitalize = string => {
    const result = Tmonad(string)

    try {
        result.value = `${result.value.slice(0, 1).toUpperCase()}${result.value.slice(1) || ``}`
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`Capitalize`)
    return result
}

export default Capitalize