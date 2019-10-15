const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`
]

const isPrimitive = (s: any): boolean => primitives.indexOf(typeof s) > -1

export default isPrimitive