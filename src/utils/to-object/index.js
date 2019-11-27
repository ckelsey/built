import { TMonad } from '../..'
import { Pipe } from '../..'
import { FromURIComponent } from '../..'
import { FromEntities } from '../..'
import { Type } from '../..'
import { FromJSON } from '../..'

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