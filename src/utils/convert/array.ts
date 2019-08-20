import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { FromJSON } from './json'
import { ToPlainText } from './string'
import { StopIfInvalid } from './if'
import { getType } from '../type'
import { JoinMeta } from './meta'

export const ToArray = value => {
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

export const Join = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const resultingMeta = JoinMeta(result.value, delimeter)
    result.value = resultingMeta.value
    result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges)
    result.valid = typeof result.value === `string`
    return finishTMonad(result, `string`, `Join`)
}

export const Map = fn => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const map = v => {
        if (getType(v.value) !== `array`) {
            v.valid = false
            return v
        }

        v.value = v.value.map(fn)
        return v
    }

    return finishTMonad(pipe(
        ToArray,
        StopIfInvalid,
        map
    )(result), `array`, `Map`)
}

export const Filter = predicate => value => {
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

export const IndexOf = array => value => {
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

export const Slice = (start, end) => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    try {
        const v = result.value.slice()
        result.value = v.slice(start, end)

        if (typeof v === `string`) {
            if (start !== 0) {
                result.stringChanges.push({
                    start: 0,
                    end: start,
                    input: v,
                    length: start,
                    result: v.slice(0, start),
                    removed: v.slice(0, start)
                })
            }

            if (end < v.length) {
                result.stringChanges.push({
                    start: end,
                    end: v.length,
                    input: v,
                    length: v.length - end,
                    result: v.slice(end),
                    removed: v.slice(end)
                })
            }
        }
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`Slice`)
    return result
}