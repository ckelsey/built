export const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`
]
export const isDom = (s:any) => (s instanceof Element) || (s instanceof Node)
export const isString = (s:any) => typeof s === `string`
export const isPrimitive = (s: any): boolean => primitives.indexOf(typeof s) > -1
export const isArray = (s: any): boolean => Array.isArray(s)
export const isDate = (s: any): boolean => {
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
export const isObject = (s: any): boolean => (typeof s).indexOf(`object`) > -1
export const empty = (val: any): boolean => {
    const type = getType(val)
    return val === `` || type === `undefined` || type === undefined || type === null || (type === `array` && val.length === 0) || (type === `object` && Object.keys(val).length === 0)
}
export const anyEmpty = (val: any) => empty(val) || val === `false` || val === `undefined` || val === `null`
export const getType = (thing: any): string => thing === null ? null : isPrimitive(thing) ? typeof thing : isArray(thing) ? `array` : isDate(thing) ? `date` : isObject(thing) ? `object` : typeof thing
