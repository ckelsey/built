export function TransduceMap(conversionFunction) {
    return nextReducer => (result, current) => nextReducer(result, conversionFunction(current))
}