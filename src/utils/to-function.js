import { TMonad } from './t-monad.js'
import { TMonadUpdate } from './t-monad-update.js'

export function ToFunction(value) {
    const result = TMonad(value)
    if (result.stop) { return result }

    return TMonadUpdate(result, 'function', 'ToFunction')
}