export function ReduceSplice(conversionFunction) {
    return function ReduceSpliceResult(result, current) {
        return result.slice(0).splice.apply(null, conversionFunction(current))
    }
}