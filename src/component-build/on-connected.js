import { States } from './states.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { ForIn } from '../utils/for-in.js'
import { CreateElements } from './create-elements.js'
import { ObserveEvent } from '../utils/observe-event.js'
import { ForEach } from '../utils/for-each.js'
import { Observer } from '../utils/observer.js'
import { ID } from '../services/id.js'
import { ObserveChildren } from '../utils/observe-children.js'

export function OnConnected(host) {
    let updateSlotsTimer

    function computedEach(value, key) {
        try { Object.defineProperty(host, key, value(host)) } catch (error) { }
    }

    function methodsEach(value, key) {
        host[key] = value(host)
    }

    function setPropFn(value, key) {
        return States(
            host,
            key,
            value.format,
            value.onChange,
            host.parameters.getters[key],
            host.parameters.setters[key]
        )
    }

    function finishConnectedFn() {
        host.parameters.onConnected(host)
        OnNextFrame(function () {
            host.ready = true
        })
    }

    function updateSlotted() {
        clearTimeout(updateSlotsTimer)

        const slotted = []

        function pushSlotted(child) { slotted.push(child) }
        function getAssigned(slot) { ForEach(pushSlotted, slot.assignedNodes()) }

        ForEach(getAssigned, host.shadowRoot.querySelectorAll('slot'))

        host.slotted$.next(slotted)
    }

    function slotChange(slot, index) {
        host.eventSubscriptions['slot-' + index] = ObserveEvent(slot, 'slotchange')
            .subscribe(function () {
                updateSlotsTimer = setTimeout(updateSlotted, 0)
            })
    }

    host.componentId = ID()
    host.eventSubscriptions = {}

    if (host.parameters.observeSlots) {
        host.slotted$ = Observer([])
        ForEach(slotChange, host.shadowRoot.querySelectorAll('slot'))
        updateSlotsTimer = setTimeout(updateSlotted, 0)
    }

    if (host.parameters.observeChildren) {
        host.children$ = ObserveChildren(host, true)
    }

    ForIn(computedEach, host.parameters.computed)
    ForIn(methodsEach, host.parameters.methods)


    ForIn(setPropFn, host.parameters.properties)

    if (host.parameters.elements) {
        host.elements = CreateElements(host, host.parameters.elements)
    }

    OnNextFrame(finishConnectedFn)
}