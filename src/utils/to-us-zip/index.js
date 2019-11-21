import { TMonad, Pipe, ToDigits, ToSplit, ToMap, ToJoin } from '../..'

export function ToUsZip(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const mapper = ToMap((val, index) => {
        if (index < 5 || (index > 5 && index < 9)) {
            return val
        }

        if (index === 5) {
            return `-${val}`
        }

        return ``
    })

    result = Pipe(
        ToDigits,
        ToSplit(``),
        mapper,
        ToJoin(``)
    )(result)

    result.valid = typeof result.value === `string` && (result.value.length === 5 || result.value.length === 10)
    result.instanceof.push(`ToUsZip`)
    return result
}