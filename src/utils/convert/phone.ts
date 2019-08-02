import { TMonad } from '.'
import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { ToNumber } from './number'
import { ToString, Split } from './string'
import { Map, Join } from './array'

export const ToPhone: (v: any) => TMonad = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const mapper = Map((val, index) => {
        switch (index) {
            case 0:
                return result.value.length > 0 ? `+${val}` : val
            case 1:
                return result.value.length > 1 ? ` (${val}` : val
            case 3:
                return result.value.length > 4 ? `${val}) ` : val
            case 6:
                return result.value.length > 7 ? `${val}-` : val
            case 2:
            case 4:
            case 5:
            case 7:
            case 8:
            case 9:
            case 10:
                return val
            default:
                return ``
        }
    })

    result = pipe(
        ToNumber,
        ToString,
        Split(``),
        mapper,
        Join(``)
    )(result)

    return finishTMonad(result, `string`, `ToPhone`)
}