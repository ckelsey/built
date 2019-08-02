import { Tmonad } from './t-monad'
import { TMonad } from '.'

export const ToFunction: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `function`) {
        result.valid = false
    }

    result.instanceof.push(`ToFunction`)

    return result
}