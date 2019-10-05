import ID from '../../utils/id'
import { itemEvents, hardCloseContentDrawer } from './events'
import { itemRowSelector, itemRowClass } from './elements'
import throttle from '../../utils/throttle'

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
    const fill = host.fillrow

    elements.forEach(element => {
        if (!fill) {
            element.style.height = height
            element.style.removeProperty(`width`)
        } else {
            element.style.height = `calc(${height} * ${scale})`
            element.style.width = `${((element.width / containerWidth) * 100) * scale}%`
        }

        element.classList.add(`visible-grid-item`)
        setItemDefaultTransform(host, element)
    })
}

const removeSlots = host => {
    Array
        .from(host.shadowRoot.querySelectorAll(itemRowSelector))
        .forEach((slot: HTMLSlotElement) => !slot.parentElement ? undefined : slot.parentElement.removeChild(slot))
}

const AssignItem = (container, containerWidth, fillrow) => (item, lastSlot) => {
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
    const tooWide = possibleSlotWidth >= containerWidth
    const butTolerable = (containerWidth - slot.width) / item.element.width > 0.38
    const isTolerable = !tooWide
        ? true
        : !fillrow
            ? false
            : butTolerable

    if (isTolerable) {
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

export const refresh = host => throttle(() => {
    let maxTries = 5000

    const run = container => {
        const renderID = ID()
        host.rendering = renderID
        host.elements.root.classList.add(`refreshing`)

        const items = host.itemsData.map(item => initializeItem(host, item))

        removeSlots(host)
        hardCloseContentDrawer(host)

        const containerWidth = container.getBoundingClientRect().width
        const assignItem = AssignItem(container, containerWidth, host.fillrow)
        const loaded = []
        const assigned = []
        let assignedIndex = 0
        let currentSlot = undefined

        const finishRender = () => {
            if (host.rendering !== renderID) { return }

            Array
                .from(container.querySelectorAll(itemRowSelector))
                .forEach(slot => {
                    if (removeEmptySlot(host, slot)) { return }
                    setSlotElementsSize(host, slot, containerWidth)
                })

            host.elements.root.classList.remove(`refreshing`)
            requestAnimationFrame(() => {
                host.rendering = undefined
                host.setAttribute(`ready`, `true`)
                host.dispatchEvent(new CustomEvent(`itemsrendered`, { detail: host }))
            })
        }

        const assignNext = () => {
            if (host.rendering !== renderID) { return }

            if (loaded.indexOf(assignedIndex) === -1) { return }

            const next = items[assignedIndex]

            if (!next) { return }

            currentSlot = assignItem(next, currentSlot)
            assignedIndex = assignedIndex + 1
            assigned.push(next.index)

            if (assigned.length === items.length) { return finishRender() }

            assignNext()
        }

        items.forEach(item => {
            const imagesDone = results => {
                if (host.rendering !== renderID) { return }

                if (results.filter(v => !!v).length) {
                    return run(container)
                }

                loaded.push(item.index)
                assignNext()
            }

            if (!Array.isArray(item.images)) { return imagesDone([]) }

            return Promise.all(item.images
                .map(image => {


                    return new Promise(resolve => {
                        let hasErrored = false

                        const hasDimensions = () => !!image.width && image.width > 0 && !!image.height && image.height > 0

                        if (!image || !image.src || hasDimensions()) {
                            return resolve(false)
                        }

                        const checkDimensions = () => {
                            if (hasErrored || hasDimensions()) {
                                return resolve(true)
                            }

                            requestAnimationFrame(checkDimensions)
                        }

                        image.addEventListener(`error`, function errored() {
                            image.removeEventListener(`error`, errored, false)
                            hasErrored = true
                            return resolve(true)
                        }, false)

                        checkDimensions()
                    })
                })
            )
                .then(imagesDone)
        })
    }

    const tryRun = () => {
        if (!maxTries) { return }

        const container = host.elements.itemsContainer

        if (!container) { return requestAnimationFrame(tryRun) }

        run(container)
    }

    tryRun()
}, 100)

export const getComponentStyles = host => () => `${require('./style.scss').toString()}${host.theme || ``}${host.styles}`