/**
 * repeat

 * user-select on all the things except slot item contents
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
        if (document.head.querySelector(`style[name="horizontal-slider-styles"]`)) { return }

        AppendStyle(style, document.head, `horizontal-slider-styles`)

        window.addEventListener(`resize`, () => host.scrollToIndex(host.currentindex))
    },
    // onReady: host => setTimeout(() => host.scrollToIndex(host.currentindex), 500)
})

Define(componentName, HorizontalSlider)

export default HorizontalSlider