/* eslint-disable */
import { SuperFunction } from './index'

const testFunction = (a, b, c) => `${a} | ${b} | ${c}`

describe(`SuperFunction`, () => {
    test('Returns a function if function is provided', () => expect(typeof SuperFunction(testFunction)).toBe(`function`))

    test('Returns undefined if no function is provided', () => expect(typeof SuperFunction()).toBe(`undefined`))

    test('Returns the same value if the function was called normally', () => expect(SuperFunction(testFunction)(`A`, `B`, `C`)).toBe(`A | B | C`))

    test('Inherits the same name as the original function', () => expect(SuperFunction(testFunction).name).toBe(`testFunction`))

    test('Inherits the same length as the original function', () => expect(SuperFunction(testFunction).length).toBe(3))

    test('Getter `curried` returns a function', () => expect(typeof SuperFunction(testFunction).curried).toBe(`function`))

    test('Getter `curried` returns a function with one arg set, source having an arity of 3', () => expect(typeof SuperFunction(testFunction).curried(`a`)).toBe(`function`))

    test('Getter `curried` returns a function with two args set, source having an arity of 3', () => expect(typeof SuperFunction(testFunction).curried(`a`)(`b`)).toBe(`function`))

    test('Getter `curried` returns a string with three args set, source having an arity of 3', () => expect(typeof SuperFunction(testFunction).curried(`a`)(`b`)(`c`)).toBe(`string`))

    test('Getter `curried` returns a function with the inherited name', () => expect(SuperFunction(testFunction).curried.name).toBe(`testFunction`))

    test('Getter `curried` returns a function with the inherited length', () => expect(SuperFunction(testFunction).curried.length).toBe(3))

    test('Getter `args` returns an array', () => expect(Array.isArray(SuperFunction(testFunction).args)).toBe(true))

    test('Getter `args` has 0 arguments if none were passed in', () => expect(SuperFunction(testFunction).args.length).toBe(0))

    test('Getter `args` has 2 arguments if 2 were passed in', () => expect(SuperFunction(testFunction, [`A`, `B`]).args.length).toBe(2))

    test('Getter `args` has the correct argument values that were were passed in', () => expect(SuperFunction(testFunction, [`A`, `B`]).args).toEqual([`A`, `B`]))

    test('Setter `args` will overwrite existing args', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.args = [`X`]
        expect(superFn.args).toEqual([`X`])
    })

    test('Setter `args` will overwrite existing args when a non array value is passed in', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.args = `X`
        expect(superFn.args).toEqual([`X`])
    })

    test('Getter `complete` is not true when there are not enough args', () => expect(SuperFunction(testFunction, [`A`, `B`]).complete).toEqual(false))

    test('Getter `complete` is true when there are enough args', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.pushArgument(`C`)
        expect(superFn.complete).toEqual(true)
    })

    test('Method pushArgument adds an argument', () => {
        const superFn = SuperFunction(testFunction)
        superFn.pushArgument(`C`)
        expect(superFn.args.length).toEqual(1)
    })

    test('Method pushArgument adds an argument but does not call the function even when arity is met', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.pushArgument(`C`)
        expect(superFn.args.length).toEqual(3)
        expect(typeof superFn).toEqual(`function`)
        expect(typeof superFn()).toEqual(`string`)
    })

    test('Method pushArgument does not add more than the original function arity', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.pushArgument(`C`)
        superFn.pushArgument(`D`)
        expect(superFn.args.length).toEqual(3)
    })

    test('Method popArgument removes the last arg', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.popArgument()
        expect(superFn.args.length).toEqual(1)
    })

    test('Method popArgument does nothing when there are no more arguments', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        superFn.popArgument()
        superFn.popArgument()
        superFn.popArgument()
        expect(superFn.args.length).toEqual(0)
    })

    test('Method curry creates a new copy', () => {
        const superFn = SuperFunction(testFunction, [`A`, `B`])
        const superFn2 = superFn.curry()
        superFn2.pushArgument(`C`)
        expect(superFn2.args.length).toEqual(3)
        expect(superFn.args.length).toEqual(2)
    })

    test('Method curry accepts arguments', () => {
        const superFn = SuperFunction(testFunction, `A`)
        const superFn2 = superFn.curry(`B`)
        expect(superFn2.args).toEqual([`A`, `B`])
    })

    test('Method curry will call the function if arity is met', () => {
        const superFn = SuperFunction(testFunction, [`A`])
        const superFn2 = superFn.curry()
        expect(superFn2(`B`, `C`)).toBe(`A | B | C`)
    })

    test('Method curry accepts arguments one at a time', () => {
        const superFn = SuperFunction(testFunction, `A`)
        const superFn2 = superFn.curry(`B`)(`C`)
        expect(superFn2).toBe(`A | B | C`)
    })

    test('Method subscribe returns a function', () => {
        const superFn = SuperFunction(testFunction, `A`)
        const sub = superFn.subscribe(`args`, a => console.log)
        expect(typeof sub).toBe(`function`)
        sub()
    })

    test('Method subscribe returns undefined with incorrect arguments', () => {
        const superFn = SuperFunction(testFunction, `A`)
        const sub = superFn.subscribe(`margs`, a => console.log)
        expect(typeof sub).toBe(`undefined`)
    })

    test('Subscription to args gets triggered correctly', () => {
        const superFn = SuperFunction(testFunction, `A`)
        let aResult = []
        const sub = superFn.subscribe(`args`, a => aResult = a)
        superFn.pushArgument(`C`)
        expect(aResult).toEqual([`A`, `C`])
        superFn.popArgument()
        expect(aResult).toEqual([`A`])
        sub()
    })

    test('Subscription to call gets triggered correctly', () => {
        const superFn = SuperFunction(testFunction, `A`)
        let aResult
        const sub = superFn.subscribe(`call`, a => aResult = a)
        superFn.pushArgument(`b`)
        superFn(`C`)
        expect(typeof aResult).toBe(`object`)
        sub()
    })

})