/**
 * Takes a mapping function and returns a reducer
 * @function ReduceMap
 * @param {function( item:any ) :any } mapFunction - The function to be called on every element, performs the mapping operation
 * @return {function( accumulator:[], current:any ):[] } ReduceMapResult - The reducer function
 * @example 
 * ['A', 'B'].reduce(ReduceMap(mapFunction), []) // ['a', 'b',]
 */

export function ReduceMap(mapFunction) {
    return function ReduceMapResult(result, current) {
        return result.concat([mapFunction(current)])
    }
}