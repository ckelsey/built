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

export const PartialFunction = (...args) =>
    ![...args][0]
        ? undefined
        : [...args][0].length === [...args].length - 1
            ? [...args][0].apply(null, [...args].slice(1))
            : (...newArgs) => PartialFunction(...args, ...newArgs)
