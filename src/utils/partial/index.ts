import pipe from '../pipe'

const Partial = (func, args = []) => {

    const formatArgs = (Args: any): any => {
        const formattedArgs = []
        let index = 0

        while (index < Args.length) {
            formattedArgs.push(Args[index])
            index = index + 1
        }

        return formattedArgs
    }

    const returned = {
        set(arg, index?) {
            let proxy

            if (index === undefined) {
                proxy = formatArgs(args).concat(arg)
            } else {
                proxy = formatArgs(args).slice(0)
                proxy[index] = arg
            }

            return Partial(func, proxy)
        },

        tap(fn) {
            return Partial(
                fn(
                    pipe.apply(this, formatArgs(args))
                )
            )
        },

        pipe(x?) {
            const result = pipe.apply(this, formatArgs(args))

            return (typeof result === `function`) ? result(x) : result
        },

        curry(x?) {
            const proxy = formatArgs(args).slice(0)
            const len = proxy.length
            let index = 0
            let result

            while (index < len) {
                const arg = proxy[index]

                result = result === undefined ? func(arg) : result(arg)

                if (typeof result !== `function`) {
                    return result
                }

                index = index + 1
            }

            if (typeof result !== `function`) {
                return result
            }

            return result(x)
        },

        bind(This) {
            return Partial(func.bind(This), args)
        },

        apply(x) {
            console.log(x)
            return func.apply(null, formatArgs(args).concat(Array.isArray(x) ? x : [x]))
        },

        call: function (...x) {
            console.log(`call`, ...x)
            return func.call(null, ...formatArgs(args), ...x)
        }
    }

    return Object.defineProperties(returned, {
        func: {
            get: (): any => {
                return func
            }
        },

        args: {
            get: (): any[] => {
                return formatArgs(args)
            }
        },

        length: {
            get: (): number => {
                return formatArgs(args).length
            }
        },
    })
}

export default Partial
