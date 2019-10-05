import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import ComponentClassObject from '../../utils/html/component-class-object'
import SetStyleRules from '../../utils/html/set-style-rules'
import './style.scss'
import '../button-element'
import pipe from '../../utils/pipe'
import ToBool from '../../utils/convert/bool'
import IfInvalid from '../../utils/convert/if_invalid'
import ToString from '../../utils/convert/to_string'
import ObserveEvent from '../../utils/observeEvent'
import IndexOf from '../../utils/convert/indexof'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `snack-bar`
const componentRoot = `.${componentName}-container`

const infoicon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>`
const successicon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
const erroricon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`
const warningicon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setShown = host => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[host.shown ? `add` : `remove`](`shown`)
}

const setAlign = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`align`, host.align)
}

const setType = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`type`, host.type)
}

const setInfoIcon = host => {
    const infoicon = host.elements.infoicon

    if (!infoicon) { return }

    infoicon[host.infoicon[0] === `<` ? `svg` : `type`] = host.infoicon
}

const setSuccessIcon = host => {
    const successicon = host.elements.successicon

    if (!successicon) { return }

    successicon[host.successicon[0] === `<` ? `svg` : `type`] = host.successicon
}

const setErrorIcon = host => {
    const erroricon = host.elements.erroricon

    if (!erroricon) { return }

    erroricon[host.erroricon[0] === `<` ? `svg` : `type`] = host.erroricon
}

const setWarningIcon = host => {
    const warningicon = host.elements.warningicon

    if (!warningicon) { return }

    warningicon[host.warningicon[0] === `<` ? `svg` : `type`] = host.warningicon
}

const properties = {
    class: ComponentClassObject,
    shown: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setShown(host)
    },
    align: {
        format: val => pipe(ToString, IndexOf([`top`, `bottom`]), IfInvalid(`bottom`))(val).value,
        onChange: (_val, host) => setAlign(host)
    },
    type: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setType(host)
    },
    infoicon: {
        format: val => pipe(ToString, IfInvalid(infoicon))(val).value,
        onChange: (_val, host) => setInfoIcon(host)
    },
    successicon: {
        format: val => pipe(ToString, IfInvalid(successicon))(val).value,
        onChange: (_val, host) => setSuccessIcon(host)
    },
    erroricon: {
        format: val => pipe(ToString, IfInvalid(erroricon))(val).value,
        onChange: (_val, host) => setErrorIcon(host)
    },
    warningicon: {
        format: val => pipe(ToString, IfInvalid(warningicon))(val).value,
        onChange: (_val, host) => setWarningIcon(host)
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

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => {
            setAlign(host)
            setShown(host)
        }
    },
    button: {
        selector: `.snack-bar-close`,
        onChange: (el, host) => {
            el.eventListeners = {
                click: ObserveEvent(el, `click`).subscribe(() => host.shown = false)
            }
        }
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    },
    infoicon: {
        selector: `.infoicon`,
        onChange: (_el, host) => setInfoIcon(host)
    },
    successicon: {
        selector: `.successicon`,
        onChange: (_el, host) => setSuccessIcon(host)
    },
    erroricon: {
        selector: `.erroricon`,
        onChange: (_el, host) => setErrorIcon(host)
    },
    warningicon: {
        selector: `.warningicon`,
        onChange: (_el, host) => setWarningIcon(host)
    },
}

const SnackBar = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements
})

Define(componentName, SnackBar)

export default SnackBar