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
            const args = argsString.split(`,`).map(arg =>
                !isNaN(arg) ? parseFloat(arg) : arg.trim()
                // if has quotes -> string, no? -> number, obj, whatever
            )
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
