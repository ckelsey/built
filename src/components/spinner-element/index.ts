import pipe from '../../utils/pipe'
import ToBool from '../../utils/convert/bool'
import IfInvalid from '../../utils/convert/if_invalid'
import { ToNumber } from '../../utils/convert/number'
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { wcClassObject } from '../../utils/html/attr'
import { setStyleRules } from '../../utils/html/markup'
import { SPINNERELEMENT } from './theme'
import './style.scss'

const style = require('./style.scss').toString()

const setStyles = (el, styles) => {
    if (!el) { return }
    setStyleRules(el, styles)
}

const template = require('./index.html')
const componentName = `spinner-element`
const componentRoot = `.${componentName}-container`

const setRootClass = (host, condition, clss) => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[condition ? `add` : `remove`](clss)
}

const getSpinner = host => {
    const slotted = host.children[0]

    if (slotted) { return slotted }

    const slot = host.elements.slot
    if (!slot) { return }

    return slot.children[0]
}

const setPage = host => setRootClass(host, host.page, `fullpage`)
const setScrim = host => setRootClass(host, host.scrim, `showscrim`)
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

const setColor = host => {
    const spinner = getSpinner(host)
    console.log(host.color, spinner)
    if (!spinner) { return }
    spinner.style.color = host.color
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

const toggleVisibility = host => host.elements.root.classList[host.visible ? `add` : `remove`](`shown`)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => setPage(host)
    },
    scrim: {
        selector: `.spinner-element-scrim`,
        onChange: (_el, host) => {
            setScrim(host)
            setBlur(host)
            setScrimOpacity(host)
            setScrimColor(host)
        }
    },
    inner: {
        selector: `.spinner-element-inner`,
        onChange: (_el, host) => setColor(host)
    },
    slot: { selector: `slot` },
    injectedStyles: { selector: `style.injectedStyles`, onChange: (el, host) => setStyles(el, host.styles) }
}

const properties = {
    class: wcClassObject,
    visible: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.visible))(val).value,
        onChange: (_val, host) => toggleVisibility(host)
    },
    page: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.page))(val).value,
        onChange: (_val, host) => setPage(host)
    },
    scrim: {
        format: val => pipe(ToBool, IfInvalid(SPINNERELEMENT.scrim))(val).value,
        onChange: (_val, host) => setScrim(host)
    },
    blur: {
        format: val => pipe(ToNumber, IfInvalid(SPINNERELEMENT.blur))(val).value,
        onChange: (_val, host) => setBlur(host)
    },
    scrimopacity: {
        format: val => pipe(ToNumber, IfInvalid(SPINNERELEMENT.scrimopacity))(val).value,
        onChange: (_val, host) => setScrimOpacity(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : SPINNERELEMENT.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    type: {
        format: val => typeof val === `string` ? val : SPINNERELEMENT.type,
        onChange: (_val, host) => setType(host)
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