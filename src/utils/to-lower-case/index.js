export function ToLowerCase(string) {
    const result = string

    try {
        result.value = result.value.toLowerCase()
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`LowerCase`)
    return result
}