/* eslint-disable */
import { AppendStyleElement } from './index'

const ruleString = `.s{color:black}`
const parent = document.body
const name = `test-style`

describe(`AppendStyleElement`, () => {
    test(`Returns a style element`, () => expect(AppendStyleElement(ruleString, parent) instanceof HTMLElement).toBe(true))
    test(`Returns undefined if no rules are provided`, () => expect(AppendStyleElement(``, parent)).toBe(undefined))
    test(`Returns undefined if no parent is provided`, () => expect(AppendStyleElement(ruleString)).toBe(undefined))
    test(`Appends the style element to the provided parent`, () => {
        const styleElement = AppendStyleElement(ruleString, parent)
        expect(parent.lastElementChild).toBe(styleElement)
    })

    test(`Has name attribute if provided`, () => {
        AppendStyleElement(ruleString, parent, name)
        expect(parent.lastElementChild.getAttribute(`name`)).toBe(name)
    })

    test(`Has no name attribute if not provided`, () => {
        AppendStyleElement(ruleString, parent)
        expect(parent.lastElementChild.getAttribute(`name`)).toBe(``)
    })

    test(`Has the provided rules`, () => {
        AppendStyleElement(ruleString, parent)
        expect(parent.lastElementChild.innerHTML).toBe(ruleString)
    })
})