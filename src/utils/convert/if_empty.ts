import { isEmpty } from "../type"
import { Tmonad } from "./t-monad"

const IfEmpty = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfEmpty`)

    if (result.stop || isEmpty(result.value)) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export default IfEmpty