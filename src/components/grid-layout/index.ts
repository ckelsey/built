/**
 * setDimensions
 * get items
 */
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import SetStyleRules from '../../utils/html/set-style-rules'
import './style.scss'
import pipe from '../../utils/pipe'
import ToString from '../../utils/convert/to_string'
import IfInvalid from '../../utils/convert/if_invalid'
import AppendStyle from '../../utils/webcomponent/append-style'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `grid-layout`
const componentRoot = `.${componentName}-container`

const defaultWidth = `14em`
const defaultGap = `1em`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setDimensions = (host) => {
    const gap = host.gap || defaultGap
    const width = host.width || defaultWidth
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)
    const themeStyles = host.elements.themeStyles
    const injectedStyles = host.elements.injectedStyles
    let outerStyle = host.querySelector(`style[name="outer"]`)

    const styleString = [
        style,
        themeStyles ? themeStyles.innerHTML : ``,
        injectedStyles ? injectedStyles.innerHTML : ``,
        `.grid-layout-items{grid-gap:${gap}; grid-template-columns:repeat(auto-fit, minmax(${width}, 1fr));}`
    ].join(``)

    if (!outerStyle) {
        AppendStyle(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const elements = {
    root: {
        selector: componentRoot,
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    }
}

const properties = {
    width: {
        format: val => pipe(ToString, IfInvalid(defaultWidth))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    gap: {
        format: val => pipe(ToString, IfInvalid(defaultGap))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    styles: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    }
}

const getComponentStyles = host => () => `${require('./style.scss').toString()}${host.theme || ``}${host.styles}`

const GridLayout = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    computed: {
        items: host => ({
            get() {
                console.log(host)
            }
        })
    },
    methods: { getComponentStyles }
})

Define(componentName, GridLayout)

export default GridLayout