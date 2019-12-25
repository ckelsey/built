import { TMonad, FromJSON, Type, FromEntities, FromURIComponent, Pipe } from '..'

export const ToObject = value => {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type === `string`) {
        result = Pipe(
            FromURIComponent,
            FromEntities,
            FromJSON
        )(result)
    }

    result.valid = Type(result.value) === `object`
    return result
}