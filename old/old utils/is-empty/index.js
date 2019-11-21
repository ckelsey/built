export function IsEmpty(value) {
    return value === undefined ||
        value === null ||
        value === `` ||
        (Array.isArray(value) && value.length === 0) ||
        ((typeof value).indexOf(`object`) > -1 && Object.keys(value).length === 0) ||
        value === `false` ||
        value === `undefined` ||
        value === `null`
}