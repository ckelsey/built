import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, Pipe, ToBool,
    IfInvalid, ToString, IndexOf, Get, Set, ObserveEvent, EaseInOut,
    ObserverUnsubscribe, ObserveSlots, OnNextFrame, Timer
} from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `overlay-message`
const componentRoot = `.${componentName}-container`
const speed = 333

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setShown = host => {
    const root = host.elements.root

    if (!root) { return }

    const opacityNow = root.style.opacity

    if (!host.shown && (opacityNow === `` || opacityNow === `0`)) { return }

    Timer(
        opacityStep => root.style.opacity = opacityStep,
        EaseInOut(host.shown ? [0, 1] : [1, 0], speed)
    ).then(() => {
        root.classList[host.shown ? `add` : `remove`](`shown`)
        host.dispatchEvent(
            new CustomEvent(host.shown ? `opened` : `closed`, { detail: host })
        )
    })
}

const setColorTheme = (color, root) => root.setAttribute(`colortheme`, color)

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
        onChange: (_val, host) => OnNextFrame(() => setShown(host))
    },
    colortheme: {
        format: val => Pipe(IndexOf([`dark`, `light`, `transparent`]), IfInvalid(`light`))(val).value,
        onChange: (val, host) => OnNextFrame(() => setColorTheme(val, host.elements.root))
    },
    closeselector: {
        format: val => Pipe(ToString, IfInvalid(`[overlay-message-close]`))(val).value,
        onChange: (_val, host) => OnNextFrame(() => setCloseButton(host))
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
    root: { selector: componentRoot },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => OnNextFrame(() => setStyles(el, host.styles))
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => OnNextFrame(() => setStyles(el, host.theme))
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
            slots: ObserveSlots(host, true).subscribe(() => OnNextFrame(() => setCloseButton(host)))
        }
    }
})

WCDefine(componentName, OverlayMessage)