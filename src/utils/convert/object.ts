import { Tmonad } from './t-monad'
import pipe from '../pipe'
import { DecodeUriComponent } from './uri'
import { FromEntities } from './entities'
import { FromJSON } from './json'
import { getType } from '../type'

export const ToObject = value => {
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

export const KeysAre = compare => value => {
    let result = pipe(
        Tmonad,
        ToObject
    )(value)

    if (result.stop) { return result }

    result.instanceof.push(`ToObject`)

    if (!result.valid) { return result }

    const keys = Object.keys(result.value)

    result.valid = keys.length === 0 ? true : keys.filter(v => getType(v) === compare).length > 0

    return result
}