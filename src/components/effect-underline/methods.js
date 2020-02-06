import { ObserveEvent, EaseInOut, Timer, Get, OnNextFrame } from '../..'

function signalEnd(host) {
    return runEnd(host)
}

function animator(points, speed, stepFn) {
    return new Promise(function (resolve) {
        return Timer(
            stepFn,
            EaseInOut(points, speed)
        ).then(resolve)
    })
}

function transform(v) {
    return 'perspective(1px) translateZ(0) scaleX('.concat(v, ')')
}

function runAnimation(host, isOn) {
    const underlineStyle = host.elements.underline.style

    if (isOn) {
        underlineStyle.opacity = host.opacity
        setOrigin(host)
    }

    animator(
        isOn ? [0, 1] : [1, 0],
        host.speed / 2,
        function (scale) {
            return underlineStyle.transform = transform(scale)
        }
    ).then(function () {
        return underlineStyle.transform = transform(isOn ? 1 : 0)
    })
}

function runEnd(host) {
    return function () {
        if (!host.canRunEnd) { return }
        host.on = false
        runAnimation(host, false)
    }
}

function runStart(host) {
    return function () {
        if (!host.canRunStart) { return }
        host.on = true
        runAnimation(host, true)
        host.downEvent = undefined
    }
}

function setOrigin(host) {
    if (!host.ready) { return }

    OnNextFrame(function () {
        const nonAutoOrigin = host.nonAutoOrigin
        const underlineStyle = host.elements.underline.style

        if (nonAutoOrigin) { return underlineStyle.transformOrigin = nonAutoOrigin }

        const eventX = Get(host, 'downEvent.x', 0)
        const targetBox = Get(host, 'downEvent.target.getBoundingClientRect()', { left: 0, width: 0 })
        const left = Math.round(((eventX - targetBox.left) / targetBox.width) * 100)
        underlineStyle.transformOrigin = ''.concat(left, '% center')
    })
}

export function toggle(host) {
    return host.on ? runEnd(host) : runStart(host)
}

export function open(host) { return runStart(host) }
export function close(host) { return runEnd(host) }

export function unloadTargets(host) {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(function (ob$) { return ob$() })
    host.targets$ = []
}

export function loadTargets(host) {
    if (!Array.isArray(host.targets$)) { host.targets$ = [] }

    if (!host.canLoadTargets) { return }

    unloadTargets(host)

    if (!Array.isArray(host.targets)) { return }

    host.targets.forEach(function (target) {
        if (host.canStart) {
            host.targets$.push(ObserveEvent(target, 'mousedown').subscribe(function (e) { host.downEvent = e }))
            host.targets$.push(ObserveEvent(target, host.start).subscribe(runStart(host)))
        }

        if (host.canEnd) {
            host.targets$.push(ObserveEvent(target, host.end).subscribe(signalEnd(host)))
        }
    })
}