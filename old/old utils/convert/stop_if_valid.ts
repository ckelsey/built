import { Tmonad } from "./t-monad"

const StopIfValid = value => {
    const result = Tmonad(value)

    if (result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfValid`)

    return result
}

export default StopIfValid