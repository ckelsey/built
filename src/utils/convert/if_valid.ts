import { Tmonad } from "./t-monad"

const IfValid = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfValid`)

    if (result.stop || !result.valid) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export default IfValid