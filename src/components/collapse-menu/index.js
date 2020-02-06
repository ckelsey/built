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
import { ArrayFrom } from '../../utils/array-from.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()
const template = require('./index.html')
const componentName = 'collapse-menu'
const componentRoot = ''.concat('.', componentName, '-container')
const directions = ['horizontal', 'vertical']
const alignments = ['left', 'right']

function setAttr(el, attr, value) {
    return el ? el.setAttribute(attr, value) : undefined
}

function setMinPageWidth(minWidth, host) {
    if (!minWidth) { return }

    function throttleFn(host) {
        if (!host.minpagewidth) { return }
        if (window.innerWidth < host.minpagewidth) {
            host.expandable = true
        } else {
            host.expandable = false
        }
    }

    function resizeHandler() {
        handlePageWidth(host)
    }

    const handlePageWidth = Throttle(throttleFn, 333)

    window.addEventListener('resize', resizeHandler)

    handlePageWidth(host)
}

function setBackground(color, el) {
    return !el ? undefined : el.style.backgroundColor = color
}

function clickToggle(el, host) {
    if (!el.eventSubscriptions) {
        el.eventSubscriptions = {}
    }

    function subFn() {
        host.expanded = !host.expanded
    }

    el.eventSubscriptions.click = ObserveEvent(el, 'click').subscribe(subFn)
}

const properties = {
    expanded: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (val, host) {
            setAttr(host.elements.root, 'expanded', val)
            setAttr(host, 'expanded', val)
        }
    },
    expandable: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (val, host) {
            setAttr(host.elements.root, 'expandable', val)
            setAttr(host, 'expandable', val)

            if (!val) {
                host.expanded = false
            }
        }
    },
    minpagewidth: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(null))(val).value },
        onChange: setMinPageWidth
    },
    direction: {
        format: function (val) { return Pipe(ToString, IndexOf(directions), IfInvalid(directions[0]))(val).value },
        onChange: function (val, host) { setAttr(host.elements.root, 'direction', val) }
    },
    align: {
        format: function (val) { return Pipe(ToString, IndexOf(alignments), IfInvalid(alignments[0]))(val).value },
        onChange: function (val, host) { setAttr(host.elements.root, 'align', val) }
    },
    background: {
        format: function (val) { return Pipe(ToString, IfInvalid('none'))(val).value },
        onChange: function (val, host) { setBackground(val, host.elements.background) }
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: function (el, host) {
            setAttr(host.elements.root, 'direction', host.direction)
            el.classList[host.collapseonwrap ? 'add' : 'remove']('collapseonwrap')

            function subFn(e) {
                const items = ArrayFrom(host.querySelectorAll('[slot="item"]'))
                let len = items.length

                while (len) {
                    len = len - 1

                    if (WasClickedOn(items[len], e)) {
                        return host.dispatchEvent(new CustomEvent('itemclick', { detail: { event: e, item: items[len] } }))
                    }
                }
            }

            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(subFn)
            }
        }
    },
    items: { selector: '.collapse-menu-items' },
    background: {
        selector: '.collapse-menu-items-bg',
        onChange: function (el, host) { setBackground(host.background, el) }
    },
    toggle: {
        selector: '.collapse-menu-toggle',
        onChange: clickToggle
    },
    toggleInner: {
        selector: '.collapse-menu-toggle-inner',
        onChange: clickToggle
    }
}

export const CollapseMenu = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements
})

WCDefine(componentName, CollapseMenu)