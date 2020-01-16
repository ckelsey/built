import { ObserveEvent, Get } from '../..'
import { goToNextPage, goToPreviousPage, autoplay } from './methods'

const sliderItemSelectedClass = `active-horizontal-slider-item`
const sliderItemClass = `horizontal-slider-item`

const handleItemEnter = item => item.hovering = true
const handleItemLeave = item => item.hovering = false
const handleItemUp = item => item.touching = false
const handleItemDown = (item, host) => {
    item.touching = true
    host.currentindex = item.itemIndex
    host.dispatchEvent(new CustomEvent(`itemclick`, { detail: { index: host.currentindex, item, host } }))
}


export const unsetItemEvents = items => {
    if (!items || !Array.isArray(items)) { return }

    items.forEach(item => {
        Object.keys(Get(item, `eventSubscriptions`, {})).forEach(key => {
            if (item.eventSubscriptions[key] && typeof item.eventSubscriptions[key] === `function`) {
                item.eventSubscriptions[key]()
            }
        })

        item.classList.remove(sliderItemClass)
    })
}

export const setItemEvents = (items, host) => {
    if (!items || !Array.isArray(items)) { return }

    items.forEach(item => {
        item.classList.add(sliderItemClass)

        item.eventSubscriptions = {
            mouseenter: ObserveEvent(item, `mouseenter`).subscribe(() => handleItemEnter(item)),
            mouseleave: ObserveEvent(item, `mouseleave`).subscribe(() => handleItemLeave(item)),
            mousedown: ObserveEvent(item, `mousedown`).subscribe(() => handleItemDown(item, host)),
            mouseup: ObserveEvent(item, `mouseup`).subscribe(() => handleItemUp(item))
        }
    })
}

export const setSlot = (el, host) => {
    if (!el) { return }

    el.eventSubscriptions = {
        slot: ObserveEvent(el, `slotchange`).subscribe(() => {
            let images = []
            const items = Array
                .from(host.children)
                .map((item, index) => {
                    item.itemIndex = index
                    item.style.order = index + 1
                    images = images.concat(Array.from(item.querySelectorAll(`img`)))
                    return item
                })

            Promise
                .all(
                    images.map(image =>
                        new Promise(resolve => {

                            if (image.complete) { return resolve(image) }

                            function onComplete() {
                                image.removeEventListener(`load`, onComplete, true)
                                image.removeEventListener(`error`, onComplete, true)
                                return resolve(image)
                            }

                            image.addEventListener(`load`, onComplete, true)
                            image.addEventListener(`error`, onComplete, true)
                        })
                    )
                )
                .then(() => host.items = items)
        })
    }
}

export const setActiveItem = host => {
    if (!Array.isArray(host.items)) { return }

    const index = host.currentindex
    host.items.forEach(item => item.classList[item.itemIndex === index ? `add` : `remove`](sliderItemSelectedClass))
}

const chickletSelector = `horizontal-slider-chicklet`

export const setActiveChicklet = (host, selectedIndex) => {
    const chickletContainer = host.elements.chicklets

    Array
        .from(chickletContainer.querySelectorAll(`.${chickletSelector}`))
        .forEach((chicklet, index) => {
            chicklet.classList[index === selectedIndex ? `add` : `remove`](`active`)
        })
}

export const setChicklets = host => {
    const chicklets = host.elements.chicklets
    const root = host.elements.root

    if (!chicklets || !Array.isArray(host.items)) { return }

    if (!host.chicklets) {
        const currentChicklets = Array.from(chicklets.querySelectorAll(`.${chickletSelector}`))
        currentChicklets.forEach(chicklet => host.unsubscribeEvents(chicklet))
        chicklets.innerHTML = ``
    }

    root.classList[host.chicklets ? `add` : `remove`](`has-chicklets`)

    host.items.forEach((_item, index) => {
        const chicklet = document.createElement(`div`)
        chicklet.className = chickletSelector
        chicklet.itemIndex = index

        chicklets.appendChild(chicklet)

        chicklet.eventSubscriptions = {
            click: ObserveEvent(chicklet, `click`).subscribe(() => host.currentindex = index)
        }
    })

    setActiveChicklet(host, host.currentindex)
}

const arrowClass = `show-horizontal-slider-arrows`

export const setPrevious = (el, host) => {
    if (!el) { return }

    el.classList[host.arrows ? `add` : `remove`](arrowClass)

    host.unsubscribeEvents(el)

    el.eventSubscriptions = {
        click: ObserveEvent(el, `click`).subscribe(() => goToPreviousPage(host, host.currentindex))
    }
}

export const setNext = (el, host) => {
    if (!el) { return }

    el.classList[host.arrows ? `add` : `remove`](arrowClass)

    host.unsubscribeEvents(el)

    el.eventSubscriptions = {
        click: ObserveEvent(el, `click`).subscribe(() => goToNextPage(host, host.currentindex))
    }
}

const elements = {
    root: {
        selector: `.horizontal-slider-container`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                mouseenter: ObserveEvent(el, `mouseenter`).subscribe(() => {
                    host.paused = true
                }),
                mouseleave: ObserveEvent(el, `mouseleave`).subscribe(() => {
                    host.paused = false
                    autoplay(host)
                })
            }
        }
    },
    slot: {
        selector: `slot:not([name])`,
        onChange: setSlot
    },
    inner: { selector: `.horizontal-slider-inner` },
    itemContainer: { selector: `.horizontal-slider-items`, },
    previous: {
        selector: `.horizontal-slider-previous`,
        onChange: setPrevious
    },
    next: {
        selector: `.horizontal-slider-next`,
        onChange: setNext
    },
    chicklets: {
        selector: `.horizontal-slider-chicklets`,
        onChange: (_el, host) => setChicklets(host)
    }
}

export default elements