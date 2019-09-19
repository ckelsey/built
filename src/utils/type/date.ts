export default (s: any): boolean => {
    let v = s

    try {
        v = new Date(Date.parse(s)) as any
    } catch (error) {
        return false
    }

    return (
        v !== `Invalid Date`
        && !isNaN(v)
        && v instanceof Date
    )
}