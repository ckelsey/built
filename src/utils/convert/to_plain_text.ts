import { finishTMonad, Tmonad } from "./t-monad"
import { FromEntities } from "./entities"
import { DecodeUriComponent } from "./uri"
import pipe from "../pipe"
import StopIfInvalid from "./stop_if_invalid"
import ToString from "./to_string"

const ToPlainText = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = pipe(
            ToString,
            StopIfInvalid,
            DecodeUriComponent,
            FromEntities
        )(result)
    } else {
        result = pipe(
            DecodeUriComponent,
            FromEntities
        )(result)
    }

    return finishTMonad(result, `string`, `ToPlainText`)
}

export default ToPlainText