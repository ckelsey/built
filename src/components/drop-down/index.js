import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCDefine, WCConstructor, ObserveEvent, ToBool, IfInvalid, ComponentClassObject,
    SetStyleRules, AppendStyleElement, Pipe, WasClickedOn, ObserverUnsubscribe,
    ObserveSlots
} from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const toggleOptions = (show, host) => {
    const overlay = host.elements.overlay
    const root = host.elements.root

    if (!root || !overlay) { return }
    if (show && overlay.showing) { return }

    try { overlay[show ? `show` : `hide`]() } catch (error) { }

    if (!show) {
        root.classList.remove(`opened`)
    } else {
        root.classList.add(`opened`)
    }

    host.dispatchEvent(new CustomEvent(show ? `selectopen` : `selectclose`, { detail: host }))
}

const properties = {
    class: ComponentClassObject,

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_el, host) => setStyleElement(host)
    },

    theme: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_el, host) => setStyleElement(host)
    },

    open: {
        format: (val) => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: toggleOptions
    },
    closeonclick: {
        format: (val) => Pipe(ToBool, IfInvalid(true))(val).value
    }
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `drop-down`
const componentRoot = `.${componentName}-container`
const openClose = (open, host) => {
    const change = () => {
        const needsFocusBlur = host.open !== open
        host.open = open

        if (needsFocusBlur) {
            if (open) {
                host.focus()
            } else {
                host.blur()
            }
        }

        Array.from(host.children).forEach(c => c.blur())
    }
    if (open) {
        return change()
    }

    setTimeout(change, 333)
}

const elements = {
    root: { selector: componentRoot },
    heading: { selector: `.drop-down-heading` },
    overlay: { selector: `.drop-down-overlay` },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (_el, host) => setStyleElement(host)
    },
    themedStyles: {
        selector: `style.themedStyles`,
        onChange: (_el, host) => setStyleElement(host)
    },
}

export const setStyleElement = host => {
    let outerStyle = host.querySelector(`style[name="outer"]`)
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)

    const styleString = [
        style,
        host.theme,
        host.styles,
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nonchild = true
    }

    setStyles(host.elements.injectedStyles, styleString)
    setStyles(host.elements.themedStyles, styleString)
    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

export const DropDown = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    properties,
    elements,
    observedAttributes: Object.keys(properties),
    onConnected(host) {
        host.tabIndex = `0`

        const addClasses = () => {
            Array.from(host.children)
                .forEach(child => {
                    if (child.getAttribute(`slot`) === `option`) {
                        child.tabIndex = `0`
                        child.classList.add(`drop-down-option`)
                    }
                })
        }

        addClasses()

        host.eventSubscriptions = {
            slotObserver: ObserveSlots(host, true).subscribe(addClasses),
            docClick: ObserveEvent(document.body, `click`).subscribe(e => {
                if (!WasClickedOn(host, e)) {
                    if (host.open) {
                        return openClose(false, host)
                    }
                    return
                }

                if (WasClickedOn(Array.from(host.querySelectorAll(`[slot="option"]`)), e)) {
                    host.dispatchEvent(new CustomEvent(`optionclick`, { detail: { host, event: e } }))
                }

                if (WasClickedOn([host.elements.heading, host.querySelector(`[slot="label"]`)], e)) {

                    host.dispatchEvent(new CustomEvent(`labelclick`, { detail: { host, event: e } }))

                    if (host.open) {
                        return requestAnimationFrame(() => openClose(false, host))
                    } else {
                        return openClose(true, host)
                    }
                }

                if (host.closeonclick && host.open) {
                    return requestAnimationFrame(() => openClose(false, host))
                }
            })
        }

        const overlay = host.elements.overlay
        overlay.target = host
    },
    onDisconnected(host) { ObserverUnsubscribe(host) }
})

WCDefine(componentName, DropDown)