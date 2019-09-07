import ObserveEvent from '../../utils/observeEvent'
import { GetCurve } from '../../utils/curve'
import Timer from '../../services/timer'

const runAnimation = (host, isOn) => {
    Timer(
        host.speed,
        opacity => {
            const set = el => el.style.opacity = opacity
            host.targets.forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
        },
        GetCurve(isOn ? host.opacity.slice() : host.opacity.slice().reverse(), isOn ? host.spring : 0.5, false, host.speed),
        () => {
            const set = el => el.style.opacity = isOn ? 1 : 0
            host.targets.forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
        }
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
}

export const toggle = host => host.on ? runEnd(host) : runStart(host)
export const open = host => runStart(host)
export const close = host => runEnd(host)

export const unloadTriggers = host => {
    if (!host.hasTriggers$) { return }
    host.triggers$.forEach(ob$ => ob$())
    host.triggers$ = []
}

export const loadTriggers = host => {
    if (!host.canLoadTriggers) { return }

    const set = el => {
        host.triggers$.push(ObserveEvent(el, host.start, { useCapture: true }).subscribe(runStart(host)))

        if (host.canEnd) {
            host.triggers$.push(ObserveEvent(el, host.end).subscribe(runEnd(host)))
        }
    }

    host.triggers.forEach(trigger => {
        if (Array.isArray(trigger)) { return trigger.forEach(set) }
        set(trigger)
    })
}