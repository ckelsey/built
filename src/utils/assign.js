import { PolyfillObjectAssign } from './polyfill-object-assign.js'

export function AssignObject() {
    PolyfillObjectAssign()
    return Object.assign.apply(null, arguments)
}