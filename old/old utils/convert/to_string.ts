import { Get } from ".."
import { Tmonad } from "./t-monad"
import { Type } from "../type"

const ToString = value => {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return Tmonad(value)
    }

    let result = Tmonad(value)

    try {
        if (!!result.value || result.value === ``) {
            result.value = result.value.toString()
            result.valid = typeof result.value === `string`
        } else {
            result.value = ``
            result.valid = false
        }
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)
    result.instanceof.push(`ToString`)
    return result
}

export default ToString