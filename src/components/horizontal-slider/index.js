/**
 * on load, images seem stretched then go to normal
 * cover flow
 * single item
 * onslidestart
 * onslideend
 * odd flicker when scrolling back
 * page scroll when center is messed up
 */
import { WCConstructor, WCDefine, AppendStyleElement } from '../..'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { scrollToIndex } from './methods'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `horizontal-slider`
const componentRoot = `.horizontal-slider-container`

export const HorizontalSlider = /*#__PURE__*/ WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { scrollToIndex },
    onConnected: host => {
        window.addEventListener(`resize`, () => host.scrollToIndex(host.currentindex))

        if (!document.head.querySelector(`style[name="horizontal-slider-styles"]`)) {
            AppendStyleElement(style, document.head, `horizontal-slider-styles`)
        }
    },
})

WCDefine(componentName, HorizontalSlider)
