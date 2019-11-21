export function ReduceMap(conversionFunction) {
    return function ReduceMapResult(result, current) {
        return result.concat([conversionFunction(current)])
    }
}