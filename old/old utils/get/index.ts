const Get = (
    el: any = {},
    path: string = ``,
    emptyVal: any = undefined,
    conditionFn = v => v
) => {
    if (!el) {
        return emptyVal
    }

    let Path = [el]

    if (path && path.toString().split) {
        Path = [el].concat(path.toString().split(`.`))
    }

    const result = Path.reduce((accumulator, currentValue) => {
        if (accumulator === undefined || accumulator === null) {
            return emptyVal
        }

        if (currentValue.indexOf(`.`) === -1 && currentValue.indexOf(`(`) > -1) {
            const reg = /\((.*?)\)/g.exec(currentValue)
            const argsString = reg ? reg[1] : ``
            const args = argsString.split(`,`).map((arg) => arg.trim())
            const functionName = currentValue.split(`(`)[0]

            if (typeof accumulator[functionName] === `function`) {
                return accumulator[functionName].apply(accumulator, args)
            }
        }

        if ((accumulator !== null && accumulator !== undefined) && currentValue) {
            return accumulator[currentValue]
        } else {
            return accumulator
        }

    })

    if (result === undefined || result === null) {
        return emptyVal
    }

    return conditionFn(result)
}

export default Get
