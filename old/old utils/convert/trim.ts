import { Get } from ".."
import { Tmonad } from "./t-monad"

const Trim = value => {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return Tmonad(value)
    }

    let result = Tmonad(value)

    try {
        result.value = result.value.trim()
    } catch (error) { }

    result.instanceof.push(`Trim`)
    return result
}

export default Trim