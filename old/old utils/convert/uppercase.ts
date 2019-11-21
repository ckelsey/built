const UpperCase = string => {
    const result = string

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`UpperCase`)
    return result
}

export default UpperCase