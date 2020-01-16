import { WCDefine, WCConstructor, ObserveEvent, ToBool, IfInvalid, Pipe, WasClickedOn, ObserverUnsubscribe, ObserveSlots, OnNextFrame } from '../..'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()

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
    open: {
        format: (val) => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: toggleOptions
    },
    closeonclick: {
        format: (val) => Pipe(ToBool, IfInvalid(true))(val).value
    }
}

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
    }
}

export const DropDown = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
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