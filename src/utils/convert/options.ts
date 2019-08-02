import { TMonad } from '.'
import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { Map } from './array'
import { IfInvalid } from './if'
import { CommasToArray } from './commas-to-array'

export const Options: (v: any) => TMonad = (value: any) => {
    let result: TMonad = Tmonad(value)

    if (result.stop) { return result }

    const mapper = Map(value => {
        if (typeof value === `object` && value.hasOwnProperty(`value`)) {
            if (!value.hasOwnProperty(`label`)) {
                value.label = value.value
            }

            return value
        }

        return { value, label: value }
    })

    return finishTMonad(pipe(
        CommasToArray,
        IfInvalid([]),
        mapper
    )(result), `array`, `Options`)
}