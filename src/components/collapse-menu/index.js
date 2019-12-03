/**
 * add ripple and bounce to toggle container
 */

import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, AppendStyleElement, ComponentClassObject, WCDefine, ObserverUnsubscribe,
    ObserveEvent, ToNumber, IndexOf, ToString, IfInvalid, ToBool, Pipe, SetStyleRules
} from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `collapse-menu`
const componentRoot = `.${componentName}-container`
const directions = [`horizontal`, `vertical`]
const alignments = [`left`, `right`]

const setStyles = (el, styles) => el ? SetStyleRules(el, styles) : undefined
const setAttr = (el, attr, value) => el ? el.setAttribute(attr, value) : undefined

export const setStyleElement = host => {
    let outerStyle = host.querySelector(`style[name="outer"]`)
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)

    const styleString = [
        style,
        host.theme,
        host.styles
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const waitForElement = (host, key) => new Promise((resolve, reject) => {
    let max = 1000
    const here = () => {
        max = max - 1
        if (!max) { return reject() }
        const el = host.elements[key]
        if (el) { return resolve(el) }
        requestAnimationFrame(here)
    }
    here()
})

const resetExpandable = host => {
    if (!host.collapseonwrap && !host.minwidth && !host.minpagewidth && host.expandable) {
        host.expandable = false
    }
}

const observeSize = (on, host) => {
    const run = sizer => {
        ObserverUnsubscribe(sizer)

        if (!on) { return resetExpandable(host) }

        const handleSizeChange = () => host.expandable = host.offsetWidth < host.minwidth

        handleSizeChange()

        sizer.eventSubscriptions = {
            resize: ObserveEvent(sizer.contentWindow, `resize`).subscribe(handleSizeChange)
        }
    }

    waitForElement(host, `sizer`)
        .then(run)
        .catch(() => { })
}

const observeWrapSize = (on, host) => {
    const run = sizer => {
        ObserverUnsubscribe(sizer)

        if (!on) { return resetExpandable(host) }

        const handleSizeChange = () => {
            const width = Array
                .from(host.querySelectorAll(`[slot="item"]`))
                .reduce((totalWidth, el) => {
                    totalWidth = el.offsetWidth + totalWidth
                    return totalWidth
                }, 0)

            host.expandable = host.offsetWidth < width
        }

        handleSizeChange()

        sizer.eventSubscriptions = {
            resize: ObserveEvent(sizer.contentWindow, `resize`).subscribe(handleSizeChange)
        }
    }

    waitForElement(host, `wrapSizer`)
        .then(run)
        .catch(() => { })
}

const observeWindowSize = (on, host) => {
    const run = root => {
        ObserverUnsubscribe(root)

        if (!on) { return resetExpandable(host) }

        const handleWindowSize = () => host.expandable = window.innerWidth < host.minpagewidth
        handleWindowSize()

        root.eventSubscriptions = {
            resize: ObserveEvent(window, `resize`).subscribe(handleWindowSize)
        }
    }

    waitForElement(host, `root`)
        .then(run)
        .catch(() => { })
}

const updateStyles = host => {
    const items = host.elements.items
    items.removeAttribute(`style`)

    if (host.expandable) {
        items.style.display = `none`
        requestAnimationFrame(() => {
            items.style.background = host.background

            requestAnimationFrame(() => {
                const transitionString = `transform ${host.speed}ms, opacity ${host.speed * 0.62}ms`
                items.style.transition = host.expandable ? transitionString : `none`
                items.style.removeProperty(`display`)
            })
        })
    }
}

const properties = {
    class: ComponentClassObject,
    expanded: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            setAttr(host.elements.root, `expanded`, val)
            setAttr(host, `expanded`, val)

            clearTimeout(host.horizontalItemsChange)
            const items = host.elements.items
            if (!items || host.direction === `vertical`) { return }

            if (val) {
                items.style.flexDirection = `column`
                items.style.margin = `0px`
                items.style.minWidth = `200px`
            } else {
                host.horizontalItemsChange = setTimeout(() => {
                    items.style.removeProperty(`flex-direction`)
                    items.style.removeProperty(`margin`)
                    items.style.removeProperty(`min-width`)
                }, host.speed * 1.1)
            }
        }
    },
    expandable: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            setAttr(host.elements.root, `expandable`, val)
            setAttr(host, `expandable`, val)
            updateStyles(host)
        }
    },
    minwidth: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: observeSize,
    },
    minpagewidth: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: observeWindowSize
    },
    collapseonwrap: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: observeWrapSize,
    },
    direction: {
        format: val => Pipe(ToString, IndexOf(directions), IfInvalid(directions[0]))(val).value,
        onChange: (val, host) => setAttr(host.elements.root, `direction`, val)
    },
    align: {
        format: val => Pipe(ToString, IndexOf(alignments), IfInvalid(alignments[0]))(val).value,
        onChange: (val, host) => setAttr(host.elements.root, `align`, val)
    },
    container: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange(_val, host) { updateStyles(host) }
    },
    background: {
        format: val => Pipe(ToString, IfInvalid(`none`))(val).value,
        onChange(_val, host) { updateStyles(host) }
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setStyleElement(host)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setStyleElement(host)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: { selector: componentRoot, },
    items: { selector: `.collapse-menu-items`, },
    sizer: { selector: `.collapse-menu-sizer`, },
    wrapSizer: { selector: `.collapse-menu-wrap-sizer`, },
    internalStyles: { selector: `style.internalStyles` },
    toggle: {
        selector: `.collapse-menu-toggle`,
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded)
            }
        }
    },
    toggleInner: {
        selector: `.collapse-menu-toggle-inner`,
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded)
            }
        }
    }
}

export const CollapseMenu = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onConnected(host) {
        setStyleElement(host)

        const targetIsInHost = parent => {
            let isInHost = false

            try {
                while (!isInHost && parent && parent !== document.body) {
                    if (host.contains(parent) || parent === host) {
                        isInHost = true
                    }

                    parent = parent.parentElement
                }
            } catch (error) { }

            return isInHost
        }

        requestAnimationFrame(() => {
            host.eventSubscriptions = {
                click: ObserveEvent(window, `click`).subscribe(e => {
                    if (!host.expanded) { return }

                    const target = e.target
                    const root = host.elements.root

                    if (!root) { return }

                    if (target !== host && !host.contains(target) && !root.contains(target) && !targetIsInHost(target)) {
                        host.expanded = false
                    }
                })
            }
        })
    },
    onDisconnected(host) {
        ObserverUnsubscribe(host)
    }
})

WCDefine(componentName, CollapseMenu)