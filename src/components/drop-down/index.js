import {
    WCDefine, WCConstructor, ObserveEvent, ToBool, IfInvalid, ComponentClassObject,
    SetStyleRules, AppendStyleElement, Pipe, WasClickedOn, ObserverUnsubscribe
} from '../..'
import './style.scss'

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
        format: (val) => Pipe(ToBool, IfInvalid(false))(val).value
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
    heading: {
        selector: `.drop-down-heading`,
        // onChange: (el, host) => {
        //     el.eventSubscriptions = {
        //         mousedown: ObserveEvent(el, `mousedown`).subscribe(() => {
        //             if (!host.open) {
        //                 return openClose(true, host)
        //             }

        //             requestAnimationFrame(() => openClose(false, host))
        //                 openClose(false, host)
        //             })
        //         })
        //     }
        // }
    },
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

        const slotObserver = new MutationObserver(mutationsList => {
            const list = Array.from(mutationsList)

            while (list.length) {
                const mutation = list.shift()
                if (mutation.type === `childList` && mutation.addedNodes.length) {
                    return addClasses()
                }
            }
        })

        addClasses()

        slotObserver.observe(host, { childList: true })

        host.eventSubscriptions = {
            slotObserver: slotObserver.disconnect,
            docClick: ObserveEvent(document.body, `click`).subscribe(e =>
                !WasClickedOn(host, e) ?
                    openClose(false, host) :
                    WasClickedOn(host.elements.heading, e) ?
                        !host.open ?
                            openClose(true, host) :
                            requestAnimationFrame(() => openClose(false, host)) :
                        host.closeonclick ?
                            requestAnimationFrame(() => openClose(false, host)) :
                            undefined

            )
        }

        const overlay = host.elements.overlay
        overlay.target = host
    },
    onDisconnected(host) { ObserverUnsubscribe(host) }
})

WCDefine(componentName, DropDown)