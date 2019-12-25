export function TransduceFilter(predicateFunction) {
    return nextReducer => (result, current) => predicateFunction(current) ?
        nextReducer(result, current) :
        result
}