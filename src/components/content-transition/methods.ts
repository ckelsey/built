import Timer from '../../services/timer'
import { EaseInOut } from '../../utils/curve'

const style = require('./style.scss').toString()

const removeAtAllCosts = el => {
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

const getTransitionElements = (host, indexOrChild) => {
    const nextContainer = host.elements.nextContainer
    const currentContainer = host.elements.currentContainer
    const root = host.elements.root
    const child = isNaN(indexOrChild) ? indexOrChild : host.children[indexOrChild]

    if (!root || !nextContainer || !currentContainer || !child) { return }

    return { nextContainer, currentContainer, root, child }
}

const transitionSlide = (hostElement, index, speed) => new Promise(resolve => {
    hostElement.dispatchEvent(new CustomEvent(`transitioning`, { detail: hostElement }))
    const elements = getTransitionElements(hostElement, index)

    if (!elements) { return resolve() }

    const current: any = Array.from(hostElement.children).filter((c: any) => !c.getAttribute(`slot`))[0]
    const startHeight = elements.root.offsetHeight
    elements.root.style.height = `${startHeight}px`
    elements.root.classList.add(`sliding`)
    elements.child.setAttribute(`slot`, `next`)

    animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed)
        .then(() => {
            requestAnimationFrame(() => elements.root.style.removeProperty(`height`))
        })

    setTimeout(() => {
        requestAnimationFrame(() => {
            animateOpacity(0, 1, elements.nextContainer, speed * 0.25)
        })
    }, speed * 0.1)

    animateOpacity(1, 0, elements.currentContainer, speed * 0.8)

    animateLeft(0, 100, elements.currentContainer, speed * 0.8)
        .then(() => current.setAttribute(`slot`, `hidden`))

    animateLeft(-100, 0, elements.nextContainer, speed)
        .then(() => {
            elements.currentContainer.removeAttribute(`style`)
            elements.child.removeAttribute(`slot`)
            elements.nextContainer.removeAttribute(`style`)
            elements.root.classList.remove(`sliding`)
            hostElement.dispatchEvent(new CustomEvent(`transitioned`, { detail: hostElement }))
            return resolve()
        })
})

const transitionFade = (hostElement, child, speed, keepchildren) => new Promise(resolve => {
    hostElement.dispatchEvent(new CustomEvent(`transitioning`, { detail: hostElement }))
    const elements = getTransitionElements(hostElement, child)

    if (!elements) { return resolve() }

    const startHeight = elements.root.offsetHeight
    elements.root.style.height = `${startHeight}px`
    elements.child.setAttribute(`slot`, `next`)
    hostElement.appendChild(elements.child)

    animateOpacity(1, 0, elements.currentContainer, speed * 0.75)
    animateOpacity(0, 1, elements.nextContainer, speed)

    animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed)
        .then(() => {

            if (!keepchildren) {
                while (hostElement.children.length > 1) {
                    removeAtAllCosts(hostElement.children[0])
                }
            }

            elements.child.removeAttribute(`slot`)
            elements.currentContainer.style.removeProperty(`opacity`)

            requestAnimationFrame(() => {
                elements.root.style.removeProperty(`height`)
                hostElement.dispatchEvent(new CustomEvent(`transitioned`, { detail: hostElement }))
                return resolve(hostElement.children[0])
            })
        })
})

export const transitionTo = host => index => new Promise(resolve => {
    switch (host.type) {
        case `slide`:
            return transitionSlide(host, index, host.speed)
                .then(resolve)
        case `fade`:
            return transitionFade(host, index, host.speed, host.keepchildren)
                .then(resolve)
    }
})

export const transitionChild = host => child => new Promise(resolve => {
    switch (host.type) {
        case `slide`:
            return transitionSlide(host, child, host.speed)
                .then(resolve)
        case `fade`:
            return transitionFade(host, child, host.speed, host.keepchildren)
                .then(resolve)
    }
})

export const getComponentStyles = host => () => `${style}${host.styles}`