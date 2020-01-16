import { EaseInOut, Timer, OnNextFrame, Get } from '../..'

const style = require(`./style.scss`).toString()
const animator = (from, to, speed, stepFn) => new Promise(resolve => {
    try {
        Timer(stepFn, EaseInOut([from, to], speed)).then(resolve)
    } catch (error) {
        resolve()
    }
})
const animateHeight = (from, to, el, speed) => animator(from, to, speed, heightStep => el.style.height = `${heightStep}px`)
const animateLeft = (from, to, el, speed) => animator(from, to, speed, leftStep => el.style.transform = `translateZ(0) translateX(${leftStep}%)`)
const animateOpacity = (from, to, el, speed) => animator(from, to, speed, opacityStep => el.style.opacity = opacityStep)
const removeElement = el => { try { el.parentNode.removeChild(el) } catch (error) { } }
const dispatchTransition = (host, from, to, isEnd) => host.dispatchEvent(new CustomEvent(`transition${isEnd ? `ed` : `ing`}`, { detail: { host, from, to } }))
const elementOpacity = (el, defaultOpacity = 1) => Get(el, `style.opacity`, defaultOpacity, val => val === `` ? defaultOpacity : parseFloat(val))

export const getChildren = host => () => Array.from(host.children).filter(c => c.hasAttribute(`slot`))
export const getCurrent = host => () => host.querySelector(`[slot="current"]`)
export const getComponentStyles = host => () => `${style}${host.theme}${host.styles}`
export const getIndex = host => () => host.getChildren().indexOf(host.getCurrent())
export const start$ = host => (next, error = () => { }, complete = () => { }) => host.state.start.subscribe(next, error, complete)
export const end$ = host => (next, error = () => { }, complete = () => { }) => host.state.end.subscribe(next, error, complete)

const getTransitionElements = (host, indexOrChild) => {
    const child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild]
    const current = host.current || host.getCurrent()

    if (!child) { return }

    host.current = child

    return {
        nextContainer: host.elements.nextContainer,
        currentContainer: host.elements.currentContainer,
        root: host.elements.root,
        child,
        current
    }
}

const endTransition = (host, old, current, currentContainer, nextContainer) => {
    try {
        if (old && old.slot !== `hidden`) { old.slot = `hidden` }
        if (current && current.slot !== `current`) { current.slot = `current` }

        currentContainer.style.removeProperty(`transform`)
        currentContainer.style.removeProperty(`opacity`)

        nextContainer.style.removeProperty(`transform`)
        nextContainer.style.removeProperty(`opacity`)

        host.elements.root.style.removeProperty(`height`)

        host.end = { current, index: host.getChildren().indexOf(current) }
    } catch (error) { }

    return current
}

const startTransition = (host, current, child) => {
    try {
        if (!host.contains(child)) { host.appendChild(child) }
        child.setAttribute(`slot`, `next`)
        host.start = { from: current, to: child }
        dispatchTransition(host, current, child)
    } catch (error) { }
}

const switchHeights = (root, child, speed) => new Promise(resolve =>
    OnNextFrame(() => {
        const endHeight = Get(child, `offsetHeight`, 0)
        const startHeight = Get(root, `offsetHeight`, endHeight)

        return endHeight === startHeight ?
            setTimeout(resolve, speed) :
            animateHeight(startHeight, endHeight, root, speed).then(resolve)
    })
)

const transitionFade = (current, next, speed) => Promise.all([
    animateOpacity(elementOpacity(current), 0, current, speed * 0.75),
    animateOpacity(elementOpacity(next, 0), 1, next, speed * 1.1)
])

const transitionSlide = (current, next, speed) => Promise.all([
    animateOpacity(elementOpacity(current), 0, current, speed * 0.5),
    animateOpacity(elementOpacity(next, 0), 1, next, speed * 0.7),
    animateLeft(0, 100, current, speed * 0.8),
    animateLeft(-100, 0, next, speed)
])

const methods = {
    slide: transitionSlide,
    fade: transitionFade
}

export const transition = host => index => new Promise(resolve => {
    let maxTries = 1000

    const run = () => {

        maxTries = maxTries - 1

        if (host.speed === undefined) {
            if (!maxTries) { return }

            return OnNextFrame(run)
        }

        const elements = getTransitionElements(host, index)

        if (!elements) { return resolve() }

        startTransition(host, elements.current, elements.child)

        return Promise.all([
            switchHeights(elements.root, elements.child, host.speed),
            !methods[host.type] ?
                Promise.resolve() :
                methods[host.type](elements.currentContainer, elements.nextContainer, host.speed)
        ])
            .then(() => endTransition(
                host,
                elements.current,
                elements.child,
                elements.currentContainer,
                elements.nextContainer
            ))
            .then(() => {
                if (!host.keepchildren) {
                    while (host.getChildren().length > 1) {
                        removeElement(host.getChildren()[0])
                    }
                }

                return elements.child
            })
            .then(resolve)
    }

    run()
})

export const setCurrent = host => index => {
    const elements = getTransitionElements(host, index)

    if (!elements) { return Promise.reject() }

    return endTransition(
        host,
        elements.current,
        elements.child,
        elements.currentContainer,
        elements.nextContainer
    )
}