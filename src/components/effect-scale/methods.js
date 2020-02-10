import { ObserveEvent } from '../../utils/observe-event.js'
import { GetCurve } from '../../utils/get-curve.js'
import { OnNextFrame } from '../../services/on-next-frame.js'

const idealFPS = 60

function frames(speed) {
    return Math.round(idealFPS * (speed / 1000))
}

function setTransform(element, X, Y, doX, doY, lastFrame, toScaledState) {
    element.style.transform = 'perspective(1px) translateZ(0) scaleX('.concat(X, ') scaleY(', Y, ')')

    if (doX === true) {
        element.style.width = 'unset'
    }

    if (doY === true) {
        element.style.height = 'unset'
    }

    if (lastFrame && !toScaledState) { return }

    const box = element.getBoundingClientRect()

    if (doX === true) {
        element.style.width = lastFrame && !toScaledState ? 'unset' : ''.concat(box.width, 'px')
    }

    if (doY === true) {
        element.style.height = lastFrame && !toScaledState ? 'unset' : ''.concat(box.height, 'px')
    }
}

function transformElements(targets, X, Y, doX, doY, lastFrame, toScaledState) {
    targets.forEach(function (element) {
        if (Array.isArray(element)) {
            return element.forEach(function (el) {
                return setTransform(el, X, Y, doX, doY, lastFrame, toScaledState)
            })
        }

        setTransform(element, X, Y, doX, doY, lastFrame, toScaledState)
    })
}

function setElStaticTransform(el) {
    el.style.transformStyle = 'preserve-3d'
    el.style.backfaceVisibility = 'hidden'
}

function setStaticTransform(targets) {


    targets.forEach(function (element) {
        if (Array.isArray(element)) { return element.forEach(setElStaticTransform) }
        setElStaticTransform(element)
    })
}

function canNotRun(host) {
    return host.ready !== true || !host.hasTargets || typeof host.x !== 'boolean' || typeof host.y !== 'boolean' || typeof host.scaled !== 'boolean'
}

export function run(scaled, host, quickSet) {
    if (canNotRun(host)) { return }

    scaled = host.scaled

    setStaticTransform(host.targets)

    const initial = 1
    const amount = initial + host.amount
    const startAmount = !scaled ? amount : initial
    const endAmount = !scaled ? initial : amount
    const scalePoints = GetCurve(
        [startAmount, endAmount],
        (!scaled ? host.spring : 0.5),
        false,
        (quickSet || host.isInitialized !== true ? 1 : frames(scaled ? host.speed * 0.618 : host.speed))
    )

    host.isInitialized = true

    function loop() {
        if (scaled !== host.scaled) { return }

        const scale = scalePoints.shift()
        const lastFrame = !scalePoints.length

        function getXY(key) {
            return !!host[key] && lastFrame ? endAmount : host[key] ? scale : 1
        }

        host.isScaling = lastFrame ? false : true
        host.isScaled = scaled && lastFrame ? true : false

        transformElements(host.targets, getXY('x'), getXY('y'), host.x, host.y, lastFrame, scaled)

        if (!lastFrame) { return OnNextFrame(loop) }
    }

    loop()
}

export function setOrigin(val, host) {
    if (!host.hasTargets) { return }

    const parts = val.split(' ')
    const x = parts[0]
    const y = parts.length > 1 ? parts[1] : parts[0]
    const origin = ''.concat(x, ' ', y)

    if (!Array.isArray(host.targets)) { return }

    host.targets.forEach(function (target) {
        if (Array.isArray(target)) {
            return target.forEach(function (element) {
                return element.style.transformOrigin = origin
            })
        }

        if (target) {
            target.style.transformOrigin = origin
        }
    })
}

export function dispose(host) {
    unloadElements(host, 'targets')
    unloadElements(host, 'triggers')
}

function unloadKey(key) {
    return ''.concat(key, '$')
}

function unloadElements(host, key) {
    const ukey = unloadKey(key)

    if (!host[ukey]) {
        return
    }

    host[ukey].forEach(function (ob$) {
        return ob$()
    })

    host[ukey] = []
}

function loadElements(host, key) {
    if (key === 'targets') {
        return run(host.scaled, host)
    }

    if (!host.hasTriggers || !host.start) { return }

    if (!Array.isArray(host.triggers$)) { host.triggers$ = [] }

    const toggle = !host.end

    function setEvents(trigger) {
        if (toggle) {
            return host.triggers$.push(ObserveEvent(trigger, host.start)
                .subscribe(function () {
                    return host.scaled = !host.scaled
                }))
        }

        host.triggers$.push(ObserveEvent(trigger, host.start).subscribe(function () {
            return host.scaled = true
        }))
        host.triggers$.push(ObserveEvent(trigger, host.end).subscribe(function () {
            return host.scaled = false
        }))
    }

    host.triggers.forEach(function (trigger) {
        if (Array.isArray(trigger)) {
            return trigger.forEach(setEvents)
        }

        setEvents(trigger)
    })
}

export function unloadTargets(host) { return unloadElements(host, 'targets') }
export function unloadTriggers(host) { return unloadElements(host, 'triggers') }
export function loadTargets(host) { return loadElements(host, 'targets') }
export function loadTriggers(host) { return loadElements(host, 'triggers') }
