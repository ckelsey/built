import { TMonadUpdate } from './t-monad-update.js'
import { TMonad } from './t-monad.js'
import { Pipe } from './pipe.js'
import { ToString } from './to-string.js'
import { StopIfInvalid } from './stop-if-invalid.js'
import { FromURIComponent } from './from-uri-component.js'
import { FromEntities } from './from-entities.js'

export function ToPlainText(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = Pipe(
            ToString,
            StopIfInvalid,
            FromURIComponent,
            FromEntities(value)
        )(result)
    } else {
        result = Pipe(
            FromURIComponent,
            FromEntities
        )(result)
    }

    return TMonadUpdate(result, `string`, `ToPlainText`)
}