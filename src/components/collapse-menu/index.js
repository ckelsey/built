import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { Throttle } from '../../utils/throttle.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { IndexOf } from '../../utils/index-of.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WasClickedOn } from '../../utils/was-clicked-on.js'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const template = require(`./index.html`)
const componentName = `collapse-menu`
const componentRoot = `.${componentName}-container`
const directions = [`horizontal`, `vertical`]
const alignments = [`left`, `right`]
const setAttr = (el, attr, value) => el ? el.setAttribute(attr, value) : undefined

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