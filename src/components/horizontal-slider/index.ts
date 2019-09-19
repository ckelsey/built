/**
 * on load, images seem stretched then go to normal
 * cover flow
 * single item
 * onslidestart
 * onslideend
 * odd flicker when scrolling back
 * page scroll when center is messed up
 */
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import AppendStyle from '../../utils/webcomponent/append-style'
import './style.scss'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { scrollToIndex } from './methods'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `horizontal-slider`
const componentRoot = `.horizontal-slider-container`

const HorizontalSlider = /*#__PURE__*/ Constructor({
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
            AppendStyle(style, document.head, `horizontal-slider-styles`)
        }
    },
})

Define(componentName, HorizontalSlider)

export default HorizontalSlider