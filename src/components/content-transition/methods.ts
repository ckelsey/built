import Timer from '../../services/timer'
import { EaseInOut } from '../../utils/curve'

const style = require('./style.scss').toString()

const dispatchTransition = (host, from, to) => {
    host.dispatchEvent(new CustomEvent(`transitioning`, { detail: { host, from, to } }))
}
const dispatchTransitioned = (host, from, to) => {
    host.dispatchEvent(new CustomEvent(`transitioned`, { detail: { host, from, to } }))
}

const removeElement = el => {
    try { el.parentNode.removeChild(el) } catch (error) { }
}

const animator = (from, to, speed, stepFn) => new Promise(resolve =>
    Timer(
        speed,
        stepFn,
        EaseInOut([from, to], speed),
        resolve
    )
)

const animateHeight = (from, to, el, speed) => animator(from, to, speed, heightStep => el.style.height = `${heightStep}px`)
const animateLeft = (from, to, el, speed) => animator(from, to, speed, leftStep => el.style.transform = `translateZ(0) translateX(${leftStep}%)`)
const animateOpacity = (from, to, el, speed) => animator(from, to, speed, opacityStep => el.style.opacity = opacityStep)

export const getChildren = host => () => Array.from(host.querySelectorAll(`[slot]`))
export const getCurrent = host => () => host.querySelector(`[slot="current"]`)

const getTransitionElements = (host, indexOrChild) => {
    const nextContainer = host.elements.nextContainer
    const currentContainer = host.elements.currentContainer
    const root = host.elements.root
    const child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild]
    const current = host.current || host.getCurrent()

    if (!root || !nextContainer || !currentContainer || !child) { return }

    host.current = child

    return { nextContainer, currentContainer, root, child, current }
}


const cleanup = host => {
    const children = host.getChildren()
    children.forEach((child: HTMLElement) => child === host.current ? undefined : child.setAttribute(`slot`, `hidden`))

    const current = host.getCurrent()
    host.end = { current, index: children.indexOf(current) }

    return host.current
}

const transitionSlide = (host, index, speed, keepchildren) => new Promise(resolve => {

    const elements = getTransitionElements(host, index)

    if (!elements) { return resolve() }

    dispatchTransition(host, elements.current, elements.child)
    host.start = { from: elements.current, to: elements.child }

    const startHeight = elements.root.offsetHeight
    elements.root.style.height = `${startHeight}px`
    elements.root.classList.add(`sliding`)
    elements.child.setAttribute(`slot`, `next`)
    const endHeight = elements.child.offsetHeight

    if (startHeight !== endHeight) {
        animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed)
            .then(() => {
                requestAnimationFrame(() => elements.root.style.removeProperty(`height`))
            })
    }

    setTimeout(() => {
        requestAnimationFrame(() => {
            animateOpacity(0, 1, elements.nextContainer, speed * 0.25)
        })
    }, speed * 0.1)

    animateOpacity(1, 0, elements.currentContainer, speed * 0.8)

    animateLeft(0, 100, elements.currentContainer, speed * 0.8)

    animateLeft(-100, 0, elements.nextContainer, speed)
        .then(() => {

            if (elements.current) {
                elements.current.setAttribute(`slot`, `hidden`)
            }

            elements.currentContainer.removeAttribute(`style`)
            elements.child.setAttribute(`slot`, `current`)
            elements.nextContainer.removeAttribute(`style`)
            elements.root.classList.remove(`sliding`)

            dispatchTransitioned(host, elements.current, elements.child)

            if (!keepchildren) {
                removeElement(elements.current)
            }

            return resolve(cleanup(host))
        })
})

const transitionFade = (host, child, speed, keepchildren) => new Promise(resolve => {
    const elements = getTransitionElements(host, child)

    if (!elements) { return resolve() }

    dispatchTransition(host, elements.current, elements.child)
    host.start = { from: elements.current, to: elements.child }

    const startHeight = elements.root.offsetHeight
    elements.root.style.height = `${startHeight}px`
    elements.child.setAttribute(`slot`, `next`)
    const endHeight = elements.child.offsetHeight

    if (!host.contains(elements.child)) {
        host.appendChild(elements.child)
    }

    animateOpacity(1, 0, elements.currentContainer, speed * 0.75)
    animateOpacity(0, 1, elements.nextContainer, speed)

    const afterHeightSet = () => {
        if (!keepchildren) {
            while (host.getChildren().length > 1) {
                removeElement(host.getChildren()[0])
            }
        }

        if (elements.current) {
            elements.current.setAttribute(`slot`, `hidden`)
        }

        elements.child.setAttribute(`slot`, `current`)
        elements.currentContainer.style.removeProperty(`opacity`)
        elements.child.style.removeProperty(`opacity`)

        requestAnimationFrame(() => {
            elements.root.style.removeProperty(`height`)
            elements.nextContainer.style.removeProperty(`opacity`)
            dispatchTransitioned(host, elements.current, elements.child)
            return resolve(cleanup(host))
        })
    }

    if (endHeight === startHeight) {
        return setTimeout(afterHeightSet, speed)
    }

    animateHeight(startHeight, endHeight, elements.root, speed)
        .then(afterHeightSet)
})

export const transitionTo = host => index => new Promise(resolve => {
    switch (host.type) {
        case `slide`:
            return transitionSlide(host, index, host.speed, host.keepchildren)
                .then(resolve)
        case `fade`:
            return transitionFade(host, index, host.speed, host.keepchildren)
                .then(resolve)
    }
})

export const transitionChild = host => child => new Promise(resolve => {
    switch (host.type) {
        case `slide`:
            return transitionSlide(host, child, host.speed, host.keepchildren)
                .then(resolve)
        case `fade`:
            return transitionFade(host, child, host.speed, host.keepchildren)
                .then(resolve)
    }
})

export const getComponentStyles = host => () => `${style}${host.styles}`

export const getIndex = host => () => host.getChildren().indexOf(host.getCurrent())

export const start$ = host => (next, error = (_e) => { }, complete = () => { }) => {
    return host.state.start.subscribe(next, error, complete)
}

export const end$ = host => (next, error = (_e) => { }, complete = () => { }) => {
    return host.state.end.subscribe(next, error, complete)
}