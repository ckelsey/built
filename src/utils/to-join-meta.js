export function ToJoinMeta(array, delimeter) {
    const result = {
        value: array,
        stringChanges: []
    }

    if (!delimeter) {
        result.value = result.value.join(delimeter)
        return result
    }

    try {
        let index = 1
        let joinedValue = result.value[index] || ''

        while (index < result.value.length) {
            result.stringChanges.push({
                start: joinedValue.length,
                end: joinedValue.length + delimeter.length,
                input: result.value[index],
                length: delimeter.length,
                result: '',
                added: delimeter
            })
            joinedValue = ''.concat(joinedValue, delimeter, result.value[index])
            index = index + 1
        }

        result.value = joinedValue

    } catch (error) { }

    return result
}