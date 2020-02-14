import { ForEach } from './for-each.js'
import { ForIn } from './for-in.js'

export function ObjectAssign() {
    let target

    ForEach(function (obj, index) {
        if (!index) { return target = obj }
        ForIn(function (value, prop) { target[prop] = value }, obj)
    }, arguments)

    return target
}