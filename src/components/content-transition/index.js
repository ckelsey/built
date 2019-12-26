import { WCConstructor, AppendStyleElement, WCDefine } from '../..'
import { elements, setStyles } from './elements'
import { observedAttributes, properties } from './properties'
import { transitionChild, transitionTo, getComponentStyles, getIndex, start$, end$, getCurrent, getChildren, setCurrent } from './methods'


// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
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
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nonchild = true
    }

    setStyles(componentStyle, host, styleString)
    setStyles(outerStyle, host, styleString)
}

export const ContentTransition = WCConstructor({
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
        end$,
        setCurrent
    },
})

WCDefine(componentName, ContentTransition)
