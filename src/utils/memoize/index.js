const cache = new WeakMap()

export function Memoize(fn) {

    return (...args) => {
        const obj = { fn, args: [...args] }
        const cached = cache.get(obj)

        console.log(cached, obj)

        if (cached) {
            return cached
        }

        const result = fn.apply(fn, obj.args)
        cache.set(obj, result)
        return result

        // const argArray = [...args]
        // const id = JSON.stringify(argArray)
        // const isCached = id in cache

        // function newOne() {
        //     cache.add = fn.apply(fn, argArray)
        //     return cache[id]
        // }


        // console.log(isCached, id)

        // return isCached ?
        //     cache[id] :
        //     newOne()


    }
}

// export function Memoize() {
//     const cache = {}

//     function cacheHandler(fn) {
//         return function () {
//             const id = JSON.stringify(arguments)
//             if (cache[id]) { return cache[id] }

//             cache[id] = fn.apply(this, arguments)
//             return cache[id]
//         }
//     }

//     return {
//         go(fn) { return cacheHandler(fn) },

//         get cached() { return cache }
//     }
// }