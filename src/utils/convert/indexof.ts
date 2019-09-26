import { Tmonad } from './t-monad'
import ToArray from './to_array'

const IndexOf = array => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    let arr = ToArray(array)

    if (!arr.valid) {
        result.valid = false
        return result
    }

    result.valid = arr.value.indexOf(result.value) > -1
    result.instanceof.push(`IndexOf`)
    return result
}

export default IndexOf