import { Tmonad } from './t-monad'
import Get from '../get'

export const IsElement = value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    result.valid = Get(result, `value.nodeType`) === 1

    result.instanceof.push(`IsElement`)

    return result
}

export const IsElementType = tag => value => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    result.valid = Get(result, `value.tagName`, ``).toLowerCase() === tag.toLowerCase()

    result.instanceof.push(`IsElementType`)

    return result
}