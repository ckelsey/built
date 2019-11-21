import { TMonad, Pipe, ToSplit, ToMap, ToPlainText, ToTrim } from '../..'

export function CommasToArray(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === `array`) {
        result.instanceof.push(`CommasToArray`)
        return result
    }

    if (result.type === `undefined`) {
        result.valid = false
        result.instanceof.push(`CommasToArray`)
        return result
    }

    const piped = Pipe(
        ToPlainText,
        ToSplit(`,`),
        ToMap(v => ToTrim(v).value)
    )(result)

    return piped
}