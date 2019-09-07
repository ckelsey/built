import ObserveEvent from '../../utils/observeEvent'
import { GetCurve } from '../../utils/curve'
import Timer from '../../services/timer'

const maxScale = 1.3

const runStart = host => {
    if (!host.ready) { return }

    const rippleInner = document.createElement(`span`)
    const style = rippleInner.style
    rippleInner.className = `ripple-inner`
    rippleInner.style.backgroundColor = host.color
    host.elements.ripple.appendChild(rippleInner)

    setOrigin(host, rippleInner)

    Timer(
        host.speed,
        scale => {
            const scaleAmount = Math.max(Math.min(maxScale, scale), 0)
            style.transform = `perspective(1px) translateZ(0) scaleX(${scaleAmount}) scaley(${scaleAmount})`

        },
        GetCurve(
            [0, maxScale],
            0,
            false,
            host.speed
        )
    )

    Timer(
        host.speed,
        opacity => style.opacity = `${Math.max(Math.min(1, opacity), 0)}`,
        GetCurve(
            [host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0],
            0,
            false,
            host.speed
        ),
        () => {
            host.elements.ripple.removeChild(rippleInner)
        }
    )
}

const setOrigin = (host, rippleInner) => {
    if (!host.ready) { return }

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
}

export const trigger = host => () => runStart(host)

export const unloadTargets = host => {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(ob$ => ob$())
    host.targets$ = []
}

export const loadTargets = host => {
    if (!host.canLoadTargets) { return }
    host.targets.forEach(target => {
        host.targets$.push(ObserveEvent(target, `mousedown`).subscribe(e => host.downEvent = e))
        host.targets$.push(ObserveEvent(target, host.start).subscribe(() => runStart(host)))
    })
}