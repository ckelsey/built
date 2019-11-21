import { Type } from '../..'

const mergeArray = (arr1, arr2) => {
    const result = arr1.slice(0)
    arr2.forEach((value, index) => result[index] = value)
    return result
}

const merge = (obj1, obj2) => {
    if (!obj1) {
        return Object.assign({}, obj2)
    }

    if (!obj2) {
        return Object.assign({}, obj1)
    }

    const type1 = Type(obj1)
    const type2 = Type(obj2)

    if (type1 !== type2 || [`array`, `object`].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === `array`) {
        return mergeArray(obj1, obj2)
    }

    const result = Object.assign({}, obj1)

    for (const key in obj2) {
        if (!obj2[key]) { continue }

        result[key] = merge(obj1[key], obj2[key])
    }

    return result
}

const mutateMergeArray = (arr1, arr2) => {
    arr2.forEach((value, index) => arr1[index] = value)
    return arr1
}

const mutateMerge = (obj1, obj2) => {
    if (!obj1) {
        return obj2
    }

    if (!obj2) {
        return obj1
    }

    const type1 = Type(obj1)
    const type2 = Type(obj2)

    if (type1 !== type2 || [`array`, `object`].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === `array`) {
        return mutateMergeArray(obj1, obj2)
    }

    for (const key in obj2) {
        if (!obj2[key]) { continue }

        obj1[key] = mutateMerge(obj1[key], obj2[key])
    }

    return obj1
}

export const Merge = (obj1, obj2, mutate = false) => !mutate ? merge(obj1, obj2) : mutateMerge(obj1, obj2)