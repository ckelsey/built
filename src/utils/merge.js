import { Type } from './type.js'
import { AssignObject } from './assign.js'

function arrEach(result) {
    return function arrEachInner(value, index) {
        return result[index] = value
    }
}

function mergeArray(arr1, arr2) {
    const result = arr1.slice(0)
    const _arrEach = arrEach(result)

    arr2.forEach(_arrEach)

    return result
}

function merge(obj1, obj2) {
    if (!obj1) {
        return AssignObject({}, obj2)
    }

    if (!obj2) {
        return AssignObject({}, obj1)
    }

    const type1 = Type(obj1)
    const type2 = Type(obj2)

    if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === 'array') {
        return mergeArray(obj1, obj2)
    }

    const result = AssignObject({}, obj1)

    Object.keys(obj2).forEach(function (key) {
        if (!obj2[key]) { return }

        result[key] = merge(obj1[key], obj2[key])
    })

    return result
}

function mutateMergeArray(arr1, arr2) {
    const _arrEach = arrEach(arr1)
    arr2.forEach(_arrEach)
    return arr1
}

function mutateMerge(obj1, obj2) {
    if (!obj1) {
        return obj2
    }

    if (!obj2) {
        return obj1
    }

    const type1 = Type(obj1)
    const type2 = Type(obj2)

    if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === 'array') {
        return mutateMergeArray(obj1, obj2)
    }

    Object.keys(obj2).forEach(function (key) {
        if (!obj2[key]) { return }

        obj1[key] = mutateMerge(obj1[key], obj2[key])
    })

    return obj1
}

export function Merge(obj1, obj2, mutate) {
    mutate = mutate ? true : false
    return !mutate ? merge(obj1, obj2) : mutateMerge(obj1, obj2)
}