import { TMonad, TMonadUpdate, Pipe, StopIfInvalid, Type, ToArray } from '..'

export function ToMap(fn) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        const map = v => {
            if (Type(v.value) !== `array`) {
                v.valid = false
                return v
            }

            v.value = v.value.map(fn)
            return v
        }

        return TMonadUpdate(Pipe(
            ToArray,
            StopIfInvalid,
            map
        )(result), `array`, `Map`)
    }
}