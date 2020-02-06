import { ToObject } from './to-object.js'

export function HasKeys(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        function compareFilter(v) {
            return keys.indexOf(v) > -1
        }

        result.valid = !keys.length && !compare.length
            ? true
            : keys.length && !compare.length
                ? false
                : compare.filter(compareFilter).length === compare.length

        return result
    }
} 