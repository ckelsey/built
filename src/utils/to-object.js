import { TMonad } from './t-monad.js'
import { Pipe } from './pipe.js'
import { FromURIComponent } from './from-uri-component.js'
import { FromEntities } from './from-entities.js'
import FromJSON from './from-json.js'
import { Type } from './type.js'

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