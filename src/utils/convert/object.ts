import { TMonad } from '.'
import { Tmonad } from './t-monad'
import pipe from '../pipe'
import { DecodeUriComponent } from './uri'
import { FromEntities } from './entities'
import { FromJSON } from './json'
import { getType } from '../type'

export const ToObject: (v: any) => TMonad = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type === `string`) {
        result = pipe(
            DecodeUriComponent,
            FromEntities,
            FromJSON
        )(result)
    }

    result.valid = getType(result.value) === `object`
    result.instanceof.push(`ToObject`)
    return result
}