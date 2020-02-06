export function TransduceMap(conversionFunction) {
    return function TransduceMapInner(nextReducer) {
        return function TransduceMapInnerInner(result, current) {
            return nextReducer(result, conversionFunction(current))
        }
    }
}