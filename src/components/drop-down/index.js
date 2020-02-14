import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { ForEach } from '../../utils/for-each.js'
import { Get } from '../../utils/get.js'
import { WasClickedOn } from '../../utils/was-clicked-on.js'

function toggleOptions(show, host) {
    const overlay = host.elements.overlay
    const root = host.elements.root

    if (!root || !overlay) { return }
    if (show && overlay.showing) { return }

    try {
        overlay[show ? 'show' : 'hide']()
    } catch (error) { }

    DispatchEvent(host, show ? 'selectopen' : 'selectclose', host)
}

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'drop-down'
const componentRoot = ''.concat('.', componentName, '-container')

const properties = {
    open: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: toggleOptions
    },
    closeonclick: {
        format: function (val) { return Pipe(ToBool, IfInvalid(true))(val).value }
    }
}

const elements = {
    root: { selector: componentRoot },
    heading: {
        selector: '.drop-down-heading',
        onChange: function onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click', { useCapture: true }).subscribe(function clicked() { host.open = !host.open })
            }
        }
    },
    overlay: {
        selector: '.drop-down-overlay',
        onChange: function (el, host) { el.target = host }
    }
}

const DropDown = ComponentConstructor({
    componentName,
    componentRoot,
    template,
    style,
    properties,
    elements,
    observedAttributes: Object.keys(properties),
    onConnected(host) {
        function bindSlots(slots) {
            ForEach(function slotsEach(slot) {
                if (slot.slot !== 'drop-down-option') { return }

                if (!Get(slot, 'eventSubscriptions.click')) {
                    slot.eventSubscriptions = {
                        click: ObserveEvent(slot, 'click', { useCapture: true }).subscribe(function slotClicked(e) {
                            DispatchEvent(host, 'optionclick', { host: host, event: e, option: slot })

                            if (host.closeonclick && host.open) { host.open = false }
                        })
                    }
                }
            }, slots)
        }

        bindSlots(host.slotted$.value)

        // host.eventSubscriptions = {
        //     slots: host.slotted$.subscribe(bindSlots),
        //     docClick: ObserveEvent(document.body, 'click', { useCapture: true }).subscribe(function (e) {
        //         if (host.open && !WasClickedOn(host, e)) {
        //             return host.open = false
        //         }
        //     })
        // }
    }
})

Components.addComponent(componentName, DropDown)

export { DropDown }