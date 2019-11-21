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