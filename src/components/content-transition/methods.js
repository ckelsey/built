import { EaseInOut, Timer, OnNextFrame, Get } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const dispatchTransition = (host, from, to) => {
    host.dispatchEvent(new CustomEvent(`transitioning`, { detail: { host, from, to } }))
}
const dispatchTransitioned = (host, from, to) => {
    host.dispatchEvent(new CustomEvent(`transitioned`, { detail: { host, from, to } }))
}

const removeElement = el => {
    try { el.parentNode.removeChild(el) } catch (error) { }
}

const animator = (from, to, speed, stepFn) => new Promise(resolve => {
    Timer(
        stepFn,
        EaseInOut([from, to], speed),
    ).then(resolve)
})

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
    const current = host.getCurrent()
    host.end = { current, index: children.indexOf(current) }

    return host.current
}

const transitionStart = current => new Promise(resolve => {
    if (current) {
        current.className = Get(current, `className`, ``)
            .split(`content-transition-shown`)
            .join(``)
            .split(` `)
            .filter(s => !!s.trim())
            .join(` `)
    }

    OnNextFrame(() => resolve())
})

const transitionEnd = next => next.className = `content-transition-shown ${Get(next, `className`, ``)
    .split(`content-transition-shown`)
    .join(``)
    .split(` `)
    .filter(s => !!s.trim())
    .join(` `)}`

const resetElements = (host, elements) =>
    OnNextFrame(() => {
        elements.currentContainer.style.opacity = `1`
        elements.currentContainer.style.removeProperty(`opacity`)
        elements.currentContainer.removeAttribute(`style`)

        elements.nextContainer.style.opacity = `0`
        elements.nextContainer.style.removeProperty(`opacity`)
        elements.nextContainer.removeAttribute(`style`)

        elements.root.classList.remove(`sliding`)
        dispatchTransitioned(host, elements.current, elements.child)
        transitionEnd(elements.child)
        cleanup(host)
        elements.root.style.removeProperty(`height`)

        if (!host.keepchildren) {
            while (host.getChildren().length > 1) {
                removeElement(host.getChildren()[0])
            }
        }
    }).promise


const transitionSlide = (host, index, speed) => new Promise(resolve => {
    OnNextFrame(() => {
        const elements = getTransitionElements(host, index)

        if (!elements) { return resolve() }

        dispatchTransition(host, elements.current, elements.child)
        host.start = { from: elements.current, to: elements.child }

        const startHeight = elements.root.offsetHeight
        elements.root.style.height = `${startHeight}px`
        elements.root.classList.add(`sliding`)

        if (typeof Get(elements, `child.setAttribute`) === `function`) {
            elements.child.setAttribute(`slot`, `next`)
        }

        const endHeight = elements.child.offsetHeight

        transitionStart(elements.current)
            .then(() => {
                if (startHeight !== endHeight) {
                    animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed)
                }

                OnNextFrame(() => {
                    animateOpacity(0, 1, elements.nextContainer, speed * 0.25)
                })

                animateOpacity(1, 0, elements.currentContainer, speed * 0.8)

                animateLeft(0, 100, elements.currentContainer, speed * 0.8)

                animateLeft(-100, 0, elements.nextContainer, speed)
                    .then(() => {

                        if (typeof Get(elements, `current.setAttribute`) === `function`) {
                            elements.current.setAttribute(`slot`, `hidden`)
                        }

                        if (typeof Get(elements, `child.setAttribute`) === `function`) {
                            elements.child.setAttribute(`slot`, `current`)
                        }

                        resetElements(host, elements).then(() => resolve(host.current))
                    })
            })
    })
})

const runHeight = (elements, speed, host) => new Promise(resolve => {
    OnNextFrame(() => {
        dispatchTransition(host, elements.current, elements.child)
        host.start = { from: elements.current, to: elements.child }

        const startHeight = elements.root.offsetHeight
        elements.root.style.height = `${startHeight}px`

        if (typeof Get(elements, `child.setAttribute`) === `function`) {
            elements.child.setAttribute(`slot`, `next`)
        }

        if (!host.contains(elements.child)) {
            host.appendChild(elements.child)
        }

        const endHeight = elements.child.offsetHeight

        transitionStart(elements.current)
            .then(() => {
                const afterHeightSet = () => {
                    if (typeof Get(elements, `current.setAttribute`) === `function`) {
                        elements.current.setAttribute(`slot`, `hidden`)
                    }

                    if (typeof Get(elements, `child.setAttribute`) === `function`) {
                        elements.child.setAttribute(`slot`, `current`)
                        elements.child.style.removeProperty(`opacity`)
                    }

                    OnNextFrame(() => {
                        elements.root.style.height = `unset`
                        elements.root.style.removeProperty(`height`)
                        elements.root.removeAttribute(`style`)
                    })

                    return resolve(host.current)
                }

                if (endHeight === startHeight) {
                    return setTimeout(afterHeightSet, speed)
                }

                animateHeight(startHeight, endHeight, elements.root, speed)
                    .then(afterHeightSet)
            })
    })
})

const transitionFade = (host, child, speed) => new Promise(resolve => {
    const elements = getTransitionElements(host, child)

    if (!elements) { return resolve() }

    animateOpacity(1, 0, elements.currentContainer, speed * 0.75)
    runHeight(elements, speed, host)
    animateOpacity(0, 1, elements.nextContainer, speed * 1.1)
        .then(() => resetElements(host, elements).then(resolve))
})

const transitionHeight = (host, child, speed) => new Promise(resolve => {
    const elements = getTransitionElements(host, child)

    if (!elements) { return resolve() }

    runHeight(elements, speed, host)
        .then(() => resetElements(host, elements).then(() => resolve()))
})

export const transitionTo = host => index => new Promise(resolve => {
    let maxTries = 1000
    const run = () => {
        maxTries = maxTries - 1
        if (!host.speed) {
            if (!maxTries) { return }

            return OnNextFrame(run)
        }

        switch (host.type) {
            case `slide`:
                return transitionSlide(host, index, host.speed)
                    .then(resolve)
            case `fade`:
                return transitionFade(host, index, host.speed)
                    .then(resolve)
            case `height`:
                return transitionHeight(host, index, host.speed)
                    .then(resolve)
        }
    }

    run()
})

export const transitionChild = host => child => new Promise(resolve => {
    let maxTries = 1000
    const run = () => {
        maxTries = maxTries - 1

        if (!host.speed && host.speed !== 0) {
            if (!maxTries) { return }
            return OnNextFrame(run)
        }

        switch (host.type) {
            case `slide`:
                return transitionSlide(host, child, host.speed)
                    .then(resolve)
            case `fade`:
                return transitionFade(host, child, host.speed)
                    .then(resolve)
            case `height`:
                return transitionHeight(host, child, host.speed)
                    .then(resolve)
        }
    }

    run()
})

export const getComponentStyles = host => () => `${style}${host.styles}`

export const getIndex = host => () => host.getChildren().indexOf(host.getCurrent())

export const start$ = host => (next, error = () => { }, complete = () => { }) => {
    return host.state.start.subscribe(next, error, complete)
}

export const end$ = host => (next, error = () => { }, complete = () => { }) => {
    return host.state.end.subscribe(next, error, complete)
}

export const setCurrent = host => index => {
    const elements = getTransitionElements(host, index)

    const end = () => {
        if (elements.current && elements.current.slot !== `hidden`) {
            elements.current.slot = `hidden`
        }

        if (elements.child && elements.child.slot !== `current`) {
            elements.child.slot = `current`
        }
    }

    if (elements.current === elements.child) {
        return Promise.resolve(end())
    }

    return transitionStart(elements.current)
        .then(() => {
            transitionEnd(elements.child)
            cleanup(host)
            return end()
        })
}