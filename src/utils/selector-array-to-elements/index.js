import { ToArray, UseIf, SelectorToElement } from '../..'

export function SelectorArrayToElements(parent, value) {
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