import { ToObject, Type } from '..'

export function PropertiesAre(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        result.valid = keys.length === 0 ? true : keys.filter(v => Type(v) === compare).length > 0

        return result
    }
}