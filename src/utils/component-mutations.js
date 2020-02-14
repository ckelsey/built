import { FindFirst } from './find-first.js'
import { ForEach } from './for-each.js'
import { Filter } from './filter.js'

export function ComponentAttributeMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    mutation.target[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName)
}

export function getSlotName(el, key) {
    try {
        const name = el.getAttribute(key)
        return name === undefined || name === null ? '' : name
    } catch (error) {
        return ''
    }
}

export function GetMatchingSlot(host, name) {
    return FindFirst(function (slot) {
        return getSlotName(slot, 'slotname') === name
    }, host.slots)
}

function assignSlot(host, child) {
    if (!host || !host.slots || !host.slots.length || !child) {
        return false
    }

    const slotName = getSlotName(child, 'slot')
    let assigned = false

    ForEach(function assignSlotInner(slot) {
        if (getSlotName(slot, 'slotname') === slotName) {
            if (!child.slotObserver) {
                child.slotObserver = new MutationObserver(function slotObserver() {
                    host.slotted$.next(host.slotted$.value)
                })

                child.slotObserver.observe(child, {
                    attributes: true,
                    attributeFilter: ['slot'],
                })
            }
            host.slotted$.next(host.slotted$.value.concat(document.adoptNode(child)))
            assigned = true
        }
    }, host.slots)

    return assigned
}

export function ComponentChildMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    ForEach(function tryAssignSlot(child) { assignSlot(mutation.target, child) }, mutation.addedNodes, true)

    if (mutation.target.children$) {
        mutation.target.children$.next(Filter(function filterChildren(child) {
            return !child.contentFor
        }, mutation.target.childNodes))
    }
}

export function ComponentObserverConfig(attributes) {
    return {
        attributes: Array.isArray(attributes) && attributes.length ? true : false,
        attributeFilter: Array.isArray(attributes) ? attributes : [],
        childList: true
    }
}