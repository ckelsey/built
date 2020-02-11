import { EaseInOut, Timer, OnNextFrame, Get } from '../..'
import { DispatchEvent } from '../../utils/dispatch-event'
import { Filter } from '../../utils/filter'

function animator(from, to, speed, stepFn) {
    return new Promise(function (resolve) {
        try {
            Timer(stepFn, EaseInOut([from, to], speed)).then(resolve)
        } catch (error) {
            resolve()
        }
    })
}

function animateHeight(from, to, el, speed) {
    return animator(from, to, speed, function (heightStep) {
        return el.style.height = ''.concat(heightStep, 'px')
    })
}

function animateLeft(from, to, el, speed) {
    return animator(from, to, speed, function (leftStep) {
        return el.style.transform = 'translateZ(0) translateX('.concat(leftStep, '%)')
    })
}

function animateOpacity(from, to, el, speed) {
    return animator(from, to, speed, function (opacityStep) {
        return el.style.opacity = opacityStep
    })
}

function dispatchTransition(host, from, to, isEnd) {
    return DispatchEvent(host, 'transition'.concat((isEnd ? 'ed' : 'ing')), { host: host, from: from, to: to })
}

function elementOpacity(el, defaultOpacity) {
    defaultOpacity = defaultOpacity === undefined ? 1 : defaultOpacity
    return Get(el, 'style.opacity', defaultOpacity, function (val) {
        return val === '' ? defaultOpacity : parseFloat(val)
    })
}

export function getChildren(host) {
    return function () {
        return host.slotted$.value
    }
}

export function getCurrent(host) {
    return function () {
        return Filter(function (slotted) { return slotted.slot === 'current' }, host.slotted$)[0]
    }
}

export function getIndex(host) {
    return function () {
        return host.getChildren().indexOf(host.getCurrent())
    }
}

export function start$(host) {
    return function (next, error, complete) {
        error = error ? error : function () { }
        complete = complete ? complete : function () { }

        return host.state.start.subscribe(next, error, complete)
    }
}

export function end$(host) {
    return function (next, error, complete) {
        error = error ? error : function () { }
        complete = complete ? complete : function () { }

        return host.state.end.subscribe(next, error, complete)
    }
}

function getTransitionElements(host, indexOrChild) {
    const child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild]
    const current = host.current || host.getCurrent()

    if (!child) { return }

    host.current = child

    return {
        nextContainer: host.elements.nextContainer,
        currentContainer: host.elements.currentContainer,
        root: host.elements.root,
        child: child,
        current: current
    }
}

function endTransition(host, old, current, currentContainer, nextContainer) {
    try {
        if (old && old.slot !== 'hidden') { old.slot = 'hidden' }
        if (current && current.slot !== 'current') { current.slot = 'current' }

        currentContainer.style.removeProperty('transform')
        currentContainer.style.removeProperty('opacity')

        nextContainer.style.removeProperty('transform')
        nextContainer.style.removeProperty('opacity')

        host.elements.root.style.removeProperty('height')

        host.end = { current: current, index: host.getChildren().indexOf(current) }
    } catch (error) { }

    return current
}

function startTransition(host, current, child) {
    try {
        child.setAttribute('slot', 'next')
        host.start = { from: current, to: child }
        dispatchTransition(host, current, child)
    } catch (error) { }
}

function switchHeights(root, child, speed) {
    return new Promise(function (resolve) {
        const endHeight = Get(child, 'offsetHeight', 0)
        const startHeight = Get(root, 'offsetHeight', endHeight)

        return endHeight === startHeight ?
            setTimeout(resolve, speed) :
            animateHeight(startHeight, endHeight, root, speed).then(resolve)
    })
}

function transitionFade(current, next, speed) {
    return Promise.all([
        animateOpacity(elementOpacity(current), 0, current, speed * 0.75),
        animateOpacity(elementOpacity(next, 0), 1, next, speed * 1.1)
    ])
}

function transitionSlide(current, next, speed) {
    return Promise.all([
        animateOpacity(elementOpacity(current), 0, current, speed * 0.5),
        animateOpacity(elementOpacity(next, 0), 1, next, speed * 0.7),
        animateLeft(0, 100, current, speed * 0.8),
        animateLeft(-100, 0, next, speed)
    ])
}

const methods = {
    slide: transitionSlide,
    fade: transitionFade
}

export function transition(host) {
    return function (index) {
        return new Promise(function (resolve) {
            let maxTries = 1000

            function run() {

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
                    .then(function () {
                        return endTransition(
                            host,
                            elements.current,
                            elements.child,
                            elements.currentContainer,
                            elements.nextContainer
                        )
                    })
                    .then(function () {
                        if (!host.keepchildren) {
                            while (host.getChildren().length > 1) {
                                const child = host.getChildren()[0]
                                host.slotted$.remove(child)
                                try {
                                    child.parentNode.removeChild(child)
                                } catch (error) { }
                            }
                        }

                        return elements.child
                    })
                    .then(resolve)
            }

            run()
        })
    }
}

export function setCurrent(host) {
    return function (index) {
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
}