/* eslint-disable */
import { Get } from './index'

const obj = {
    a: {
        b: [
            `C`
        ],
        method: (a, b) => a + b,
        o: null,
    }
}

describe(`Get`, () => {
    test(`Returns an array with a path of 'a.b'`, () => expect(Get(obj, `a.b`)).toEqual([`C`]))
    test(`Returns a string with a path of 'a.b.0'`, () => expect(Get(obj, `a.b.0`)).toBe(`C`))
    test(`Returns a lower cased c with a path of 'a.b.0.toLowerCase()'`, () => expect(Get(obj, `a.b.0.toLowerCase()`)).toBe(`c`))
    test(`Returns number 4 with a path of 'a.method(1,3)'`, () => expect(Get(obj, `a.method(1,3)`)).toBe(4))
    test(`Returns string somebody with a path of 'a.method(some, body)'`, () => expect(Get(obj, `a.method(some, body)`)).toBe(`somebody`))
    test(`Returns string somebody with a path of 'a.method(some, body, )'`, () => expect(Get(obj, `a.method(some, body, )`)).toBe(`somebody`))
    test(`Returns empty value if no source is provided`, () => expect(Get(undefined, `a.method(1,3)`, `oops`)).toBe(`oops`))
    test(`Returns source if no path is provided`, () => expect(Get(`hi`)).toBe(`hi`))
    test(`Returns empty value if path is not found`, () => expect(Get(obj, `a.d`, `oops`)).toEqual(`oops`))
    test(`Returns empty value if path results in null`, () => expect(Get(obj, `a.o.q`, `oops`)).toEqual(`oops`))
    test(`Returns modified value if modify function is provided`, () => expect(Get(obj, `a.b.0`, `oops`, v => v.length)).toEqual(1))
})