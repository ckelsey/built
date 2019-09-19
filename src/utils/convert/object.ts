import { Tmonad } from './t-monad'
import pipe from '../pipe'
import { DecodeUriComponent } from './uri'
import { FromEntities } from './entities'
import { FromJSON } from './json'
import { Type } from '../type'

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

    result.valid = Type(result.value) === `object`
    result.instanceof.push(`ToObject`)
    return result
}

export const KeysAre = compare => value => {
    let result = ToObject(value)

    if (result.stop) { return result }

    result.instanceof.push(`KeysAre`)

    if (!result.valid) { return result }

    const keys = Object.keys(result.value)

    result.valid = keys.length === 0 ? true : keys.filter(v => Type(v) === compare).length > 0

    return result
}

export const HasKeys = compare => value => {
    let result = ToObject(value)

    if (result.stop) { return result }

    result.instanceof.push(`HasKeys`)

    if (!result.valid) { return result }

    const keys = Object.keys(result.value)

    result.valid = !keys.length && !compare.length
        ? true
        : keys.length && !compare.length
            ? false
            : keys.filter(v => compare.indexOf(v) > -1).length > 0

    return result
}