import { FunctionToPartial } from '../function-to-partial'
import { Observer } from '../..'

/**
 * Gives functions super powers. Allows functions to be curried, passing in 
 * arguments one at a time, as well as remove or completely replace arguments.
 * Also has Observers to subscribe to for when arguments, curried version are
 * updated as well as when the function is called
 * 
 * @function SuperFunction
 * 
 * @param {function()} fn - The function to wrap
 * 
 * @param {any[]} args - Arguments to set, for currying
 * 
 * @param {?string} name - Name of the function, curried functions inherit this. 
 * Defaults to passed in function's name
 * 
 * @param {?number} length - Arity of function, curried functions inherit this. 
 * Defaults to passed in function's length
 * 
 * @property {string[]} args - Returns or sets the stored arguments
 * @property {boolean} complete - Returns true if the stored arguments length is that of the original functions argument length
 * @property {function} curried - Returns a new super copy of the function
 * @property {function(...args)} curry - Returns a copy of the current curried function, adding in any passed arguments
 * @property {function(arg)} pushArgument - Adds a new argument
 * @property {function()} popArgument - Removes the last argument
 * @property {function(property:string, next:function, error:function, complete:function)} subscribe - Subscribes to a state property observer, if it exists
 * 
 * @return {function()} A proxy version of the original function with the above properties/methods
 * 
 * @example
 * const wonderFunction = SuperFunction( (a, b, c) => `${a} | ${b} | ${c}` )
 * 
 * wonderFunction(`one`) // `one undefined undefined`
 * 
 * const curried = wonderFunction.curried
 * curried(`one`) // proxy with argument `a` populated with `one`
 * curried(`two`) // proxy with argument `b` populated with `two`
 * curried(`three`) // `one | two | three`
 * 
 * const curried2 = wonderFunction.curried
 * curried2.pushArgument(`Aquaman`) // (`Aquaman`, b, c) => `${a} | ${b} | ${c}`
 * 
 * const curried3 = curried2.curried
 * curried3.pushArgument(`Skateman`) // (`Aquaman`, `Skateman`, c) => `${a} | ${b} | ${c}`
 * curried3.length // 3
 * curried3.args // [`Aquaman`, `Skateman`]
 * curried3.complete // false
 * curried3.versions // [curried, curried2]
 * 
 * curried3.popArgument()
 * curried3.args // [`Aquaman`]
 * 
 * curried3.curry(`Krypto the Superdog`, `Arm Rip Off Boy`) // `Aquaman | Krypto the Superdog | Arm Rip Off Boy`
 * 
 * curried3.subscribe(`args`, console.log)
 * curried3.pushArgument(`Squirrel Girl`) 
 * // subscription triggered -> [`Aquaman`, `Squirrel Girl`]
 * 
 * curried3.subscribe(`call`, console.log)
 * curried3(`Razorback`)
 * // subscription triggered -> {
 * //   arguments:[
 * //       `Aquaman`, 
 * //       `Squirrel Girl`, 
 * //       `Razorback`
 * //   ], 
 * //   returned: `Aquaman | Squirrel Girl | Razorback`, 
 * //   self:curried3 
 * // }
 */

function SuperFunction(fn, args = [], name = fn ? fn.name : ``, length = fn ? fn.length : 0) {

    if (!fn) { return }

    /** State object, holds observers to subscribe to */
    const state = {
        curried: Observer([FunctionToPartial(fn)]),
        args: Observer([...args]),
        call: Observer({})
    }

    /** Gets last curried function */
    function currentCurry() { return state.curried.value[state.curried.value.length - 1] }


    /** Object to store a proxy of the passed in function. It's stored in an object so that properties like name and length can be set to the proxy */
    const result = {}

    /** Proxy, a function that wraps the original function, passing in the stored arguments and any arguments passed in */
    result[name] = function (...proxyArgs) {

        // concat the arguments, call the original function and store it's result
        const newArgs = state.args.value.concat(proxyArgs).slice(0, length)

        /** TODO - this is duplicate code, needs to be DRY but not sure how yet */
        const newResult = {}
        newResult[name] = fn.apply(result[name], newArgs)

        if (typeof newResult[name] === `function` && newResult[name].name === ``) {
            newResult[name] = SuperFunction(newResult[name], [], name, length)
        }

        // Triggers 'call' observer subscriptions
        state.call.next({
            arguments: newArgs,
            returned: newResult[name],
            self: result[name]
        })

        return newResult[name]
    }


    /** Define new properties for the proxy function */
    Object.defineProperties(result[name], {

        /** @prototype Inherit original function name */
        name: { value: name, },

        /** @prototype Inherit original function arity */
        length: { get() { return length } },

        /** @prototype Stored arguments */
        args: {
            get() { return state.args.value },

            /** Replaces all stored arguments and resets the curried versions */
            set(arg) {
                state.args.next(!Array.isArray(arg) ? [arg] : arg)
                state.curried.next([FunctionToPartial(fn)])
            }
        },

        /** Returns a new super copy of the function */
        curried: {
            get() {
                return SuperFunction(currentCurry(), state.args.value, name, length)
            }
        },

        /** Returns true if the stored arguments length is that of the original functions argument length */
        complete: {
            get() { return state.args.value.length === length }
        },

        isSuperFunction: { value: true }
    })


    /**
     * @prototype Adds a new argument to the end of the stored arguments
     * @param {any} arg - the argument to add
     */
    result[name].pushArgument = arg => {
        /** Do not add more arguments than the function can take */
        if (length === state.args.value.length) { return }

        /** Add the argument to the curried state, creating a new version */
        const curried = state.curried.value.slice()
        curried.push(curried[curried.length - 1](arg))
        state.curried.next(curried)

        /** Add the argument */
        state.args.next(state.args.value.concat([arg]))
    }


    /** @prototype Removes the last argument from the stored arguments as well as the last curry */
    result[name].popArgument = () => {
        if (state.args.value.length === 0) { return }

        state.args.next(state.args.value.slice(0, state.args.value.length - 1))
        state.curried.next(state.curried.value.slice(0, state.curried.value.length - 1))
    }


    /** @prototype Returns a copy of the current curried function, adding in any passed arguments */
    result[name].curry = (...argsToAdd) => {
        const proxy = result[name].curried
        argsToAdd.forEach(proxy.pushArgument)
        return proxy
    }


    /** 
     * @prototype Subscribes to a state property observer, if it exists
     * @param {string} property - the property in which to subscribe
     * @param {any} callbacks - Observer callbacks, next, error, complete
     */
    result[name].subscribe = (...subscribeArguments) =>
        !state[subscribeArguments[0]] ?
            undefined :
            state[subscribeArguments[0]]
                .subscribe(
                    subscribeArguments[1],
                    subscribeArguments[2],
                    subscribeArguments[3]
                )

    return result[name]
}

export { SuperFunction }