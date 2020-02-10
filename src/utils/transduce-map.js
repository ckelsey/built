export function TransduceMap(conversionFunction) {
    return function TransduceMapInner(reduceFunction) {
        return function TransduceMapInnerInner(result, current) {
            return reduceFunction(result, conversionFunction(current))
        }
    }
}