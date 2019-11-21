import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import Map from './map'
import IfInvalid from './if_invalid'
import CommasToArray from './commas-to-array'

export const Options = (value: any) => {
    let result = Tmonad(value)

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