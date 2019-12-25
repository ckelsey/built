import { ToObject } from '..'

export function HasKeys(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        result.valid = !keys.length && !compare.length
            ? true
            : keys.length && !compare.length
                ? false
                : compare.filter(v => keys.indexOf(v) > -1).length === compare.length

        return result
    }
} 