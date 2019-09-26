import { Tmonad } from "./t-monad"

const StopIfInvalid = value => {
    const result = Tmonad(value)

    if (!result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfInvalid`)

    return result
}

export default StopIfInvalid