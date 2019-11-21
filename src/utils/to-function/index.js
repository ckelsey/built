import { TMonad, TMonadUpdate } from '../../index'

export function ToFunction(value) {
    const result = TMonad(value)
    if (result.stop) { return result }

    return TMonadUpdate(result, `function`, `ToFunction`)
}