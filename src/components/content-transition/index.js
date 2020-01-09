import { transitionChild, transitionTo, getComponentStyles, getIndex, start$, end$, getCurrent, getChildren, setCurrent } from './methods.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { ToNumber } from '../../utils/to-number.js'
import { Pipe } from '../../utils/pipe.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToBool } from '../../utils/to-bool.js'

const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
}

const setKeepChildren = host => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[host.keepchildren ? `add` : `remove`](`keepchildren`)
}

const setStyleElement = host => {
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

const elements = {
    root: {
        selector: `.content-transition-container`,
        onChange: (el, host) => {
            setStyleElement(host)
            el.setAttribute(`type`, host.type)
        }
    },
    current: { selector: `slot[name="current"]`, },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host, host.theme)
    },
    nextContainer: { selector: `.next-slot` },
    currentContainer: { selector: `.current-slot` }
}

const properties = {
    class: ComponentClassObject,
    speed: { format: val => Pipe(ToNumber, IfInvalid(300))(val).value },
    current: { format: val => val },
    start: { format: val => val },
    end: { format: val => val },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },
    theme: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.themeStyles, host, val)
    },
    type: {
        format: val => [`fade`, `slide`, `height`].indexOf(val) > -1 ? val : `fade`,
        onChange: (val, host) => {
            const root = host.elements.root
            if (!root) { return }
            root.setAttribute(`type`, val)
        }
    },
    keepchildren: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setKeepChildren(host)
    },
}

const observedAttributes = Object.keys(properties)

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-transition`
const componentRoot = `.content-transition-container`

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
