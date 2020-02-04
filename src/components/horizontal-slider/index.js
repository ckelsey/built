/**
 * on load, images seem stretched then go to normal
 * cover flow
 * single item
 * onslidestart
 * onslideend
 * odd flicker when scrolling back
 * page scroll when center is messed up
 */
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { scrollToIndex } from './methods'
import { AppendStyleElement } from '../../utils/append-style-element.js'

const style = require(`./style.scss`).toString()
const outerStyle = `horizontal-slider { display: flex; width: 100%; height: 100%; pointer-events: none; overflow: hidden; position: relative; padding: 0 0 2.5em; box-sizing: border-box; }`
const template = require(`./index.html`)
const componentName = `horizontal-slider`
const componentRoot = `.horizontal-slider-container`

export const HorizontalSlider = /*#__PURE__*/ WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
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
