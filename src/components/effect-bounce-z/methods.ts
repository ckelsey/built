import ObserveEvent from '../../utils/observeEvent'
import { GetCurve } from '../../utils/curve'
import Timer from '../../services/timer'

const getDimension = target => {
    const max = Math.max(target.offsetWidth, target.offsetHeight)
    const min = Math.min(target.offsetWidth, target.offsetHeight)

    return (((max - min) / 2) + min)
}

const runStart = host => () => {
    if (host.on || !host.targets || !host.ready) { return }

    host.on = true

    Timer(
        host.speed,
        scale => {
            const set = el => {
                const dimension = getDimension(el)
                const scaleFactor = (dimension - scale) / dimension
                el.style.transform = `perspective(1px) translateZ(0) scaleX(${scaleFactor}) scaleY(${scaleFactor})`
            }
            host.targets.forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
        },
        GetCurve([1, -host.amount, (-host.amount * 1.125), 1], 0.5, false, host.speed),
        () => {
            const set = el => el.style.transform = `perspective(1px) translateZ(0) scaleX(1) scaleY(1)`
            host.targets.forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
            host.on = false
        }
    )
}

export const trigger = host => runStart(host)

export const unloadTargets = host => {
    if (!host.targets$ || !host.ready) { return }
    host.targets$.forEach(ob$ => ob$())
    host.targets$ = []
}

export const loadTargets = host => {
    if (!host.targets || !host.start || !host.ready) { return }

    const set = el => {
        el.style.transformStyle = 'preserve-3d'
        el.style.backfaceVisibility = `hidden`
        host.targets$.push(ObserveEvent(el, host.start).subscribe(runStart(host)))
    }

    host.targets.forEach(target => {
        if (Array.isArray(target)) { return target.forEach(set) }
        set(target)
    })
}