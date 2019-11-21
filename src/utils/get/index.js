/**
 * Searches any type of item down a provided path, returning an emptyVal if provided. Also has the ability to perform a function on the end result
 * @function Get
 * 
 * @param {any} obj - The item to search. Can really be anything, as Get will call methods if provided
 * 
 * @param {string} path - The path chain to follow. Must be dot(.) seperated. Array indice should be dot as well. 
 * Can have methods, but arguments can only be strings, numbers, or booleans.
 * 
 * @param {any} emptyVal - If nothing resulted in the search, return this
 * 
 * @param {function()} modifyFn - A function that will be run to modify the returned result
 * 
 * @return {any} Either the found item or the emptyVal if provided
 * 
 * @example 
 * const obj = {
 *      a:{
 *          b:[
 *              `C`
 *          ]
 *      }
 * }
 * 
 * Get(obj, `a.b.0.toLowerCase()`) // `c`
 */

export function Get(obj, path, emptyVal, modifyFn = v => v) {
    /** If nothing to search, return */
    if (!obj) { return emptyVal }

    /** The search array, initial search item being the source */
    let Path = [obj]

    /** Populate the search array */
    if (path && path.toString().split) {
        Path = [obj].concat(path.toString().split(`.`))
    }

    const result = Path.reduce((accumulator, currentValue) => {

        /** If through reduce, accumulator comes out empty, stop */
        if (accumulator === undefined || accumulator === null) {
            return emptyVal
        }

        /** If a function, call it */
        if (currentValue.indexOf(`.`) === -1 && currentValue.indexOf(`(`) > -1) {
            const reg = /\((.*?)\)/g.exec(currentValue)
            const argsString = reg[1]
            const args = argsString.split(`,`).map(arg => !isNaN(arg) ? parseFloat(arg) : arg.trim())
            const functionName = currentValue.split(`(`)[0]

            if (typeof accumulator[functionName] === `function`) {
                return accumulator[functionName].apply(accumulator, args)
            }
        }

        return accumulator[currentValue]

    })

    /** If nothing was found return emptyVal */
    if (result === undefined || result === null) { return emptyVal }

    return modifyFn(result)
}