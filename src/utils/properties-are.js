import { ToObject } from './to-object.js'
import { Type } from './type.js'

export function PropertiesAre(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        function filter(v) {
            return Type(v) === compare
        }

        result.valid = keys.length === 0 ? true : keys.filter(filter).length > 0

        return result
    }
}