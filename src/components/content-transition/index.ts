import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import './style.scss'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { transitionChild } from './methods'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `content-transition`
const componentRoot = `.content-transition-container`

const ContentTransition = /*#__PURE__*/ Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: {
        transitionChild
    }
})

Define(componentName, ContentTransition)

export default ContentTransition