/**
 * prevent initial trnsform in
 * cover flow
 * single item
 * onslidestart
 * onslideend
 */
import { Define, Constructor } from '../../utils/webcomponent/constructor'
import './style.scss'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { scrollToIndex } from './methods'
import { AppendStyle } from '../../utils/webcomponent/css'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `horizontal-slider`
const componentRoot = `.horizontal-slider-container`

const HorizontalSlider = Constructor({
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