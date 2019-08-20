import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { Split, ToPlainText } from './string'
import { IfInvalid } from './if'
import { ToArray } from './array'

export const CommasToArray = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    return finishTMonad(pipe(
        ToArray,
        IfInvalid(pipe(
            ToPlainText,
            Split(`,`)
        )(result))
    )(result), `array`, `CommasToArray`)
}