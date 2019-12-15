import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, Pipe, ToBool, IfInvalid, ToString,
    ObserveEvent, IndexOf, IfEmpty, EventName
} from '../..'
import { OnNextFrame } from '../../services/on-next-frame'
import { WCwhenPropertyReady } from '../../utils/wc-when-property-ready'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `snack-bar`
const componentRoot = `.${componentName}-container`

const infoiconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>`
const successiconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
const erroriconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`
const warningiconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setShown = host => {
    const root = host.elements.root

    if (!root) { return }

    const endEventName = EventName(`transitionend`)
    const dispatch = () => host.dispatchEvent(new CustomEvent(host.shown ? `opened` : `closed`, { detail: host }))

    if (endEventName) {
        root.addEventListener(endEventName, function startEvent() {
            root.removeEventListener(endEventName, startEvent)
            requestAnimationFrame(dispatch)
        })
    } else {
        requestAnimationFrame(dispatch)
    }

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

const setIcon = (host, key) => {
    WCwhenPropertyReady(host, key)
        .then(() => {
            const icon = host.elements[key]

            if (!icon) { return }

            icon[host[key][0] === `<` ? `svg` : `type`] = host[key]
        })
}

const showHideClose = (el, show) => {
    if (!el) { return }
    el.classList[show ? `remove` : `add`](`hide-close-btn`)
}

const properties = {
    class: ComponentClassObject,
    shown: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setShown(host))
    },
    align: {
        format: val => Pipe(ToString, IndexOf([`top`, `bottom`, `none`]), IfInvalid(`bottom`))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setAlign(host))
    },
    type: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setType(host))
    },
    infoicon: {
        format: val => Pipe(ToString, IfInvalid(infoiconSvg), IfEmpty(infoiconSvg))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `infoicon`))
    },
    successicon: {
        format: val => Pipe(ToString, IfInvalid(successiconSvg), IfEmpty(successiconSvg))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `successicon`))
    },
    erroricon: {
        format: val => Pipe(ToString, IfInvalid(erroriconSvg), IfEmpty(erroriconSvg))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `erroricon`))
    },
    warningicon: {
        format: val => Pipe(ToString, IfInvalid(warningiconSvg), IfEmpty(warningiconSvg))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setIcon(host, `warningicon`))
    },
    hideclose: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => OnNextFrame(() => showHideClose(host.elements.root, !val))
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => OnNextFrame(() => setStyles(host.elements.injectedStyles, val))
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => OnNextFrame(() => setStyles(host.elements.themeStyles, val))
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => OnNextFrame(() => {
            setAlign(host)
            setShown(host)
        })
    },
    button: {
        selector: `.snack-bar-close`,
        onChange: (el, host) => OnNextFrame(() => {
            el.eventListeners = {
                click: ObserveEvent(el, `click`).subscribe(() => host.shown = false)
            }

            showHideClose(host.elements.root, !host.hideclose)
        })
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
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `infoicon`))
    },
    successicon: {
        selector: `.successicon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `successicon`))
    },
    erroricon: {
        selector: `.erroricon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `erroricon`))
    },
    warningicon: {
        selector: `.warningicon`,
        onChange: (_el, host) => OnNextFrame(() => setIcon(host, `warningicon`))
    },
}

export const SnackBar = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements
})

WCDefine(componentName, SnackBar)