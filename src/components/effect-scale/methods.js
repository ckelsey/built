import { ObserveEvent, GetCurve } from '../..'

const idealFPS = 60
const frames = speed => Math.round(idealFPS * (speed / 1000))

const setTransform = (element, X, Y, doX, doY, lastFrame, toScaledState) => {
    element.style.transform = `perspective(1px) translateZ(0) scaleX(${X}) scaleY(${Y})`

    if (doX === true) {
        element.style.width = `unset`
    }

    if (doY === true) {
        element.style.height = `unset`
    }

    if (lastFrame && !toScaledState) { return }

    const box = element.getBoundingClientRect()

    if (doX === true) {
        element.style.width = lastFrame && !toScaledState ? `unset` : `${box.width}px`
    }

    if (doY === true) {
        element.style.height = lastFrame && !toScaledState ? `unset` : `${box.height}px`
    }

    /*
    if (doX === true) {
        const calculatedWidth = element.scrollWidth * X
        element.style.width = lastFrame && !toScaledState ? `unset` : `${calculatedWidth}px`
    }

    if (doY === true) {
        const calculatedHeight = element.scrollHeight * Y
        element.style.height = lastFrame && !toScaledState ? `unset` : `${calculatedHeight}px`
    }
    */
}

const transformElements = (targets, X, Y, doX, doY, lastFrame, toScaledState) => {
    targets.forEach(element => {
        if (Array.isArray(element)) {
            return element.forEach(el => setTransform(el, X, Y, doX, doY, lastFrame, toScaledState))
        }

        setTransform(element, X, Y, doX, doY, lastFrame, toScaledState)
    })
}

const setStaticTransform = targets => {
    const set = el => {
        el.style.transformStyle = `preserve-3d`
        el.style.backfaceVisibility = `hidden`
    }

    targets.forEach(element => {
        if (Array.isArray(element)) { return element.forEach(set) }
        set(element)
    })
}

const canNotRun = host => host.ready !== true || !host.hasTargets || typeof host.x !== `boolean` || typeof host.y !== `boolean` || typeof host.scaled !== `boolean`

export const run = (scaled, host, quickSet = false) => {
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

    const loop = () => {
        if (scaled !== host.scaled) { return }

        const scale = scalePoints.shift()
        const lastFrame = !scalePoints.length
        const getXY = key => !!host[key] && lastFrame ? endAmount : host[key] ? scale : 1

        host.isScaling = lastFrame ? false : true
        host.isScaled = scaled && lastFrame ? true : false

        transformElements(host.targets, getXY(`x`), getXY(`y`), host.x, host.y, lastFrame, scaled)

        if (!lastFrame) { return requestAnimationFrame(loop) }
    }

    loop()
}

export const setOrigin = (val, host) => {
    if (!host.hasTargets) { return }

    const parts = val.split(` `)
    const x = parts[0]
    const y = parts.length > 1 ? parts[1] : parts[0]
    const origin = `${x} ${y}`

    if (!Array.isArray(host.targets)) { return }

    host.targets.forEach(target => {
        if (Array.isArray(target)) {
            return target.forEach(element => element.style.transformOrigin = origin)
        }

        if (target) {
            target.style.transformOrigin = origin
        }
    })
}

export const dispose = host => {
    unloadElements(host, `targets`)
    unloadElements(host, `triggers`)
}

const unloadElements = (host, key) => {
    if (!host[`${key}$`]) {
        return
    }
    host[`${key}$`].forEach(ob$ => ob$())
    host[`${key}$`] = []
}

const loadElements = (host, key) => {
    if (key === `targets`) {
        return run(host.scaled, host)
    }

    if (!host.hasTriggers || !host.start) { return }

    if (!Array.isArray(host.triggers$)) { host.triggers$ = [] }

    const toggle = !host.end

    const setEvents = trigger => {
        if (toggle) {
            return host.triggers$.push(ObserveEvent(trigger, host.start).subscribe(() => host.scaled = !host.scaled))
        }

        host.triggers$.push(ObserveEvent(trigger, host.start).subscribe(() => host.scaled = true))
        host.triggers$.push(ObserveEvent(trigger, host.end).subscribe(() => host.scaled = false))
    }

    host.triggers.forEach(trigger => {
        if (Array.isArray(trigger)) {
            return trigger.forEach(setEvents)
        }

        setEvents(trigger)
    })
}

export const unloadTargets = host => unloadElements(host, `targets`)
export const unloadTriggers = host => unloadElements(host, `triggers`)
export const loadTargets = host => loadElements(host, `targets`)
export const loadTriggers = host => loadElements(host, `triggers`)
