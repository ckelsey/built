import { Tmonad } from './t-monad'
import { empty } from '../type'

export const IfInvalid = newValue => value => {
    const result = Tmonad(value)

    if (result.stop || result.valid) { return result }

    result.instanceof.push(`IfInvalid`)

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const IfValid = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfValid`)

    if (result.stop || !result.valid) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const IfEmpty = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfEmpty`)

    if (result.stop || empty(result.value)) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const IfNotEmpty = newValue => value => {
    const result = Tmonad(value)

    result.instanceof.push(`IfNotEmpty`)

    if (result.stop || !empty(result.value)) { return result }

    return Object.assign(
        {},
        Tmonad(newValue),
        { instanceof: result.instanceof.concat([`T`]) }
    )
}

export const StopIfInvalid = value => {
    const result = Tmonad(value)

    if (!result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfInvalid`)

    return result
}

export const StopIfValid = value => {
    const result = Tmonad(value)

    if (result.valid) {
        result.stop = true
    }

    result.instanceof.push(`StopIfValid`)

    return result
}

export const StopIfEmpty = value => {
    const result = Tmonad(value)

    if (empty(result.value)) {
        result.stop = true
    }

    result.instanceof.push(`StopIfEmpty`)

    return result
}

export const IfNot = (compare, replace) => value => {
    const result = Tmonad(value)
    compare = Tmonad(compare)

    result.valid = result.value === compare.value

    if (!result.valid) {
        const res = Tmonad(replace)
        res.instanceof.push(`IfNot`)
        return res
    }

    result.instanceof.push(`IfNot`)

    return result
}

export const IfIs = (compare, replace) => value => {
    let result = Tmonad(value)
    compare = Tmonad(compare)

    result.valid = result.value === compare.value

    if (result.value === compare.value) {
        result.value = Tmonad(replace).value
        result = Tmonad(result.value)
    }

    result.instanceof.push(`IfIs`)

    return result
}

export const UseIf = (condition, ifNot, value) => Tmonad(condition(value) ? value : ifNot(value))