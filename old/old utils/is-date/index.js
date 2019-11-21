export function IsDate(value) {
    let tempValue = value

    try {
        tempValue = new Date(Date.parse(value))
    } catch (error) {
        return false
    }

    return (
        tempValue !== `Invalid Date`
        && !isNaN(tempValue)
        && tempValue instanceof Date
    )
}