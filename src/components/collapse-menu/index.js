import { WCConstructor, WCDefine, ObserveEvent, ToNumber, IndexOf, ToString, IfInvalid, ToBool, Pipe, WasClickedOn, Throttle } from '../..'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const template = require(`./index.html`)
const componentName = `collapse-menu`
const componentRoot = `.${componentName}-container`
const directions = [`horizontal`, `vertical`]
const alignments = [`left`, `right`]
const setAttr = (el, attr, value) => el ? el.setAttribute(attr, value) : undefined

/** 
 * TODO
 * commented out collapse on wrap and minwidth settings as they are buggy at best
 */

// const removeSizer = el => (el.parentElement || el.parentNode.host).removeChild(el)

// const createSizer = () => {
//     const iframe = document.createElement(`iframe`)
//     iframe.style.opacity = `0`
//     iframe.style.position = `absolute`
//     iframe.style.width = `100%`
//     iframe.style.height = `100%`
//     iframe.style.top = `0%`
//     iframe.style.left = `0%`
//     iframe.style.zIndex = `-1`
//     iframe.style.pointerEvents = `none`
//     iframe.style.border = `none`
//     return iframe
// }

// const handleCollapse = (container, host) => {
//     Throttle(() => {
//         if (!host.collapseonwrap || host.expanded) { return }

//         const scrollWidth = container.scrollWidth
//         const width = container.offsetWidth
//         const itemsWidth = host.elements.items.scrollWidth
//         const hostWidth = host.scrollWidth
//         const siblingsWidth = Array.from(container.children).reduce((total, current) => total + current.scrollWidth, -(hostWidth + host.sizer.scrollWidth))

//         if (scrollWidth > width && !host.expandable) {
//             host.expandable = true
//         } else if (width >= itemsWidth + siblingsWidth) {
//             host.expandable = false
//         }
//     }, host.throttle || 0)()
// }

// const setContainer = (container, host) => {
//     if (host.sizer) { removeSizer(host.sizer) }
//     if (!container || !host.collapseonwrap) { return }

//     host.sizer = createSizer()
//     container.appendChild(host.sizer)

//     host.sizer.contentWindow.addEventListener(`resize`, () => handleCollapse(container, host))
//     requestAnimationFrame(() => handleCollapse(container, host))
// }

// const handleMinWidth = host => {
//     if (!host.minwidth) { return }

//     if (host.minWidthSizer.scrollWidth < host.minwidth) {
//         host.expandable = true
//     } else {
//         host.expandable = false
//     }
// }

// const setMinWidth = (minWidth, host) => {
//     if (!minWidth && host.minWidthSizer) { return removeSizer(host.minWidthSizer) }
//     if (!minWidth) { return }

//     const root = host.elements.root
//     host.minWidthSizer = createSizer()
//     root.appendChild(host.minWidthSizer)
//     host.minWidthSizer.contentWindow.addEventListener(`resize`, () => handleMinWidth(host))

//     requestAnimationFrame(() => handleMinWidth(host))
// }

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
const clickToggle = (el, host) => {
    if (!el.eventSubscriptions) {
        el.eventSubscriptions = {}
    }

    el.eventSubscriptions.click = ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded)
}

const properties = {
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
    minpagewidth: {
        format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
        onChange: setMinPageWidth
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

    // throttle: {
    //     format: val => Pipe(ToNumber, IfInvalid(0))(val).value
    // },
    // minwidth: {
    //     format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
    //     onChange: setMinWidth,
    // },
    // collapseonwrap: {
    //     format: val => Pipe(ToBool, IfInvalid(false))(val).value,
    //     onChange(val, host) {
    //         const root = host.elements.root
    //         if (!root) { return }
    //         root.classList[val ? `add` : `remove`](`collapseonwrap`)
    //     }
    // },
    // container: {
    //     format: (val, host) => Get(host, val, host),
    //     onChange: setContainer
    // }
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
                            return host.dispatchEvent(new CustomEvent(`itemclick`, { detail: { event: e, item: items[len] } }))
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
        onChange: clickToggle
    },
    toggleInner: {
        selector: `.collapse-menu-toggle-inner`,
        onChange: clickToggle
    }
}

export const CollapseMenu = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes,
    properties,
    elements
})

WCDefine(componentName, CollapseMenu)