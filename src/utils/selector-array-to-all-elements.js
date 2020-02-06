import { ToArray } from './to-array.js'
import { UseIf } from './use-if.js'
import { SelectorToElements } from './selector-to-elements.js'

export function SelectorArrayToAllElements(parent, value) {
    const Value = ToArray(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== 'array') {
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    function valid(v) {
        return v.valid
    }

    function valueObj() {
        return { value: null }
    }

    function valueMapper(el) {
        return UseIf(valid, valueObj, SelectorToElements(null, el)).value
    }

    function valueFilter(v) {
        return !!v
    }

    Value.value = Value.value.map(valueMapper).filter(valueFilter)
    Value.valid = Value.value.length
    return Value
}