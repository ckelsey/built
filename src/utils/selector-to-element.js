import { TMonad } from './t-monad.js'
import { IsElement } from './is-element.js'

export function SelectorToElement(parent, value) {
    const Value = TMonad(value)

    if (Value.stop) {
        return Value
    }

    if (!parent || typeof parent.querySelector !== `function`) {
        parent = document.firstElementChild || document.documentElement.body || document.documentElement.firstElementChild
    }

    if (Value.type === `string`) {
        Value.value = parent.querySelector(Value.value)
    }

    const result = IsElement(Value)

    return result
}