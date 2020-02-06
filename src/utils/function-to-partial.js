import { ArrayFrom } from './array-from.js'

/**
 * Converts a function to a curried partial function. Arguments are added by calling the 
 * partial(no set arity) until all possible arguments are met, which then
 * calls the original function
 * 
 * @function FunctionToPartial
 * @param  {function()} function - The function to convert
 * @param  {?any} args - The arguments to prepopulate the curried version of the function
 * @return {function()} - A curried proxy of the passed in function
 * 
 * @example
 * const curried = FunctionToPartial( (a, b, c) => { console.log(a, b, c) })
 * curried('one') // proxy with argument 'a' populated with 'one'
 * curried('two') // proxy with argument 'b' populated with 'two'
 * curried('three') // 'one two three'
 */

export function FunctionToPartial() {
    const argArray = ArrayFrom(arguments)
    const fn = argArray.shift()

    /** If no function passed in, return */
    if (!fn) { return }

    /** If the passed in arguments equal the original functions arity, just call the function */
    if (argArray.length >= fn.length) {
        return fn.apply(fn, argArray)
    }

    /** return function that takes new arguments which then returns a new FunctionToPartial */
    return function () {
        return FunctionToPartial.apply(null, [fn].concat(argArray.concat(ArrayFrom(arguments))))
    }
}