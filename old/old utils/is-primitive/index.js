const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`,
    `boolean`
]

export function IsPrimitive(value) {
    return primitives.indexOf(typeof value) > -1
}