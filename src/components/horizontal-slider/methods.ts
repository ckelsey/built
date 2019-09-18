import { setActiveChicklet, setActiveItem } from './elements'

export const setLoop = _host => {

}

export const autoplay = host => {
    if (!Array.isArray(host.items)) { return }

    let canPlay = () => !!host.intervalplay && host.intervalplay > 0 && host.paused !== true

    if (host.playing && canPlay()) { return }

    let time = new Date().getTime()

    const run = () => {
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

        requestAnimationFrame(run)
    }

    if (canPlay()) { run() }
}

export const scrollToIndex = host => index => {
    const itemContainer = host.elements.itemContainer

    if (!host.items || !itemContainer) { return }

    const item = host.items[index]
    host.currentindex = index

    if (!item) { return }

    const left = -(item.offsetLeft - (host.center ? (host.elements.inner.offsetWidth / 2) - (item.offsetWidth / 2) : 0))
    itemContainer.style.transform = `translateZ(0) translateX(${left}px)`

    setActiveItem(host)
    setActiveChicklet(host, index)
}

export const goToNextPage = (host, currentIndex) => {
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

export const goToPreviousPage = (host, currentIndex) => {
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