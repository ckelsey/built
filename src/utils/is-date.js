/**
 * Determines if a value is or can be a valid date
 * @function IsDate
 * @param {any} value - The value to test
 * @return (boolean) If the value is a valid date
 * @example 
 * IsDate(`Mon Nov 18 2019 07:41:48 GMT-0800`).value // true
 * IsDate(`Not a date`).value // false
 */

export function IsDate(value) {
    let tempValue = new Date(Date.parse(value))

    return (
        tempValue !== `Invalid Date`
        && !isNaN(tempValue)
        && tempValue instanceof Date
    )
}