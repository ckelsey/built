import { ForEach } from './for-each'

/**
 * Performs a provided mapping operation to a provided collection. Intended to be used inconjunction with a transducer.
 * @function Map
 * @param {function() } mapFunction - The function to be called on every element, performs the mapping operation
 * @param {any[]} collection - The collection to iterate over
 * @return {any[]} Mapped collection
 * @example
 * Map(v=>v.toLowerCase(), ['A', 'B']) // ['a', 'b']
 * TODO - be able to take an object, Set, Weak map, etc
 */
export function Mapper(mapFunction, collection) {
    const result = []

    ForEach(
        function MapInner(item) { result.push(mapFunction(item)) },
        collection
    )

    return result
}