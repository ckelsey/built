import { ObserveEvent, GetCurve, Timer } from '../..'

const signalEnd = host => runEnd(host)

const runAnimation = (host, isOn) => {
    const underlineStyle = host.elements.underline.style

    if (isOn) {
        underlineStyle.opacity = host.opacity
        setOrigin(host)
    }

    Timer(
        host.speed,
        scale => underlineStyle.transform = `perspective(1px) translateZ(0) scaleX(${scale})`,
        GetCurve(isOn ? [0, 1] : [1, 0], isOn ? host.spring : 0.5, false, host.speed),
        () => underlineStyle.transform = `perspective(1px) translateZ(0) scaleX(${isOn ? 1 : 0})`
    )
}

const runEnd = host => () => {
    if (!host.canRunEnd) { return }
    host.on = false
    runAnimation(host, false)
}

const runStart = host => () => {
    if (!host.canRunStart) { return }
    host.on = true
    runAnimation(host, true)
    host.downEvent = undefined
}

const setOrigin = host => {
    if (!host.ready) { return }

    const nonAutoOrigin = host.nonAutoOrigin
    const underlineStyle = host.elements.underline.style

    if (nonAutoOrigin) { return underlineStyle.transformOrigin = nonAutoOrigin }

    const eventX = host.downEvent.x
    const targetBox = host.downEvent.target.getBoundingClientRect()
    const left = Math.round(((eventX - targetBox.left) / targetBox.width) * 100)
    underlineStyle.transformOrigin = `${left}% center`
}

export const toggle = host => host.on ? runEnd(host) : runStart(host)
export const open = host => runStart(host)
export const close = host => runEnd(host)

export const unloadTargets = host => {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(ob$ => ob$())
    host.targets$ = []
}

export const loadTargets = host => {
    if (!host.canLoadTargets) { return }

    unloadTargets(host)

    host.targets.forEach(target => {
        if (host.canStart) {
            host.targets$.push(ObserveEvent(target, `mousedown`).subscribe(e => host.downEvent = e))
            host.targets$.push(ObserveEvent(target, host.start).subscribe(runStart(host)))
        }

        if (host.canEnd) {
            host.targets$.push(ObserveEvent(target, host.end).subscribe(signalEnd(host)))
        }
    })
}