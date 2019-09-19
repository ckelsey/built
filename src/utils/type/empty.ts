import get from './get'

export default (val: any): boolean => {
    const type = get(val)
    return val === `` || type === `undefined` || type === undefined || type === null || (type === `array` && val.length === 0) || (type === `object` && Object.keys(val).length === 0)
}