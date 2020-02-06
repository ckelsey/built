import { ArrayFrom } from './array-from.js'

export function GetInputValue(input) {
    if (!input) { return }

    const type = input.tagName.toLowerCase() === 'select' ? 'select' : input.type

    if (type === 'checkbox' || type === 'radio') {
        return input.checked
    }

    if (type === 'select') {
        return input.options[input.selectedIndex].value
    }

    if (type === 'file') {
        return ArrayFrom(input.files)
    }

    return input.value
}