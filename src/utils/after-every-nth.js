import { TMonad, ToString, Pipe, ToSplit, ToJoin, ToMap } from '..'

export function AfterEveryNth(nth, insert) {
    return function (value) {
        let result = TMonad(value)
        let pointer = 0
        const changes = []

        if (result.stop) { return result }

        if (result.type !== `string`) { result = ToString(result) }

        const mapper = ToMap((val, index) => {
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

        const r = Pipe(
            ToSplit(``),
            mapper,
            ToJoin(``),
        )(result)

        r.stringChanges = r.stringChanges.concat(changes)
        r.valid = typeof r.value === `string` && r.value.length === 14
        return r
    }
}