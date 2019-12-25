import { TMonadUpdate, TMonad, FromEntities, Pipe, StopIfInvalid, ToString, FromURIComponent } from '..'

export function ToPlainText(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = Pipe(
            ToString,
            StopIfInvalid,
            FromURIComponent,
            FromEntities
        )(result)
    } else {
        result = Pipe(
            FromURIComponent,
            FromEntities
        )(result)
    }

    return TMonadUpdate(result, `string`, `ToPlainText`)
}