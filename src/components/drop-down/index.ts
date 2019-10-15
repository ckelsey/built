import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import SetStyleRules from '../../utils/html/set-style-rules'
import ComponentClassObject from '../../utils/html/component-class-object'
import ToBool from '../../utils/convert/bool'
import ObserveEvent from '../../utils/observeEvent'
import AppendStyle from '../../utils/webcomponent/append-style'
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import '../overlay-content'

import './style.scss'
const style = require('./style.scss').toString()

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
        format: (val) => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: toggleOptions
    }
}

const template = require('./index.html')
const componentName = `drop-down`
const componentRoot = `.${componentName}-container`
const closeIfOpen = host => {
    if (host.open) {
        requestAnimationFrame(() => {
            host.open = false
            host.blur()
        })
    }
}

const elements = {
    root: { selector: componentRoot },
    heading: {
        selector: `.drop-down-heading`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                mousedown: ObserveEvent(el, `mousedown`).subscribe(() => closeIfOpen(host))
            }
        }
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
        AppendStyle(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nonchild = true
    }

    setStyles(host.elements.injectedStyles, styleString)
    setStyles(host.elements.themedStyles, styleString)
    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const DropDown = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    properties,
    elements,
    observedAttributes: Object.keys(properties),
    onConnected(host) {
        host.tabIndex = `-1`

        const addClasses = () => {
            Array.from(host.children)
                .forEach((child: any) => {
                    if (child.getAttribute(`slot`) === `option`) {
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
            blur: ObserveEvent(host, `focusout`).subscribe(() => host.open = false),
            focus: ObserveEvent(host, `focus`).subscribe(() => host.open = true),
            slotObserver: slotObserver.disconnect
        }

        const overlay = host.elements.overlay

        overlay.target = host
        overlay.eventSubscriptions = { click: ObserveEvent(overlay, `click`).subscribe(() => closeIfOpen(host)) }
    },
    onDisconnected(host) {
        Object.keys(host.eventSubscriptions).forEach(key => {
            if (typeof host.eventSubscriptions[key] !== `function`) { return }
            try { host.eventSubscriptions[key]() } catch (error) { }
        })
    }
})

Define(componentName, DropDown)

export default DropDown