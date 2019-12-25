import { TMonad, TMonadUpdate, Pipe, ToArray, StopIfInvalid } from '..'

export function ToFilter(predicate) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        const filter = v => {
            v.value = v.value.filter(predicate)
            return v
        }

        return TMonadUpdate(Pipe(
            ToArray,
            StopIfInvalid,
            filter
        )(result), `array`, `Filter`)
    }
}