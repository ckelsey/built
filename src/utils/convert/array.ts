import { TMonad } from '.'
import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { FromJSON } from './json'
import { ToPlainText } from './string'
import { StopIfInvalid } from './if'

export const ToArray: (v: any) => TMonad = value => {
    let res = Tmonad(value)
    let result = {}

    if (res.stop) { return res }

    if (res.type === `string`) {
        result = pipe(
            ToPlainText,
            FromJSON
        )(res)
    } else {
        result = res
    }

    return finishTMonad(result, `array`, `ToArray`)
}

export const Join: (d: any) => (v: any) => TMonad = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    return finishTMonad(result.value.join(delimeter), `string`, `Join`)
}

export const Map: (f: (t: any, i?: number) => any) => (v: any) => TMonad = fn => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const map = v => {
        v.value = v.value.map(fn)
        return v
    }

    return finishTMonad(pipe(
        ToArray,
        StopIfInvalid,
        map
    )(result), `array`, `Map`)
}

export const Filter: (p: (t: any) => boolean) => (v: any) => TMonad = predicate => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const filter = v => {
        v.value = v.value.filter(predicate)
        return v
    }

    return finishTMonad(pipe(
        ToArray,
        StopIfInvalid,
        filter
    )(result), `array`, `Filter`)
}