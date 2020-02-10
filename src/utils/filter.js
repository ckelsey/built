import { ForEach } from './for-each'

export function Filter(conditionFunction, collection, reverseOrder) {
    const result = []

    ForEach(
        function FilterInner(item) {
            if (conditionFunction(item)) {
                result.push(item)
            }
        },
        collection,
        reverseOrder
    )

    return result
}