import { Get } from ".."
import { Tmonad } from "./t-monad"

const ToString = value => {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return Tmonad(value)
    }

    let result = Tmonad(value)

    try {
        result.value = result.value.toString()
    } catch (error) { }

    result.valid = typeof result.value === `string`
    result.instanceof.push(`ToString`)
    return result
}

export default ToString