import Observe from '../../utils/observe'
import ObserveEvent from '../../utils/observeEvent'
import { contentDrawerContainer, contentDrawerItems, itemRowSelector } from './elements'
import Timer from '../../services/timer'
import { EaseInOut } from '../../utils/curve'
import { setItemDefaultTransform, setItemHoverTransform } from './methods'
import { unsubscribeEvents } from '../../utils/webcomponent/elements'
import { imageLoader } from '../image-loader'


const duration = 400

export const hardCloseContentDrawer = host => {
    const container = contentDrawerContainer(host)
    container.classList.remove(`open`)

    contentDrawerItems(host).forEach(el => {
        try {
            host.removeChild(el)
        } catch (error) { }
    })
}

export const removeContentDrawerItems = (host, container, contents, removeAll = false, dispatchEvent = false) => new Promise(resolve => {
    if (!container) { return resolve() }

    container.classList.remove(`open`)

    const max = removeAll ? 0 : 1

    if (contents.length < max + 1) {
        return resolve()
    }

    while (contents.length > max) {
        const el = contents.shift()
        const height = el.offsetHeight
        el.style.height = `${height}px`
        el.classList.remove(`content-drawer-showing`)
        el.classList.remove(`content-drawer-shown`)

        Timer(
            duration,
            newHeight => el.style.height = `${newHeight}px`,
            EaseInOut([height, 0], duration),
            () => {
                try {
                    host.removeChild(el)
                } catch (error) { }
                return resolve()
            }
        )
    }

    if (!dispatchEvent) { return }

    host.dispatchEvent(new CustomEvent(`contentdrawerclose`, { detail: host }))
})

const onContentDrawerChange = (host, container, contents) => {
    if (host.updatingDrawer || !container || !contents || contents.length === 0) { return }

    host.updatingDrawer = true

    const containerHeight = contents && contents.length > 1 ? contents[0].offsetHeight : 0
    const content = contents[contents.length - 1]
    const contentImages = Array.from(content.querySelectorAll(`img`))

    container.style.height = `${containerHeight}px`

    removeContentDrawerItems(host, container, contents)

    container.classList.add(`open`)
    content.classList.add(`content-drawer-showing`)

    const afterImagesAreLoaded = () => {
        const contentHeight = content.scrollHeight

        scrollToContentDrawer(host, container, containerHeight)

        Timer(
            duration,
            newHeight => content.style.height = `${newHeight}px`,
            EaseInOut([0, contentHeight], duration),
            () => {
                content.style.removeProperty(`height`)
                content.classList.add(`content-drawer-shown`)
                content.classList.remove(`content-drawer-showing`)
                requestAnimationFrame(() => host.updatingDrawer = false)
            }
        )

        Timer(
            duration,
            newHeight => container.style.height = `${newHeight}px`,
            EaseInOut([containerHeight, contentHeight], duration),
            () => {
                container.style.removeProperty(`height`)
                container.style.removeProperty(`overflow`)
                requestAnimationFrame(() => host.updatingDrawer = false)
            }
        )

        positionContentDrawer(host)
    }

    if (contentImages.length === 0) { return afterImagesAreLoaded() }

    Promise
        .all(contentImages.map(image => imageLoader(image)))
        .then(afterImagesAreLoaded)
}

const scrollToContentDrawer = (host, contentDrawer, _containerHeight) => {
    const containerBox = contentDrawer.getBoundingClientRect()

    Timer(
        duration,
        y => window.scroll(0, y),
        EaseInOut([window.scrollY, window.scrollY + (containerBox.top - host.draweroffset)], duration),
        () => { }
    )
}

export const positionContentDrawer = host => {
    const container = contentDrawerContainer(host)
    const itemsContainer = host.elements.itemsContainer

    if (!itemsContainer || !container) { return }

    const slotIndex = container.targetElement ? container.targetElement.getAttribute(`slot`) : `0`
    const nextSibling = container.nextElementSibling
    const selector = `${itemRowSelector}[name="${slotIndex}"]`
    const row = host.shadowRoot.querySelector(selector)

    if (row && nextSibling !== row) {
        itemsContainer.insertBefore(container, row)
    }
}

export const triggerContentDrawer = (host, element) => {

    if (!element) { return }

    const container = contentDrawerContainer(host)
    const currentRow = container.rowIndex
    const itemRow = element.getAttribute(`slot`)
    const selector = `${itemRowSelector}[name="${itemRow}"]`
    const row = host.shadowRoot.querySelector(selector)

    container.targetElement = element
    container.rowIndex = itemRow || `0`

    const trigger = () => {
        host.elements.itemsContainer.insertBefore(container, row)
        host.dispatchEvent(new CustomEvent(`contentdraweropen`, { detail: { element, host } }))
    }

    if (itemRow !== currentRow) {
        return removeContentDrawerItems(host, container, contentDrawerItems(host), true)
            .then(trigger)
    }

    trigger()
}

export const eventObervers = host => ({
    beforeRefresh: Observe(host.itemsData),
    refreshed: Observe(host.itemsData),
    slotchanged: ObserveEvent(host.elements.slot, `slotchange`),
    resize: ObserveEvent(window, `resize`),
})

export const itemEvents = (host, item) => {
    unsubscribeEvents(item.element)

    item.element.eventSubscriptions = {
        click: ObserveEvent(item.element, `click`)
            .subscribe(() => {
                if (host.activeElement === item.element) {
                    const drawer = contentDrawerContainer(host)

                    if (drawer && !drawer.classList.contains(`open`)) {
                        triggerContentDrawer(host, item.element)
                    }
                }

                host.activeElement = item.element

                host.dispatchEvent(new CustomEvent(`itemclick`, { detail: { element: item.element, host } }))
            }),
        mouseenter: ObserveEvent(item.element, `mouseenter`)
            .subscribe(() => {
                setItemHoverTransform(host, item.element)
                item.element.classList.add(`visible-grid-item-hover`)
            }),
        mouseleave: ObserveEvent(item.element, `mouseleave`)
            .subscribe(() => {
                setItemDefaultTransform(host, item.element)
                item.element.classList.remove(`visible-grid-item-hover`)
            })
    }
}

export const setHostEvents = host => {
    host.events = eventObervers(host)

    host.events.slotchanged.subscribe(() => !!host.rendering ? undefined : host.refresh())

    host.events.resize.subscribe(() => host.refresh())

    host.elements.contentDrawer.addEventListener(
        `slotchange`,
        () => onContentDrawerChange(
            host,
            contentDrawerContainer(host),
            contentDrawerItems(host)
        )
    )
}

export const closeDrawerEvents = (el, host) => el.eventSubscriptions = {
    click: ObserveEvent(el, `click`)
        .subscribe(() =>
            removeContentDrawerItems(
                host,
                contentDrawerContainer(host),
                contentDrawerItems(host),
                true,
                true
            )
        )
}