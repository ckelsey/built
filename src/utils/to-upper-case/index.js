export function ToUpperCase(string) {
    const result = string

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    return result
}