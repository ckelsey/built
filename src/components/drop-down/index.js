import { SetStyleRules } from '../../utils/set-style-rules.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WasClickedOn } from '../../utils/was-clicked-on.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { WCDefine } from '../../utils/wc-define.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserveSlots } from '../../utils/observe-slots.js'

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

    OnNextFrame(() => {
        if (!show) {
            root.classList.remove(`opened`)
        } else {
            root.classList.add(`opened`)
        }

        host.dispatchEvent(new CustomEvent(show ? `selectopen` : `selectclose`, { detail: host }))
    })
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

    OnNextFrame(change)
}

const elements = {
    root: { selector: componentRoot },
    heading: { selector: `.drop-down-heading` },
    overlay: {
        selector: `.drop-down-overlay`,
        onChange(el, host) {
            el.target = host
        }
    },
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
                    return host.open ? openClose(false, host) : undefined
                }

                if (WasClickedOn(Array.from(host.querySelectorAll(`[slot="option"]`)), e)) {
                    host.dispatchEvent(new CustomEvent(`optionclick`, { detail: { host, event: e } }))
                }

                if (WasClickedOn([host.elements.heading, host.querySelector(`[slot="label"]`)], e)) {
                    host.dispatchEvent(new CustomEvent(`labelclick`, { detail: { host, event: e } }))

                    if (host.open) {
                        return OnNextFrame(() => openClose(false, host))
                    } else {
                        return openClose(true, host)
                    }
                }

                if (host.closeonclick && host.open) {
                    return OnNextFrame(() => openClose(false, host))
                }
            })
        }
    },
    onDisconnected(host) { ObserverUnsubscribe(host) }
})

WCDefine(componentName, DropDown)