const cache = new WeakMap()

export function Memoize(fn) {

    return function MemoizeInner() {
        const obj = { fn: fn, args: Array.from(arguments).value }
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