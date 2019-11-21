function Curry(func: () => any, cachedArgs: any[] = []) {

    return (...args) => {

        cachedArgs = cachedArgs.concat(...args)

        if (cachedArgs.length >= func.length) {
            return func.apply(this, cachedArgs)

        } else {

            return Curry(func, cachedArgs)
        }
    }

}

export default Curry