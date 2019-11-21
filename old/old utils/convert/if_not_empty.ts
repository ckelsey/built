import { Tmonad } from "./t-monad"
import { isEmpty } from "../type"

const IfNotEmpty = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfNotEmpty`)

    if (result.stop || !isEmpty(result.value)) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export default IfNotEmpty