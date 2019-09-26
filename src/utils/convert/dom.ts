import { Tmonad } from './t-monad'
import Get from '../get'
import ToArray from '../../utils/convert/to_array'
import UseIf from './use_if'

export const IsElement = value => {
    const result = Tmonad(value)

    if (result.stop) {
        return result
    }

    result.valid = Get(result, `value.nodeType`) === 1

    result.instanceof.push(`IsElement`)

    return result
}

export const IsElementType = tag => value => {
    const result = Tmonad(value)

    if (result.stop) {
        return result
    }

    result.valid = Get(result, `value.tagName`, ``).toLowerCase() === tag.toLowerCase()

    result.instanceof.push(`IsElementType`)

    return result
}

export const SelectorToElement = (parent, value) => {
    const Value = Tmonad(value)

    if (Value.stop) {
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    if (Value.type === `string`) {
        Value.value = parent.querySelector(Value.value)
    }

    const result = IsElement(Value)

    result.instanceof.push(`SelectorToElement`)

    return result
}

export const SelectorArrayToElements = (parent, value) => {
    const Value = ToArray(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== `array`) {
        Value.instanceof.push(`SelectorArrayToElements`)
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    Value.value = Value.value.map(el =>
        UseIf(
            v => v.valid,
            () => ({ value: null }),
            SelectorToElement(null, el)
        ).value
    ).filter(v => !!v)

    Value.valid = Value.value.length

    Value.instanceof.push(`SelectorArrayToElements`)

    return Value
}

export const SelectorArrayToAllElements = (parent, value) => {
    const Value = ToArray(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== `array`) {
        Value.instanceof.push(`SelectorArrayToAllElements`)
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    Value.value = Value.value.map(el => {
        const values = UseIf(
            v => v.valid,
            () => ({ value: null }),
            SelectorToElements(null, el)
        ).value

        return values.value
    })
        .filter(v => !!v)

    Value.valid = Value.value.length

    Value.instanceof.push(`SelectorArrayToAllElements`)

    return Value
}

export const SelectorToElements = (parent, value) => {
    const result = Tmonad(value)

    if (result.stop) {
        return result
    }

    if (!parent) {
        parent = document.firstElementChild || document.documentElement
    }

    const isEl = IsElement(result)

    if (result.type === `string`) {
        result.value = Array.from(parent.querySelectorAll(result.value))
    } else if (isEl.valid) {
        result.value = [result.value]
    }

    result.valid = result.value.length && result.value.filter(e => IsElement(e).valid).length

    result.instanceof.push(`SelectorToElements`)

    return result
}
