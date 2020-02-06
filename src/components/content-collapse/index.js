/**
 * add ripple and bounce to toggle container
 */

import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { GetParent } from '../../utils/get-parent.js'
import { iconChevron } from '../../services/icons.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToString } from '../../utils/to-string.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ToNumber } from '../../utils/to-number.js'

const outerStyle = 'content-collapse{display: block;}'
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'content-collapse'
const componentRoot = ''.concat('.', componentName, '-container')

const properties = {
    expanded: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (val, host) {
            host.setAttribute('expanded', val)

            if (host.group && val) {
                const parent = GetParent(host)

                Array
                    .from(parent ? parent.children : [])
                    .forEach(function (s) { return s !== host && s.group === host.group && s.expanded === true ? s.expanded = false : undefined })
            }

            WCWhenPropertyReady(host, 'elements.transition.transition')
                .then(function (transition) {
                    transition(val ? 1 : 0)
                    host.elements.icon.setAttribute('rotation', val ? 'down' : 'right')
                })
        }
    },
    arrow: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(iconChevron))(val).value
        },
        onChange: function (val, host) {
            WCWhenPropertyReady(host, 'elements.icon').then(function (el) { el.svg = val })
        }
    },
    group: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        }
    },
    speed: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(333))(val).value
        },
        onChange: function (val, host) {
            return WCWhenPropertyReady(host, 'elements.transition')
                .then(function (transition) {
                    transition.speed = val
                })
        }

    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: { selector: componentRoot, },
    transition: { selector: '.'.concat(componentName, '-transition') },
    icon: { selector: '.'.concat(componentName, '-toggler-icon') },
    toggler: {
        selector: '.'.concat(componentName, '-toggler'),
        onChange: function (el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(function () { host.expanded = !host.expanded }),
                mouseenter: ObserveEvent(el, 'mouseenter').subscribe(function () { el.classList.add('hovering') }),
                mouseleave: ObserveEvent(el, 'mouseleave').subscribe(function () { el.classList.remove('hovering') })
            }
        }
    },
}

export const ContentCollapse = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements
})

WCDefine(componentName, ContentCollapse)