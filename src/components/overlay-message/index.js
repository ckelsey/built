import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, Pipe, ToBool,
    IfInvalid, ToString, IndexOf, Get, Set, ObserveEvent, EventName,
    ObserverUnsubscribe, ObserveSlots
} from '../..'
import './style.scss'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `overlay-message`
const componentRoot = `.${componentName}-container`

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

const setColorTheme = host => {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute(`colortheme`, host.colortheme)
}

const setCloseButton = host => {
    Array.from(host.querySelectorAll(`*`))
        .forEach(el => {
            try { Get(el, `eventSubscriptions.closeOverlay`, () => { })() } catch (error) { }
        })

    if (!host.closeselector) { return }

    Array.from(host.querySelectorAll(host.closeselector))
        .forEach(el => Set(el, `eventSubscriptions.closeOverlay`,
            ObserveEvent(el, `click`).subscribe(() => host.shown = false)
        ))
}

const properties = {
    class: ComponentClassObject,
    shown: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setShown(host)
    },
    colortheme: {
        format: val => Pipe(IndexOf([`dark`, `light`, `transparent`]), IfInvalid(`light`))(val).value,
        onChange: (_val, host) => setColorTheme(host)
    },
    closeselector: {
        format: val => Pipe(ToString, IfInvalid(`[overlay-message-close]`))(val).value,
        onChange: (_val, host) => setCloseButton(host)
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: (_el, host) => {
            setColorTheme(host)
            setShown(host)
        }
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

export const OverlayMessage = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onDisconnected(host) { ObserverUnsubscribe(host) },
    onConnected(host) {
        host.subscriptions = {
            slots: ObserveSlots(host, true).subscribe(() => setCloseButton(host))
        }
    }
})

WCDefine(componentName, OverlayMessage)