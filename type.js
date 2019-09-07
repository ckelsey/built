const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`
]

const isPrimitive = (s) => primitives.indexOf(typeof s) > -1
const isArray = (s) => Array.isArray(s)
const isDate = (s) => {
    let v = s

    try
    {
        v = new Date(Date.parse(s))
    } catch (error)
    {
        return false
    }

    return (
        v !== `Invalid Date`
        && !isNaN(v)
        && v instanceof Date
    )
}
const isObject = (s) => (typeof s).indexOf(`object`) > -1

const getType = (thing) => thing === null
    ? `null`
    : isPrimitive(thing)
        ? typeof thing
        : isArray(thing)
            ? `array`
            : isDate(thing)
                ? `date`
                : isObject(thing)
                    ? `object`
                    : typeof thing

module.exports = getType