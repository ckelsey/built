/* eslint-disable */
import { FunctionToPartial } from './index'

const testFunction = (a, b, c) => `${a} | ${b} | ${c}`

describe(`FunctionToPartial`, () => {
    test('Returns a function if function is provided', () => expect(typeof FunctionToPartial(testFunction)).toBe(`function`))

    test('Returns undefined if no function is provided', () => expect(typeof FunctionToPartial()).toBe(`undefined`))

    test('Returns a function until arity is met', () => {
        const curry = FunctionToPartial(testFunction)
        expect(typeof curry).toBe(`function`)

        const curryParam1 = curry(`A`)
        expect(typeof curryParam1).toBe(`function`)

        const curryParam2 = curryParam1(`B`)
        expect(typeof curryParam2).toBe(`function`)

        const curryParam3 = curryParam2(`C`)
        expect(typeof curryParam3).toBe(`string`)
    })

    test('Returns a function until arity is met, with initial arguments passed in', () => {
        const curry = FunctionToPartial(testFunction, `One`)
        expect(typeof curry).toBe(`function`)

        const curryParam1 = curry(`two`)
        expect(typeof curryParam1).toBe(`function`)

        const curryParam2 = curryParam1(`three`)
        expect(typeof curryParam2).toBe(`string`)
    })

    test('Returns what the original function would return once arity is met', () => {
        const normalResult = testFunction(`Tigers`, `Bears`, `Lions`)
        const curried = FunctionToPartial(testFunction)(`Tigers`)(`Bears`)(`Lions`)
        expect(curried).toEqual(`Tigers | Bears | Lions`)
        expect(curried).toEqual(normalResult)
    })

    test('Can take more than argument at a time', () => {
        const curry = FunctionToPartial(testFunction)
        const curried = curry(`Once`, `Twice`, `Three times`)
        expect(curried).toEqual(`Once | Twice | Three times`)
    })

    test('If provided more than required arguments, it still returns correctly', () => {
        const curry = FunctionToPartial(testFunction)
        const curried = curry(`Once`, `Twice`)
        const curried2 = curried(`Three times`, `A lady`)
        expect(curried2).toEqual(`Once | Twice | Three times`)
    })
})