import { isEmpty } from "../type"
import { Tmonad } from "./t-monad"

const StopIfEmpty = value => {
    const result = Tmonad(value)

    if (isEmpty(result.value)) {
        result.stop = true
    }

    result.instanceof.push(`StopIfEmpty`)

    return result
}

export default StopIfEmpty