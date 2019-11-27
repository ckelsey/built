import { TMonad, Pipe, ToSplit, ToMap, ToPlainText, ToTrim } from '../..'

export function CommasToArray(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === `array`) {
        return result
    }

    if (result.type === `undefined`) {
        result.valid = false
        return result
    }

    const piped = Pipe(
        ToPlainText,
        ToSplit(`,`),
        ToMap(v => ToTrim(v).value)
    )(result)

    return piped
}