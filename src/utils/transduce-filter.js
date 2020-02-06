export function TransduceFilter(predicateFunction) {
    return function TransduceFilterInner(nextReducer) {
        return function TransduceFilterInnerInner(result, current) {
            return predicateFunction(current) ?
                nextReducer(result, current) :
                result
        }
    }
}