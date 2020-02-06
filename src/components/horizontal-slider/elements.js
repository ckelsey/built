import { goToNextPage, goToPreviousPage, autoplay } from './methods.js'
import { ArrayFrom } from '../../utils/array-from.js'
import { Get } from '../../utils/get.js'
import { ObserveEvent } from '../../utils/observe-event.js'

const sliderItemSelectedClass = 'active-horizontal-slider-item'
const sliderItemClass = 'horizontal-slider-item'

function handleItemEnter(item) { return item.hovering = true }
function handleItemLeave(item) { return item.hovering = false }
function handleItemUp(item) { return item.touching = false }
function handleItemDown(item, host) {
    item.touching = true
    host.currentindex = item.itemIndex
    host.dispatchEvent(new CustomEvent('itemclick', { detail: { index: host.currentindex, item: item, host: host } }))
}


export function unsetItemEvents(items) {
    if (!items || !Array.isArray(items)) { return }

    items.forEach(function (item) {
        Object.keys(Get(item, 'eventSubscriptions', {}))
            .forEach(function (key) {
                if (item.eventSubscriptions[key] && typeof item.eventSubscriptions[key] === 'function') {
                    item.eventSubscriptions[key]()
                }
            })

        item.classList.remove(sliderItemClass)
    })
}

export function setItemEvents(items, host) {
    if (!items || !Array.isArray(items)) { return }

    items.forEach(function (item) {
        item.classList.add(sliderItemClass)

        item.eventSubscriptions = {
            mouseenter: ObserveEvent(item, 'mouseenter').subscribe(function () { handleItemEnter(item) }),
            mouseleave: ObserveEvent(item, 'mouseleave').subscribe(function () { handleItemLeave(item) }),
            mousedown: ObserveEvent(item, 'mousedown').subscribe(function () { handleItemDown(item, host) }),
            mouseup: ObserveEvent(item, 'mouseup').subscribe(function () { handleItemUp(item) })
        }
    })
}

export function setSlot(el, host) {
    if (!el) { return }

    el.eventSubscriptions = {
        slot: ObserveEvent(el, 'slotchange').subscribe(function () {
            let images = []
            const items = Array
                .from(host.children)
                .map(function (item, index) {
                    item.itemIndex = index
                    item.style.order = index + 1
                    images = images.concat(ArrayFrom(item.querySelectorAll('img')))
                    return item
                })

            Promise
                .all(
                    images.map(function (image) {
                        new Promise(function (resolve) {

                            if (image.complete) { return resolve(image) }

                            function onComplete() {
                                image.removeEventListener('load', onComplete, true)
                                image.removeEventListener('error', onComplete, true)
                                return resolve(image)
                            }

                            image.addEventListener('load', onComplete, true)
                            image.addEventListener('error', onComplete, true)
                        })
                    })
                )
                .then(function () { return host.items = items })
        })
    }
}

export function setActiveItem(host) {
    if (!Array.isArray(host.items)) { return }

    const index = host.currentindex
    host.items.forEach(function (item) { item.classList[item.itemIndex === index ? 'add' : 'remove'](sliderItemSelectedClass) })
}

const chickletSelector = 'horizontal-slider-chicklet'

export function setActiveChicklet(host, selectedIndex) {
    const chickletContainer = host.elements.chicklets

    Array
        .from(chickletContainer.querySelectorAll('.'.concat(chickletSelector)))
        .forEach(function (chicklet, index) {
            chicklet.classList[index === selectedIndex ? 'add' : 'remove']('active')
        })
}

export function setChicklets(host) {
    const chicklets = host.elements.chicklets
    const root = host.elements.root

    if (!chicklets || !Array.isArray(host.items)) { return }

    if (!host.chicklets) {
        const currentChicklets = ArrayFrom(chicklets.querySelectorAll('.'.concat(chickletSelector)))
        currentChicklets.forEach(function (chicklet) { host.unsubscribeEvents(chicklet) })
        chicklets.innerHTML = ''
    }

    root.classList[host.chicklets ? 'add' : 'remove']('has-chicklets')

    host.items.forEach(function (_item, index) {
        const chicklet = document.createElement('div')
        chicklet.className = chickletSelector
        chicklet.itemIndex = index

        chicklets.appendChild(chicklet)

        chicklet.eventSubscriptions = {
            click: ObserveEvent(chicklet, 'click').subscribe(function () { host.currentindex = index })
        }
    })

    setActiveChicklet(host, host.currentindex)
}

const arrowClass = 'show-horizontal-slider-arrows'

export function setPrevious(el, host) {
    if (!el) { return }

    el.classList[host.arrows ? 'add' : 'remove'](arrowClass)

    host.unsubscribeEvents(el)

    el.eventSubscriptions = {
        click: ObserveEvent(el, 'click').subscribe(function () { goToPreviousPage(host, host.currentindex) })
    }
}

export function setNext(el, host) {
    if (!el) { return }

    el.classList[host.arrows ? 'add' : 'remove'](arrowClass)

    host.unsubscribeEvents(el)

    el.eventSubscriptions = {
        click: ObserveEvent(el, 'click').subscribe(function () { goToNextPage(host, host.currentindex) })
    }
}

const elements = {
    root: {
        selector: '.horizontal-slider-container',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                mouseenter: ObserveEvent(el, 'mouseenter').subscribe(function () {
                    host.paused = true
                }),
                mouseleave: ObserveEvent(el, 'mouseleave').subscribe(function () {
                    host.paused = false
                    autoplay(host)
                })
            }
        }
    },
    slot: {
        selector: 'slot:not([name])',
        onChange: setSlot
    },
    inner: { selector: '.horizontal-slider-inner' },
    itemContainer: { selector: '.horizontal-slider-items', },
    previous: {
        selector: '.horizontal-slider-previous',
        onChange: setPrevious
    },
    next: {
        selector: '.horizontal-slider-next',
        onChange: setNext
    },
    chicklets: {
        selector: '.horizontal-slider-chicklets',
        onChange: function (_el, host) { setChicklets(host) }
    }
}

export default elements