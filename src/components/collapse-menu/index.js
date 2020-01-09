import { SetStyleRules } from '../../utils/set-style-rules.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { Throttle } from '../../utils/throttle.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToString } from '../../utils/to-string.js'
import { IndexOf } from '../../utils/index-of.js'
import { Get } from '../../utils/get.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WasClickedOn } from '../../utils/was-clicked-on.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { WCDefine } from '../../utils/wc-define.js'

const style = require(`./style.scss`).toString()
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
    const themeStyle = host.shadowRoot.querySelector(`style.themeStyles`)
    const injectedStyle = host.shadowRoot.querySelector(`style.injectedStyles`)
    const styleString = [
        style,
        host.theme,
        host.styles,
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
    setStyles(themeStyle, styleString)
    setStyles(injectedStyle, styleString)
}

const removeSizer = el => {
    (el.parentElement || el.parentNode.host).removeChild(el)
}

const createSizer = () => {
    const iframe = document.createElement(`iframe`)
    iframe.style.opacity = `0`
    iframe.style.position = `absolute`
    iframe.style.width = `100%`
    iframe.style.height = `100%`
    iframe.style.top = `0%`
    iframe.style.left = `0%`
    iframe.style.zIndex = `-1`
    iframe.style.pointerEvents = `none`
    iframe.style.border = `none`
    return iframe
}

const handleCollapse = (container, host) => {
    Throttle(() => {
        if (!host.collapseonwrap || host.expanded) { return }

        const scrollWidth = container.scrollWidth
        const width = container.offsetWidth
        const itemsWidth = host.elements.items.scrollWidth
        const hostWidth = host.scrollWidth
        const siblingsWidth = Array.from(container.children).reduce((total, current) => total + current.scrollWidth, -(hostWidth + host.sizer.scrollWidth))

        if (scrollWidth > width && !host.expandable) {
            host.expandable = true
        } else if (width >= itemsWidth + siblingsWidth) {
            host.expandable = false
        }
    }, host.throttle || 0)()
}

const setContainer = (container, host) => {
    if (host.sizer) { removeSizer(host.sizer) }
    if (!container || !host.collapseonwrap) { return }

    host.sizer = createSizer()
    container.appendChild(host.sizer)

    host.sizer.contentWindow.addEventListener(`resize`, () => handleCollapse(container, host))
    requestAnimationFrame(() => handleCollapse(container, host))
}

const handleMinWidth = host => {
    if (!host.minwidth) { return }

    if (host.minWidthSizer.scrollWidth < host.minwidth) {
        host.expandable = true
    } else {
        host.expandable = false
    }
}

const setMinWidth = (minWidth, host) => {
    if (!minWidth && host.minWidthSizer) { return removeSizer(host.minWidthSizer) }
    if (!minWidth) { return }

    const root = host.elements.root
    host.minWidthSizer = createSizer()
    root.appendChild(host.minWidthSizer)
    host.minWidthSizer.contentWindow.addEventListener(`resize`, () => handleMinWidth(host))

    requestAnimationFrame(() => handleMinWidth(host))
}

const setMinPageWidth = (minWidth, host) => {
    if (!minWidth) { return }

    const handlePageWidth = Throttle(host => {
        if (!host.minpagewidth) { return }
        if (window.innerWidth < host.minpagewidth) {
            host.expandable = true
        } else {
            host.expandable = false
        }
    }, 333)

    window.addEventListener(`resize`, () => handlePageWidth(host))

    handlePageWidth(host)
}

const setBackground = (color, el) => !el ? undefined : el.style.backgroundColor = color

const properties = {
    class: ComponentClassObject,
    expanded: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            setAttr(host.elements.root, `expanded`, val)
            setAttr(host, `expanded`, val)
        }
    },
    expandable: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            setAttr(host.elements.root, `expandable`, val)
            setAttr(host, `expandable`, val)

            if (!val) {
                host.expanded = false
            }
        }
    },
    throttle: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value
    },
    minwidth: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: setMinWidth,
    },
    minpagewidth: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: setMinPageWidth
    },
    collapseonwrap: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange(val, host) {
            const root = host.elements.root
            if (!root) { return }
            root.classList[val ? `add` : `remove`](`collapseonwrap`)
        }
    },
    direction: {
        format: val => Pipe(ToString, IndexOf(directions), IfInvalid(directions[0]))(val).value,
        onChange: (val, host) => setAttr(host.elements.root, `direction`, val)
    },
    align: {
        format: val => Pipe(ToString, IndexOf(alignments), IfInvalid(alignments[0]))(val).value,
        onChange: (val, host) => setAttr(host.elements.root, `align`, val)
    },
    background: {
        format: val => Pipe(ToString, IfInvalid(`none`))(val).value,
        onChange(val, host) { setBackground(val, host.elements.background) }
    },
    container: {
        format: (val, host) => Get(host, val, host),
        onChange: setContainer
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
    root: {
        selector: componentRoot,
        onChange(el, host) {
            setAttr(host.elements.root, `direction`, host.direction)
            el.classList[host.collapseonwrap ? `add` : `remove`](`collapseonwrap`)

            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(e => {
                    const items = Array.from(host.querySelectorAll(`[slot="item"]`))
                    let len = items.length

                    while (len) {
                        len = len - 1

                        if (WasClickedOn(items[len], e)) {
                            return host.dispatchEvent(new CustomEvent(`itemclick`, { detail: e }))
                        }
                    }
                })
            }
        }
    },
    items: { selector: `.collapse-menu-items` },
    background: {
        selector: `.collapse-menu-items-bg`,
        onChange(el, host) { setBackground(host.background, el) }
    },
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

        requestAnimationFrame(() => {
            setStyleElement(host)
            host.eventSubscriptions = {
                click: ObserveEvent(window, `click`).subscribe(e => {
                    if (!host.expanded) { return }

                    if (WasClickedOn(host.elements.root, e)) { host.expanded = false }
                }),
            }
        })
    },
    onDisconnected(host) {
        ObserverUnsubscribe(host)
    }
})

WCDefine(componentName, CollapseMenu)