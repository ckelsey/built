import { Tmonad } from "./t-monad"
import Map from "./map"
import ToString from "./to_string"
import pipe from "../pipe"
import Split from "./split"
import { Join } from "."

export const AfterEveryNth = (nth, insert) => value => {
    let result = Tmonad(value)
    let pointer = 0
    const changes = []

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const mapper = Map((val, index) => {
        let mapped = ``

        if ((index + 1) % nth === 0 && index !== 0) {
            mapped = `${val}${insert}`
            changes.push({
                start: pointer,
                end: pointer + (1 + insert.length),
                input: val,
                length: 1 + insert.length,
                result: mapped,
                added: insert
            })
            pointer = pointer + insert.length
        } else {
            mapped = val
            pointer = pointer + 1
        }

        return mapped
    })

    const r = pipe(
        Split(``),
        mapper,
        Join(``),
    )(result)

    r.stringChanges = r.stringChanges.concat(changes)
    r.valid = typeof r.value === `string` && r.value.length === 14
    r.instanceof.push(`AfterEveryNth`)
    return r
}

export default AfterEveryNth