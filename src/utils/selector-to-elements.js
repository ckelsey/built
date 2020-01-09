import { TMonad } from './t-monad.js'
import { IsElement } from './is-element.js'

export function SelectorToElements(parent, value) {
    const result = TMonad(value)

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

    return result
}