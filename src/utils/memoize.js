import { ArrayFrom } from './array-from.js'

const cache = new WeakMap()

export function Memoize(fn) {

    return function MemoizeInner() {
        const obj = { fn: fn, args: ArrayFrom(arguments).value }
        const cached = cache.get(obj)

        console.log(cached, obj)

        if (cached) {
            return cached
        }

        const result = fn.apply(fn, obj.args)
        cache.set(obj, result)
        return result

    }
}