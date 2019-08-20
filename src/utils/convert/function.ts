import { Tmonad } from './t-monad'

export const ToFunction = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `function`) {
        result.valid = false
    }

    result.instanceof.push(`ToFunction`)

    return result
}