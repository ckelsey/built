import ID from '../../utils/id'
import ObserveEvent from '../../utils/observeEvent'
import { itemEvents, hardCloseContentDrawer } from './events'
import { itemRowSelector, itemRowClass } from './elements'

const loadItemImage = image => new Promise(resolve => {
    if (!image || image.tagName !== `IMG`) { return resolve() }

    const isLoaded = () => image.width > 0 && image.height > 0

    const resolveIfLoaded = () => {
        if (!isLoaded() && !image.error) { return false }

        errorObserver()
        loadObserver()

        if (image.error) {
            resolve()
        } else {
            resolve(image)
        }

        return true
    }

    const loadObserver = ObserveEvent(image, `load`).subscribe(() => {
        requestAnimationFrame(() => {
            if (resolveIfLoaded()) { return loadObserver() }
        })
    })

    const errorObserver = ObserveEvent(image, `error`).subscribe(e => {
        image.error = e
        resolveIfLoaded()
    })

    resolveIfLoaded()
})

const loadItemImages = images => !images || !Array.isArray(images)
    ? Promise.reject()
    : Promise
        .all(images.map(loadItemImage))

const createSlot = (index, container) => {
    const slot = document.createElement(`slot`) as any
    slot.setAttribute(`name`, `${index}`)
    slot.classList.add(itemRowClass)
    slot.name = `${index}`
    slot.width = 0
    container.appendChild(slot)

    return slot
}

const removeEmptySlot = (host, slot) => {
    const elements: any[] = Array.from(host.querySelectorAll(`[slot="${slot.getAttribute(`name`)}"]`))

    if (!elements || !elements.length) {
        if (slot.parentElement) {
            slot.parentElement.removeChild(slot)
        }

        return true
    }

    return false
}

const setSlotElementsSize = (host, slot, containerWidth) => {
    const height = host.targetheight
    const initialScale = containerWidth / slot.width
    const scale = initialScale > 1.38 ? 1 : initialScale
    const elements: any[] = Array.from(host.querySelectorAll(`[slot="${slot.getAttribute(`name`)}"]`))

    elements.forEach(element => {
        element.style.height = `calc(${height} * ${scale})`
        element.style.width = `${((element.width / containerWidth) * 100) * scale}%`
        element.classList.add(`visible-grid-item`)
        setItemDefaultTransform(host, element)
    })
}

const removeSlots = host => {
    Array
        .from(host.shadowRoot.querySelectorAll(itemRowSelector))
        .forEach((slot: HTMLSlotElement) => !slot.parentElement ? undefined : slot.parentElement.removeChild(slot))
}

const AssignItem = (container, containerWidth) => (item, lastSlot) => {
    let slot = lastSlot

    if (slot === undefined) {
        slot = container.querySelector(itemRowSelector)
    }

    if (!slot) {
        slot = createSlot(0, container)
    }

    item.element.width = item.element.offsetWidth

    let slotName = slot.getAttribute(`name`)
    const possibleSlotWidth = slot.width + item.element.width
    const canBeAssignedToSlot =
        possibleSlotWidth <= containerWidth ||
        (containerWidth - slot.width) / item.element.width > 0.38

    if (canBeAssignedToSlot) {
        slot.width = possibleSlotWidth
        item.element.setAttribute(`slot`, slotName)
    } else {
        slot = createSlot(parseInt(slotName) + 1, container)
        slotName = slot.getAttribute(`name`)
        slot.width = item.element.width
        item.element.setAttribute(`slot`, slotName)
    }

    return slot
}

const initializeItem = (host, item) => {
    item.element.removeAttribute(`slot`)
    item.element.style.height = !!host.targetheight ? /^\d+$/.test(host.targetheight) ? `${host.targetheight}px` : host.targetheight : ``
    item.element.style.removeProperty(`width`)

    itemEvents(host, item)

    return item
}

const setElementTransform = (element, spacing) => {
    const w = element.offsetWidth
    const h = element.offsetHeight
    element.style.transform = `translateZ(0) scale(${1 - (spacing / Math.max(w, h))})`
}

export const setItemDefaultTransform = (host, element) => setElementTransform(element, host.spacing)

export const setItemHoverTransform = (host, element) => setElementTransform(element, host.hoverspacing)

export const refresh = host => () => new Promise((resolve) => {
    let maxTries = 5000

    const run = container => {
        const renderID = ID()
        host.rendering = renderID
        host.elements.root.classList.add(`refreshing`)

        const items = host.itemsData.map(item => initializeItem(host, item))

        removeSlots(host)
        hardCloseContentDrawer(host)

        const containerWidth = container.getBoundingClientRect().width
        const assignItem = AssignItem(container, containerWidth)

        let assignedIndex = 0
        let currentSlot = undefined
        const loaded = []
        const assigned = []

        const finishRender = () => {
            if (host.rendering !== renderID) { return resolve(`invalid render`) }

            Array
                .from(container.querySelectorAll(itemRowSelector))
                .forEach(slot => {
                    if (removeEmptySlot(host, slot)) { return }
                    setSlotElementsSize(host, slot, containerWidth)
                })

            host.elements.root.classList.remove(`refreshing`)

            requestAnimationFrame(() => {
                host.rendering = undefined
                host.dispatchEvent(new CustomEvent(`itemsrendered`, { detail: host }))
                resolve()
            })
        }

        const assignNext = () => {
            if (host.rendering !== renderID) { return resolve(`invalid render`) }

            if (loaded.indexOf(assignedIndex) === -1) { return }

            const next = items[assignedIndex]

            if (!next) { return }

            currentSlot = assignItem(next, currentSlot)
            assignedIndex = assignedIndex + 1
            assigned.push(next.index)

            if (assigned.length === items.length) { return finishRender() }

            assignNext()
        }

        items
            .forEach(item => {
                loadItemImages(item.images)
                    .then(() => {
                        if (host.rendering !== renderID) { return resolve(`invalid render`) }

                        loaded.push(item.index)

                        assignNext()
                    })
            })
    }

    const tryRun = () => {
        if (!maxTries) { return resolve(`elements not found`) }

        const container = host.elements.itemsContainer

        if (!container) { return requestAnimationFrame(tryRun) }

        // clearTimeout(host.refreshTimer)

        // host.refreshTimer = setTimeout(() => {
        //     requestAnimationFrame(() => {
        //         run(container)
        //     })
        // }, 33)

        run(container)
    }

    tryRun()
})