import { Tmonad } from './t-monad'
import ToDigits from './to_digits'

const HasNonDigits = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    const digits = ToDigits(result)

    result.instanceof.push(`HasNonDigits`)
    result.valid = !!result.value && !!digits.value && result.value.length !== digits.value.length

    return result
}

export default HasNonDigits