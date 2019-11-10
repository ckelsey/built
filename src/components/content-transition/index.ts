import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import './style.scss'
import elements, { setStyles } from './elements'
import { observedAttributes, properties } from './properties'
import { transitionChild, transitionTo, getComponentStyles, getIndex, start$, end$, getCurrent, getChildren } from './methods'

import AppendStyle from '../../utils/webcomponent/append-style'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `content-transition`
const componentRoot = `.content-transition-container`

export const setStyleElement = host => {
    let outerStyle = host.querySelector(`style[name="outer"]`)
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)

    const themeStyles = host.elements.themeStyles
    const injectedStyles = host.elements.injectedStyles

    const styleString = [
        style,
        themeStyles ? themeStyles.innerHTML : ``,
        injectedStyles ? injectedStyles.innerHTML : ``
    ].join(``)

    if (!outerStyle) {
        AppendStyle(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nonchild = true
    }

    setStyles(componentStyle, host, styleString)
    setStyles(outerStyle, host, styleString)
}

const ContentTransition = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: {
        transitionChild,
        transitionTo,
        getComponentStyles,
        getIndex,
        getCurrent,
        getChildren,
        start$,
        end$
    },
})

Define(componentName, ContentTransition)

export default ContentTransition