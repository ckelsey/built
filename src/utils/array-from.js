import { PolyfillArrayFrom } from './polyfill-array-from.js'

export function ArrayFrom(el) {
    PolyfillArrayFrom()
    return Array.from(el)
}