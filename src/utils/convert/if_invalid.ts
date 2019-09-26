import { Tmonad } from "./t-monad"

const IfInvalid = newValue => value => {
    const result = Tmonad(value)

    if (result.stop || result.valid) { return result }

    result.instanceof.push(`IfInvalid`)

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export default IfInvalid