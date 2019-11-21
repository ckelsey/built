import { Tmonad } from "./t-monad"
import ToString from "./to_string"
import { MatchMeta } from "./meta"

const Match = search => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const matches = MatchMeta(result.value, search, true)

    result.value = matches.value
    result.valid = result.value.length === 1
    result.stringChanges = result.stringChanges.concat(matches.stringChanges)
    result.instanceof.push(`Match`)
    return result
}

export default Match