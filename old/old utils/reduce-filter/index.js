export function ReduceFilter(predicateFunction) {
    return function ReduceFilterResult(result, current) {
        return predicateFunction(current) ? result.concat([current]) : result
    }
}