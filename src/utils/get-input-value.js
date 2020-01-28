export function GetInputValue(input) {
    if (!input) { return }

    const type = input.tagName.toLowerCase() === `select` ? `select` : input.type

    if (type === `checkbox` || type === `radio`) {
        return input.checked
    }

    if (type === `select`) {
        const vals = Array.from(input.selectedOptions).map(o => o.value)
        return vals.length > 1 ? vals : vals[0]
    }

    if (type === `select` && input.selectedOptions) {
        const value = Array.from(input.selectedOptions)
            .map(o => o.value)

        if (value.length < 2) {
            return value[0]
        }

        return value
    }

    if (type === `file`) {
        return Array.from(input.files)
    }

    return input.value
}