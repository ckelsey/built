import { ObserveEvent, EaseInOut, Timer, OnNextFrame } from '../..'

const maxScale = 1.3

const animator = (points, speed, stepFn) => new Promise(resolve =>
    Timer(
        stepFn,
        EaseInOut(points, speed)
    ).then(resolve)
)

const runStart = host => {
    if (!host.ready || host.isRunning) { return }

    host.isRunning = true

    const ripple = host.elements.ripple
    const rippleInner = document.createElement(`span`)

    rippleInner.className = `ripple-inner`
    rippleInner.style.backgroundColor = host.color
    ripple.appendChild(rippleInner)

    setOrigin(host, rippleInner)

    animator(
        [0, maxScale],
        host.speed / 2,
        scale => {
            const scaleAmount = Math.max(Math.min(maxScale, scale), 0)
            rippleInner.style.transform = `perspective(1px) translateZ(0) scaleX(${scaleAmount}) scaley(${scaleAmount})`
        }
    )

    animator(
        [host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0],
        host.speed,
        opacity => rippleInner.style.opacity = `${Math.max(Math.min(1, opacity), 0)}`,
    )
        .then(() => OnNextFrame(() => ripple ? ripple.removeChild(rippleInner) : undefined))

}

const setOrigin = (host, rippleInner) => {
    if (!host.ready) { return }

    OnNextFrame(() => {
        const nonAutoOrigin = host.nonAutoOrigin
        const rippleInnerStyle = rippleInner.style

        if (nonAutoOrigin) { return rippleInnerStyle.transformOrigin = nonAutoOrigin }

        if (!host.downEvent || !host.downEvent.target) {
            return rippleInnerStyle.transformOrigin = `50% 50%`
        }

        const eventX = host.downEvent.x
        const eventY = host.downEvent.y
        const targetBox = host.downEvent.target.getBoundingClientRect()
        const left = Math.round(((eventX - targetBox.left) / targetBox.width) * 100)
        const top = Math.round(((eventY - targetBox.top) / targetBox.height) * 100)

        rippleInnerStyle.transformOrigin = `${left}% ${top}%`
    })
}

export const trigger = host => () => runStart(host)

export const unloadTargets = host => {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(ob$ => ob$())
    host.targets$ = []
}

export const loadTargets = host => {
    if (!Array.isArray(host.targets$)) {
        host.targets$ = []
    }
    if (!host.targets || !host.start) { return }
    if (!Array.isArray(host.targets)) { return }

    host.targets.forEach(target => {
        host.targets$.push(ObserveEvent(target, `mousedown`).subscribe(e => host.downEvent = e))
        host.targets$.push(ObserveEvent(target, host.start).subscribe(() => runStart(host)))
    })
}