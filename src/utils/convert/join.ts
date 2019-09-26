import { Tmonad, finishTMonad } from './t-monad'
import { JoinMeta } from './meta'

const Join = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    const resultingMeta = JoinMeta(result.value, delimeter)
    result.value = resultingMeta.value
    result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges)
    result.valid = typeof result.value === `string`
    return finishTMonad(result, `string`, `Join`)
}

export default Join