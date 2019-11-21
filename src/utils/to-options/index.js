import { TMonad, TMonadUpdate, Pipe, ToMap, IfInvalid, CommasToArray } from '../..'

export function ToOptions(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const mapper = ToMap(value => {
        if (typeof value === `object` && Object.prototype.hasOwnProperty.call(value, `value`)) {
            if (!Object.prototype.hasOwnProperty.call(value, `label`)) {
                value.label = value.value
            }

            return value
        }

        return { value, label: value }
    })

    return TMonadUpdate(Pipe(
        CommasToArray,
        IfInvalid([]),
        mapper
    )(result), `array`, `Options`)
}