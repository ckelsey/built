import { setActiveChicklet, setActiveItem } from './elements'
import { OnNextFrame } from '../../services/on-next-frame.js'

function whichTransitionEvent() {
    var t
    var el = document.createElement('fakeelement')
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t]
        }
    }
}

export function setLoop(host) {
    const itemContainer = host.elements.itemContainer
    const inner = host.elements.inner

    if (!host.items || !itemContainer || !inner) { return }

    const transitionEvent = whichTransitionEvent()

    if (!transitionEvent) {
        setTimeout(function () { finish() }, 300)
    } else {
        itemContainer.addEventListener(transitionEvent, function endHandler() {
            finish()
            window.removeEventListener(transitionEvent, endHandler, false)
        }, false)
    }

    const items = host.items
    const currentItem = items[host.currentindex]

    function getLeft() {
        return (currentItem.offsetLeft + (currentItem.offsetWidth / 2)) - (inner.offsetWidth / 2)
    }

    function trans() {
        return ''.concat('translateZ(0) translateX(', -getLeft(), 'px)')
    }

    function finish() {
        itemContainer.style.transition = 'none'

        const indexShift = Math.ceil(host.items.length / 2) - host.currentindex
        let beforeCurrent = host.currentindex - 1
        let afterCurrent = host.currentindex + 1

        currentItem.style.order = Math.ceil(host.items.length / 2)

        function getShift(index) {
            if (index + indexShift > items.length) {
                return -(items.length) + index + indexShift
            }

            if (index + indexShift < 1) {
                return (index + indexShift) + (items.length)
            }

            return index + indexShift
        }



        while (items[beforeCurrent]) {
            items[beforeCurrent].style.order = getShift(beforeCurrent)
            itemContainer.style.transform = trans()
            beforeCurrent = beforeCurrent - 1
        }

        while (items[afterCurrent]) {
            items[afterCurrent].style.order = getShift(afterCurrent)
            itemContainer.style.transform = trans()
            afterCurrent = afterCurrent + 1
        }

        itemContainer.style.removeProperty('transition')
    }

    itemContainer.style.transform = trans()
}

export function autoplay(host) {
    if (!Array.isArray(host.items)) { return }

    let canPlay = function () { return !!host.intervalplay && host.intervalplay > 0 && host.paused !== true }

    if (host.playing && canPlay()) { return }

    let time = new Date().getTime()

    function run() {
        if (!canPlay()) {
            host.playing = false
            return
        }

        const newTime = new Date().getTime()

        if (newTime - time > host.intervalplay) {
            host.playing = true
            host.currentindex = host.currentindex + 1 > host.items.length - 1 ? 0 : host.currentindex + 1
            time = new Date().getTime()
        }

        OnNextFrame(run)
    }

    if (canPlay()) { run() }
}

export function scrollToIndex(host) {
    return function (index) {
        const itemContainer = host.elements.itemContainer

        if (!host.items || !itemContainer) { return }

        function finish() {
            setActiveItem(host)
            setActiveChicklet(host, index)
        }

        if (host.loop) {
            setLoop(host)
            return finish()
        }

        const item = host.items[index]
        host.currentindex = index

        if (!item) { return }

        const left = -(item.offsetLeft - (host.center ? (host.elements.inner.offsetWidth / 2) - (item.offsetWidth / 2) : 0))
        itemContainer.style.transform = ''.concat('translateZ(0) translateX(', left, 'px)')

        finish()
    }
}

export function goToNextPage(host, currentIndex) {
    const inner = host.elements.inner
    const itemContainer = host.elements.itemContainer

    if (!inner || !itemContainer) { return }

    const targeWidth = inner.offsetWidth
    let currentWidth = 0
    let i = currentIndex

    while (host.items[i]) {
        const itemWidth = host.items[i].offsetWidth

        currentWidth = currentWidth + itemWidth

        if (currentWidth > targeWidth) { break }

        i = i + 1
    }

    host.currentindex = i
}

export function goToPreviousPage(host, currentIndex) {
    const inner = host.elements.inner
    const itemContainer = host.elements.itemContainer

    if (!inner || !itemContainer) { return }

    let currentWidth = inner.offsetWidth
    let i = currentIndex

    while (host.items[i]) {
        const itemWidth = host.items[i].offsetWidth

        currentWidth = currentWidth - itemWidth

        if (currentWidth < 0) { break }

        i = i - 1
    }


    host.currentindex = i
}