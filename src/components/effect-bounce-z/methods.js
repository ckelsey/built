import { GetCurve, ObserveEvent, Timer, Get, OnNextFrame } from '../..'

const animator = (points, speed, stepFn) => new Promise(resolve =>
    Timer(
        stepFn,
        GetCurve(points, 0.5, false, speed)
    ).then(resolve)
)

const runStart = host => () => {
    if (host.on || !host.targets || !host.ready) { return }

    host.on = true

    if (!Array.isArray(host.targets)) { return }

    animator(
        [1, -host.amount, (-host.amount * 1.125), 1],
        host.speed,
        scale => {
            const set = el => OnNextFrame(() => {
                const max = Math.max(el.offsetWidth, el.offsetHeight)
                const min = Math.min(el.offsetWidth, el.offsetHeight)
                const dimension = (((max - min) / 2) + min)

                el.style.transform = `perspective(1px) translateZ(0) scale(${(dimension - scale) / dimension})`
            })

            Get(host, `targets`, []).forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
        }
    ).then(() => {
        const set = el => el.style.removeProperty(`transform`)
        Get(host, `targets`, []).forEach(target => Array.isArray(target) ? target.forEach(set) : set(target))
        host.on = false
    })
}

export const trigger = host => runStart(host)

export const unloadTargets = host => {
    if (!host.targets$ || !host.ready) { return }
    Get(host, `targets$`, []).forEach(ob$ => ob$())
    host.targets$ = []
}

export const loadTargets = host => {
    if (!Array.isArray(host.targets$)) { host.targets$ = [] }
    if (!host.targets || !host.start) { return }

    const set = el => {
        el.style.transformStyle = `preserve-3d`
        el.style.backfaceVisibility = `hidden`
        host.targets$.push(ObserveEvent(el, host.start).subscribe(runStart(host)))
    }

    if (!Array.isArray(host.targets)) { return }

    Get(host, `targets`, []).forEach(target => {
        if (Array.isArray(target)) { return target.forEach(set) }
        set(target)
    })
}