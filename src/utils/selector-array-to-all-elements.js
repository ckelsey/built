import { ToArray, UseIf, SelectorToElements } from '..'

export function SelectorArrayToAllElements(parent, value) {
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
    return Value
}