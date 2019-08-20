import { Tmonad } from './t-monad'
import pipe from '../pipe'
import { ToDigits } from './number'
import { Split } from './string'
import { Map, Join } from './array'

export const ToPhone = value => {
    let result = Tmonad(value)
    let pointer = 0
    const changes = []

    if (result.stop) { return result }

    const mapper = Map((val, index) => {
        const length = `${result.value || ``}`.length
        let mapped = ``

        if (index === 0) {
            mapped = !!length ? `(${val}` : val
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                added: `(`
            })
            pointer = pointer + 2
        }

        if (index === 3) {
            mapped = length > 4 ? `) ${val}` : val
            changes.push({
                start: pointer,
                end: pointer + 2,
                input: val,
                length: 2,
                result: mapped,
                added: `) `
            })
            pointer = pointer + 3
        }

        if (index === 6) {
            mapped = length > 9 ? `-${val}` : val
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                added: `-`
            })
            pointer = pointer + 2
        }

        if ([9, 8, 7, 5, 4, 2, 1].indexOf(index) > -1) {
            mapped = val
            pointer = pointer + 1
        }

        if (index > 9) {
            mapped = ``
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                removed: val
            })
            pointer = pointer + 1
        }

        return mapped
    })

    const r = pipe(
        ToDigits,
        Split(``),
        mapper,
        Join(``),
    )(result)

    r.stringChanges = r.stringChanges.concat(changes)
    r.valid = typeof r.value === `string` && r.value.length === 14
    r.instanceof.push(`ToPhone`)
    return r
}