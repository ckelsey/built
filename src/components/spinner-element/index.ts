import pipe from '../../utils/pipe'
import ToBool from '../../utils/convert/bool'
import IfInvalid from '../../utils/convert/if_invalid'
import ToNumber from '../../utils/convert/to_number'
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import ComponentClassObject from '../../utils/html/component-class-object'
import SetStyleRules from '../../utils/html/set-style-rules'
import { SPINNERELEMENT } from './theme'
import './style.scss'

const style = require('./style.scss').toString()

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setTheme = (value, host) => {
    const themeElement = host.elements.theme
    if (!themeElement || value === undefined) { return }
    SetStyleRules(themeElement, value)
}

const template = require('./index.html')
const componentName = `spinner-element`
const componentRoot = `.${componentName}-container`

const doAllTheThings = host => {
    const root = host.elements.root
    if (!root) { return }

    root.setAttribute(`type`, host.type)
    setRootClass(host, host.page, `fullpage`)
    setRootClass(host, host.scrim, `showscrim`)
    setType(host)
    setScrimColor(host)
    setScrimOpacity(host)
    setBlur(host)
}

const setRootClass = (host, condition, clss) => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[condition ? `add` : `remove`](clss)
}

const setType = host => {
    const root = host.elements.root
    if (!root) { return }
    root.setAttribute(`type`, host.type)
}

const setBlur = host => {
    const scrim = host.elements.scrim
    if (!scrim) { return }
    scrim.style.backdropFilter = `blur(${host.blur}px)`
}

const setScrimColor = host => {
    const scrim = host.elements.scrim
    if (!scrim) { return }
    scrim.style.background = host.scrimcolor
}

const setScrimOpacity = host => {
    const scrim = host.elements.scrim

    if (!scrim) { return }

    if (host.scrim) {
        return scrim.style.opacity = host.scrimopacity
    }

    scrim.style.opacity = 0
}

const toggleVisibility = host => {
    host.elements.root.classList[host.visible ? `add` : `remove`](`shown`)
}

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => doAllTheThings(host)
    },
    scrim: {
        selector: `.spinner-element-scrim`,
        onChange: (_el, host) => doAllTheThings(host)
    },
    inner: { selector: `.spinner-element-inner` },
    slot: { selector: `slot` },
    injectedStyles: { selector: `style.injectedStyles`, onChange: (el, host) => setStyles(el, host.styles) },
    theme: {
        selector: `style.themeStyles`,
        onChange: (_el, host) => setTheme(host.theme, host)
    }
}

const properties = {
    class: ComponentClassObject,
    visible: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.visible))(val).value,
        onChange: (_val, host) => toggleVisibility(host)
    },
    page: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.page))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    scrim: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.scrim))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    blur: {
        format: val => pipe(ToNumber, IfInvalid(SPINNERELEMENT.blur))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    scrimopacity: {
        format: val => pipe(ToNumber, IfInvalid(SPINNERELEMENT.scrimopacity))(val).value,
        onChange: (_val, host) => doAllTheThings(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : SPINNERELEMENT.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    type: {
        format: val => typeof val === `string` ? val : SPINNERELEMENT.type,
        onChange: (_val, host) => doAllTheThings(host)
    },
    theme: {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: setTheme
    }
}


const SpinnerElement = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
})

Define(componentName, SpinnerElement)

export default SpinnerElement