import { Tmonad, finishTMonad } from "./t-monad"
import { ReplaceMeta } from "./meta"
import ToString from "./to_string"

const Replace = (search, replace) => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    try {
        const replaced = ReplaceMeta(result.value, search, replace)
        result.value = replaced.value
        result.valid = true
        result.stringChanges = result.stringChanges.concat(replaced.stringChanges)

    } catch (error) {
        result.valid = false
    }

    return finishTMonad(result, `string`, `Replace`)
}

export default Replace