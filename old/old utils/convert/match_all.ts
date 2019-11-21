import { Tmonad } from "./t-monad"
import { MatchMeta } from "./meta"
import ToString from "./to_string"

const MatchAll = search => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const matches = MatchMeta(result.value, search)

    result.value = matches.value
    result.valid = result.value.length > 0
    result.stringChanges = result.stringChanges.concat(matches.stringChanges)
    result.instanceof.push(`MatchAll`)
    return result
}

export default MatchAll