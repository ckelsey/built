/* eslint-disable no-undef */
import assert from 'assert'
import { Between } from '../src/utils/between'

describe(`Between`, () => {
    it(`should find 'str' between '{{' and '}}', given '{{str}}'`, () => {
        assert.strictEqual(`str`, Between(`{{`, `}}`, `{{str}}`).first())
    })

    // it(`should find 'str' between '{{' and '}}', given '{{str}}'`, () => {
    //     assert.strictEqual(`str`, Between(`{{`, `}}`, `{{str}}`).last())
    // })

    // it(`should find 'str' between '{{' and '}}', given '{{str}}'`, () => {
    //     assert.strictEqual(`str`, Between(`{{`, `}}`, `{{str}}`).all()[0])
    // })
})