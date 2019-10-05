// import { contentDrawerContainer, contentDrawerItems, itemRowSelector } from './elements'
// import { contentDrawerContainer, contentDrawerItems } from './elements'

// import ID from '../../utils/id'
// import { itemEvents, hardCloseContentDrawer } from './events'

// const setSlotElementsSize = (host, slot, containerWidth) => {
//     const height = host.targetheight
//     const initialScale = containerWidth / slot.width
//     const scale = initialScale > 1.38 ? 1 : initialScale
//     const elements: any[] = Array.from(host.querySelectorAll(`[slot="${slot.getAttribute(`name`)}"]`))
//     const fill = host.fillrow

//     elements.forEach(element => {
//         if (!fill) {
//             element.style.height = height
//             element.style.removeProperty(`width`)
//         } else {
//             element.style.height = `calc(${height} * ${scale})`
//             element.style.width = `${((element.width / containerWidth) * 100) * scale}%`
//         }

//         element.classList.add(`visible-grid-item`)
//         // setItemDefaultTransform(host, element)
//     })
// }



// const setElementTransform = (element, spacing) => {
//     const w = element.offsetWidth
//     const h = element.offsetHeight
//     element.style.transform = `translateZ(0) scale(${1 - (spacing / Math.max(w, h))})`
// }

// export const setItemDefaultTransform = (host, element) => setElementTransform(element, host.spacing)

// export const setItemHoverTransform = (host, element) => setElementTransform(element, host.hoverspacing)

// export const refresh = host => throttle(() => {
//     let maxTries = 5000

//     const run = container => {
//         // const renderID = ID()
//         // host.rendering = renderID
//         // host.elements.root.classList.add(`refreshing`)

//         const items = host.itemsData.map(item => initializeItem(host, item))

//         removeSlots(host)
//         hardCloseContentDrawer(host)

//         const containerWidth = container.getBoundingClientRect().width
//         const assignItem = AssignItem(container, containerWidth, host.fillrow)
//         const loaded = []
//         const assigned = []
//         let assignedIndex = 0
//         let currentSlot = undefined

//         const finishRender = () => {
//             if (host.rendering !== renderID) { return }

//             Array
//                 .from(container.querySelectorAll(itemRowSelector))
//                 .forEach(slot => {
//                     if (removeEmptySlot(host, slot)) { return }
//                     setSlotElementsSize(host, slot, containerWidth)
//                 })

//             host.elements.root.classList.remove(`refreshing`)
//             requestAnimationFrame(() => {
//                 host.rendering = undefined
//                 host.setAttribute(`ready`, `true`)
//                 host.dispatchEvent(new CustomEvent(`itemsrendered`, { detail: host }))
//             })
//         }

//         const assignNext = () => {
//             if (host.rendering !== renderID) { return }

//             if (loaded.indexOf(assignedIndex) === -1) { return }

//             const next = items[assignedIndex]

//             if (!next) { return }

//             currentSlot = assignItem(next, currentSlot)
//             assignedIndex = assignedIndex + 1
//             assigned.push(next.index)

//             if (assigned.length === items.length) { return finishRender() }

//             assignNext()
//         }

//         items.forEach(item => {
//             const imagesDone = results => {
//                 if (host.rendering !== renderID) { return }

//                 if (results.filter(v => !!v).length) {
//                     return run(container)
//                 }

//                 loaded.push(item.index)
//                 assignNext()
//             }

//             if (!Array.isArray(item.images)) { return imagesDone([]) }

//             return Promise.all(item.images
//                 .map(image => new Promise(resolve => {
//                     let hasErrored = false

//                     const hasDimensions = () => !!image.width && image.width > 0 && !!image.height && image.height > 0

//                     if (!image || !image.src || hasDimensions()) {
//                         return resolve(false)
//                     }

//                     const checkDimensions = () => {
//                         if (hasErrored || hasDimensions()) {
//                             return resolve(true)
//                         }

//                         requestAnimationFrame(checkDimensions)
//                     }

//                     image.addEventListener(`error`, function errored() {
//                         image.removeEventListener(`error`, errored, false)
//                         hasErrored = true
//                         return resolve(true)
//                     }, false)

//                     checkDimensions()
//                 }))
//             )
//                 .then(imagesDone)
//         })
//     }

//     const tryRun = () => {
//         if (!maxTries) { return }

//         const container = host.elements.itemsContainer

//         if (!container) { return requestAnimationFrame(tryRun) }

//         run(container)
//     }

//     tryRun()
// }, 100)


// export const itemElements = host => ({
//     get() {
//         return Array
//             .from(host.children)
//             .filter(
//                 (el: HTMLElement) =>
//                     el.getAttribute(`slot`) !== `content-drawer`
//             )
//     }
// })
// contentDrawer: {
//     selector: `slot[name="content-drawer"]`
// },

// export const contentDrawerContainer = host => host.elements.root.querySelector(`.grid-layout-content-drawer`)

// export const contentDrawerItems = host => Array
//     .from(host.querySelectorAll(`[slot="content-drawer"]`))
//     .map((el: any) => {
//         el.classList.add(`content-drawer-item`)
//         return el
//     })

    // draweroffset: {
    //     format: val => pipe(ToNumber, IfInvalid(0))(val).value,
    // },


/*
<div class="grid-layout-content-drawer">
            <slot name="content-drawer"></slot>
            <div class="grid-layout-content-drawer-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </div>
        </div>
*/
// export const properties = Object.freeze(Object.assign({}, attributes, {
//     activeElement: {
//         format: val => pipe(IsElement, IfInvalid(null))(val).value,
//         onChange: (val, host) => {
//             if (!val || (val.classList && val.classList.contains(activeElementClass))) { return }

//             triggerContentDrawer(host, val)
//             host.itemElements.forEach(el => el.classList[el === val ? `add` : `remove`](activeElementClass))
//         }
//     }
// }))

// filter: {
//     format: val => typeof val === `string` ? val : ``,
//         onChange: (_val, host) => {
//             removeContentDrawerItems(
//                 host,
//                 contentDrawerContainer(host),
//                 contentDrawerItems(host),
//                 true,
//                 true
//             )
//             host.refresh()
//         }
// },

// import { closeDrawerEvents } from './events'

// export const setStyles = (el, host, styles) => {
//     if (!el) { return }
//     SetStyleRules(el, styles || host.styles)
// }

// export const itemRowClass = `item-row`
// export const itemRowSelector = `slot.${itemRowClass}`
// export const activeElementClass = `active-grid-element`

// const elements = {
//     root: {
//         selector: `.grid-layout-container`,
//     },
//     slot: {
//         selector: `slot[master]`,
//     },
//     contentDrawer: {
//         selector: `slot[name="content-drawer"]`
//     },
//     injectedStyles: {
//         selector: `style.injectedStyles`,
//         onChange: setStyles
//     },
//     itemsContainer: {
//         selector: `.grid-layout-items`,
//         onChange: (_el, host) => host.refresh()
//     },
//     closeButton: {
//         selector: `.grid-layout-content-drawer-close`,
//         onChange: closeDrawerEvents
//     }
// }

// export const closeDrawerEvents = (el, host) => el.eventSubscriptions = {
//     click: ObserveEvent(el, `click`)
//         .subscribe(() =>
//             removeContentDrawerItems(
//                 host,
//                 contentDrawerContainer(host),
//                 contentDrawerItems(host),
//                 true,
//                 true
//             )
//         )
// }

// export const setHostEvents = host => {
//     host.events = eventObervers(host)

//     host.events.slotchanged.subscribe(() => !!host.rendering ? undefined : host.refresh())

//     host.events.resize.subscribe(() => host.refresh())

//     host.elements.contentDrawer.addEventListener(
//         `slotchange`,
//         () => onContentDrawerChange(
//             host,
//             contentDrawerContainer(host),
//             contentDrawerItems(host)
//         )
//     )
// }

// export const itemEvents = (host, item) => {
//     host.unsubscribeEvents(item.element)

//     item.element.eventSubscriptions = {
//         click: ObserveEvent(item.element, `click`)
//             .subscribe(() => {
//                 if (host.activeElement === item.element) {
//                     const drawer = contentDrawerContainer(host)

//                     if (drawer && !drawer.classList.contains(`open`)) {
//                         triggerContentDrawer(host, item.element)
//                     }
//                 }

//                 host.activeElement = item.element

//                 host.dispatchEvent(new CustomEvent(`itemclick`, { detail: { element: item.element, host } }))
//             }),
//         // mouseenter: ObserveEvent(item.element, `mouseenter`)
//         //     .subscribe(() => {
//         //         // setItemHoverTransform(host, item.element)
//         //         item.element.classList.add(`visible-grid-item-hover`)
//         //     }),
//         // mouseleave: ObserveEvent(item.element, `mouseleave`)
//         //     .subscribe(() => {
//         //         // setItemDefaultTransform(host, item.element)
//         //         item.element.classList.remove(`visible-grid-item-hover`)
//         //     })
//     }
// }

// import Timer from '../../services/timer'
// import { EaseInOut } from '../../utils/curve'
// // import { setItemDefaultTransform, setItemHoverTransform } from './methods'
// import { imageLoader } from '../image-loader'

// const duration = 400

// export const hardCloseContentDrawer = host => {
//     const container = contentDrawerContainer(host)
//     container.classList.remove(`open`)

//     contentDrawerItems(host).forEach(el => {
//         try {
//             host.removeChild(el)
//         } catch (error) { }
//     })
// }

// export const removeContentDrawerItems = (host, container, contents, removeAll = false, dispatchEvent = false) => new Promise(resolve => {
//     if (!container) { return resolve() }

//     container.classList.remove(`open`)

//     const max = removeAll ? 0 : 1

//     if (contents.length < max + 1) {
//         return resolve()
//     }

//     while (contents.length > max) {
//         const el = contents.shift()
//         const height = el.offsetHeight
//         el.style.height = `${height}px`
//         el.classList.remove(`content-drawer-showing`)
//         el.classList.remove(`content-drawer-shown`)

//         Timer(
//             duration,
//             newHeight => el.style.height = `${newHeight}px`,
//             EaseInOut([height, 0], duration),
//             () => {
//                 try {
//                     host.removeChild(el)
//                 } catch (error) { }
//                 return resolve()
//             }
//         )
//     }

//     if (!dispatchEvent) { return }

//     host.dispatchEvent(new CustomEvent(`contentdrawerclose`, { detail: host }))
// })

// const onContentDrawerChange = (host, container, contents) => {
//     if (host.updatingDrawer || !container || !contents || contents.length === 0) { return }

//     host.updatingDrawer = true
//     /* TODO use resize detection, not based on images */
//     const containerHeight = contents && contents.length > 1 ? contents[0].offsetHeight : 0
//     const content = contents[contents.length - 1]
//     const contentImages = Array.from(content.querySelectorAll(`img`))

//     container.style.height = `${containerHeight}px`

//     removeContentDrawerItems(host, container, contents)

//     container.classList.add(`open`)
//     content.classList.add(`content-drawer-showing`)

//     const afterImagesAreLoaded = () => {
//         const contentHeight = content.scrollHeight

//         scrollToContentDrawer(host, container, containerHeight)

//         Timer(
//             duration,
//             newHeight => content.style.height = `${newHeight}px`,
//             EaseInOut([0, contentHeight], duration),
//             () => {
//                 content.style.removeProperty(`height`)
//                 content.classList.add(`content-drawer-shown`)
//                 content.classList.remove(`content-drawer-showing`)
//                 requestAnimationFrame(() => host.updatingDrawer = false)
//             }
//         )

//         Timer(
//             duration,
//             newHeight => container.style.height = `${newHeight}px`,
//             EaseInOut([containerHeight, contentHeight], duration),
//             () => {
//                 container.style.removeProperty(`height`)
//                 container.style.removeProperty(`overflow`)
//                 requestAnimationFrame(() => host.updatingDrawer = false)
//             }
//         )

//         positionContentDrawer(host)
//     }

//     if (contentImages.length === 0) { return afterImagesAreLoaded() }

//     Promise
//         .all(contentImages.map(image => imageLoader(image)))
//         .then(afterImagesAreLoaded)
// }

// const scrollToContentDrawer = (host, contentDrawer, _containerHeight) => {
//     const containerBox = contentDrawer.getBoundingClientRect()

//     Timer(
//         duration,
//         y => window.scroll(0, y),
//         EaseInOut([window.scrollY, window.scrollY + (containerBox.top - host.draweroffset)], duration),
//         () => { }
//     )
// }

// export const positionContentDrawer = host => {
//     const container = contentDrawerContainer(host)
//     const itemsContainer = host.elements.itemsContainer

//     if (!itemsContainer || !container) { return }

//     const slotIndex = container.targetElement ? container.targetElement.getAttribute(`slot`) : `0`
//     const nextSibling = container.nextElementSibling
//     const selector = `${itemRowSelector}[name="${slotIndex}"]`
//     const row = host.shadowRoot.querySelector(selector)

//     if (row && nextSibling !== row) {
//         itemsContainer.insertBefore(container, row)
//     }
// }

// export const triggerContentDrawer = (host, element) => {

//     if (!element || typeof element.getAttribute !== `function`) { return }

//     const container = contentDrawerContainer(host)
//     const currentRow = container.rowIndex
//     const itemRow = element.getAttribute(`slot`)
//     const selector = `${itemRowSelector}[name="${itemRow}"]`
//     const row = host.shadowRoot.querySelector(selector)

//     container.targetElement = element
//     container.rowIndex = itemRow || `0`

//     const trigger = () => {
//         host.elements.itemsContainer.insertBefore(container, row)
//         host.dispatchEvent(new CustomEvent(`contentdraweropen`, { detail: { element, host } }))
//     }

//     if (itemRow !== currentRow) {
//         return removeContentDrawerItems(host, container, contentDrawerItems(host), true)
//             .then(trigger)
//     }

//     trigger()
// }