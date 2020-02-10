import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { ObserveSlots } from '../../utils/observe-slots.js'
import { WasClickedOn } from '../../utils/was-clicked-on.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()

function toggleOptions(show, host) {
    const overlay = host.elements.overlay
    const root = host.elements.root

    if (!root || !overlay) { return }
    if (show && overlay.showing) { return }

    try { overlay[show ? 'show' : 'hide']() } catch (error) { }

    OnNextFrame(() => {
        if (!show) {
            root.classList.remove('opened')
        } else {
            root.classList.add('opened')
        }

        DispatchEvent(host, show ? 'selectopen' : 'selectclose', host)
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

const template = require('./index.html')
const componentName = 'drop-down'
const componentRoot = ''.concat('.', componentName, '-container')
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
    heading: { selector: '.drop-down-heading' },
    overlay: {
        selector: '.drop-down-overlay',
        onChange: function (el, host) {
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
        host.tabIndex = '0'

        const addClasses = () => {
            Array.from(host.children)
                .forEach(child => {
                    if (child.getAttribute('slot') === 'option') {
                        child.tabIndex = '0'
                        child.classList.add('drop-down-option')
                    }
                })
        }

        addClasses()

        host.eventSubscriptions = {
            slotObserver: ObserveSlots(host, true).subscribe(addClasses),
            docClick: ObserveEvent(document.body, 'click').subscribe(e => {
                if (!WasClickedOn(host, e)) {
                    return host.open ? openClose(false, host) : undefined
                }

                if (WasClickedOn(Array.from(host.querySelectorAll('[slot="option"]')), e)) {
                    DispatchEvent(host, 'optionclick', { host: host, event: e })
                }

                if (WasClickedOn([host.elements.heading, host.querySelector('[slot="label"]')], e)) {
                    DispatchEvent(host, 'labelclick', { host: host, event: e })

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