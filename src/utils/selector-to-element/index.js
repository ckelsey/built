import { TMonad, IsElement } from '../..'

export function SelectorToElement(parent, value) {
    const Value = TMonad(value)

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