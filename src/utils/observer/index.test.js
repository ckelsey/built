/* eslint-disable */
import { Observer } from './index'

describe(`Observer`, () => {
    test(`Returns an object`, () => expect(typeof Observer()).toBe(`object`))
    test(`Has property 'value', in this case is a string`, () => expect(typeof Observer(`test`).value).toBe(`string`))
    test(`Has property 'value', in this case is an array`, () => expect(Array.isArray(Observer([]).value)).toBe(true))
    test(`Has property 'previous', in this case is undefined`, () => expect(Observer([]).previous).toBe(undefined))
    test(`Has property 'previous', in this case is a string`, () => {
        const ob = Observer(`prev`)
        ob.next(`now`)
        expect(ob.previous).toBe(`prev`)
    })

    test(`Can be subscribed to`, () => {
        const ob = Observer(`prev`)
        let S
        const sub = ob.subscribe(s => S = s)
        ob.next(`now`)
        expect(S).toBe(`now`)
        sub()
    })

    test(`Receives errors`, () => {
        const ob = Observer(`prev`)
        let error
        const sub = ob.subscribe(() => { }, e => error = e)
        ob.error(`uh oh`)
        expect(error).toBe(`uh oh`)
        sub()
    })

    test(`On error, error is pushed to errors array`, () => {
        const ob = Observer(`prev`)
        let o
        const sub = ob.subscribe(() => { }, (e, O) => o = O)
        ob.error(`uh oh`)
        expect(Array.isArray(o.errors)).toBe(true)
        expect(o.errors.length).toBe(1)
        sub()
    })

    test(`Receives complete`, () => {
        const ob = Observer(`prev`)
        let complete = false
        const sub = ob.subscribe(
            () => { },
            () => { },
            () => complete = true
        )
        ob.complete()
        expect(complete).toBe(true)
        sub()
    })

    test(`On complete, all subscriptions are canceled`, () => {
        const ob = Observer(`prev`)
        ob.subscribe(() => { })
        ob.complete()
        expect(ob.subscriptions).toBe(undefined)
        expect(ob.value).toBe(undefined)
        expect(ob.previous).toBe(undefined)
        expect(ob.subscribe(() => { })).toBe(undefined)
    })

    test(`On complete, next, error do nothing`, () => {
        const ob = Observer(`prev`)
        let N
        let E
        ob.subscribe(n => N = n, e => E = e)
        N = E = undefined
        ob.complete()

        ob.next(`hey`)
        ob.error(`oops`)
        expect(N).toBe(undefined)
        expect(E).toBe(undefined)
    })

    test(`On complete, getter isComplete returns true`, () => {
        const ob = Observer(`prev`)
        ob.complete()
        expect(ob.isComplete).toBe(true)
    })

    test(`Unsubscribe method returns function`, () => {
        const ob = Observer(`prev`)
        ob.subscribe(() => { })
        const subObject = ob.subscriptions[Object.keys(ob.subscriptions)[0]]
        expect(typeof ob.unsubscribe(subObject)).toBe(`function`)
    })

    test(`Unsubscribe method returns undefined if no subscription object is provided`, () => {
        const ob = Observer(`prev`)
        expect(ob.unsubscribe()).toBe(undefined)
    })

    test(`If noinit flag on construct is true, initial next is not called`, () => {
        const ob = Observer(`prev`, true)
        let N
        ob.subscribe(n => N = n)
        expect(N).toBe(undefined)
    })

    test(`If a callback for next, error, complete is not provided, it just skips over`, () => {
        const ob = Observer(`prev`, true)
        let N
        let N2
        let N3
        ob.subscribe(() => { }, n => N = n)
        ob.subscribe(n => N2 = n)

        ob.next(`Hey`)
        ob.error(`oops`)

        expect(N).toBe(`oops`)
        expect(N2).toBe(`Hey`)
        expect(N3).toBe(undefined)
    })
})