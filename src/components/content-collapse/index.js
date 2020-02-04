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

const outerStyle = `content-collapse{display: block;}`
const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-collapse`
const componentRoot = `.${componentName}-container`

const properties = {
    expanded: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            host.setAttribute(`expanded`, val)

            if (host.group && val) {
                const parent = GetParent(host)

                Array
                    .from(parent ? parent.children : [])
                    .forEach(s => s !== host && s.group === host.group && s.expanded === true ? s.expanded = false : undefined)
            }

            WCWhenPropertyReady(host, `elements.transition.transition`)
                .then(transition => {
                    transition(val ? 1 : 0)
                    host.elements.icon.setAttribute(`rotation`, val ? `down` : `right`)
                })
        }
    },
    arrow: {
        format: val => Pipe(ToString, IfInvalid(iconChevron))(val).value,
        onChange(val, host) { WCWhenPropertyReady(host, `elements.icon`).then(el => el.svg = val) }
    },
    group: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange: (val, host) => WCWhenPropertyReady(host, `elements.transition`).then(transition => transition.speed = val)

    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: { selector: componentRoot, },
    transition: { selector: `.${componentName}-transition` },
    icon: { selector: `.${componentName}-toggler-icon` },
    toggler: {
        selector: `.${componentName}-toggler`,
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.expanded = !host.expanded),
                mouseenter: ObserveEvent(el, `mouseenter`).subscribe(() => el.classList.add(`hovering`)),
                mouseleave: ObserveEvent(el, `mouseleave`).subscribe(() => el.classList.remove(`hovering`))
            }
        }
    },
}

export const ContentCollapse = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes,
    properties,
    elements
})

WCDefine(componentName, ContentCollapse)