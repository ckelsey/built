import { ToArray } from './to-array.js'
import { UseIf } from './use-if.js'
import { SelectorToElement } from './selector-to-element.js'

export function SelectorArrayToElements(parent, value) {
    const Value = ToArray(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== `array`) {
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
    return Value
}