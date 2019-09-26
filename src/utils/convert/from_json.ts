import { Tmonad } from './t-monad'
import { Type } from '../type'
import { DecodeUriComponent } from './uri'

const FromJSON = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.parse(DecodeUriComponent(result.value).value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)
    result.instanceof.push(`FromJSON`)

    if ([`object`, `array`].indexOf(result.type) > -1) {
        result.valid = true
    }

    return result
}

export default FromJSON