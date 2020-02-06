import { TMonad } from './t-monad.js'
import { IsElement } from './is-element.js'
import { ArrayFrom } from './array-from.js'

export function SelectorToElements(parent, value) {
    const result = TMonad(value)

    if (result.stop) {
        return result
    }

    if (!parent) {
        parent = document.firstElementChild || document.documentElement
    }

    const isEl = IsElement(result)

    if (result.type === 'string') {
        result.value = ArrayFrom(parent.querySelectorAll(result.value))
    } else if (isEl.valid) {
        result.value = [result.value]
    }

    function filterValue(e) {
        return IsElement(e).valid
    }

    result.valid = result.value && result.value.length && result.value.filter(filterValue).length

    return result
}