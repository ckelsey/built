export function GetInputValue(input) {
    const type = input.type

    if (type === `checkbox` || type === `radio`) {
        return input[`checked`]
    }

    if (type === `select` && input[`selectedOptions`]) {
        const value = Array.from(input[`selectedOptions`])
            .map(o => o.value)

        if (value.length < 2) {
            return value[0]
        }

        return value
    }

    return input.value
}