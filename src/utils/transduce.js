import { ForEach } from './for-each.js'
import { Pipe } from './pipe.js'

export function Transduce() {
    let results
    const piper = Pipe.apply(null, arguments)

    return function (collection, initial, reducer) {
        results = initial || []

        ForEach(function TransduceInner(item) {
            const result = piper(item, results)

            if (result === undefined) { return }

            if (typeof reducer === 'function') {
                results = reducer(results, result)
                return
            }

            results.push(result)

        }, collection)

        return results
    }
}

/*
function add(current){
    return 1 + current
}

function multiply(current){
    return 4 * current
}

function filter(current){
    return current > 10 ? current : undefined
}

function divide(current){
    if(current === undefined){return current}
    return current / 2
}

var t = Transduce(add, multiply, filter, divide)([1,2,3], 1, function(target, current){return target+current})

*/