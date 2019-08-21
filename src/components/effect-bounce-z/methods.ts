import ObserveEvent from '../../utils/observeEvent'
import { GetCurve } from '../../utils/curve'

const getDimension = target => {
    const max = Math.max(target.offsetWidth, target.offsetHeight)
    const min = Math.min(target.offsetWidth, target.offsetHeight)

    return (((max - min) / 2) + min)
}

const signalEnd = host => runEnd(host)

const runEnd = host => () => {
    if (!host.targets) { return }
    host.on = false

    host.targets.forEach(target => {

        const amount = host.amount
        const dimension = getDimension(target)
        const scale = (dimension - amount) / dimension
        // bounce back up overshot animation points, but commented out for now
        // until I can figure out how scaling up won't cause window scrollbars
        // const points = GetCurve([scale, 1 + ((1 - scale) * 0.38), 1])

        // linear return animation points
        const points = GetCurve([scale, 1])

        const timeout = GetCurve([0, host.speed / points.length])

        const loop = () => {
            if (host.on) { return }

            const point = points.shift()
            const time = timeout[points.length]

            target.style.transform = `scale(${point})`

            if (points.length) {
                setTimeout(() => loop(), time)
            }
        }

        loop()
    })
}

const runStart = host => () => {
    if (host.on) { return }
    if (!host.targets) { return }

    host.on = true

    host.targets.forEach((target, index) => {
        const amount = host.amount
        const dimension = getDimension(target)
        const scale = (dimension - amount) / dimension
        const points = GetCurve([1, 1 - ((1 - scale) * 1.125), scale])
        const timeout = GetCurve([0, amount.speed / points.length])

        const loop = () => {
            if (!host.on) { return }

            const point = points.shift()
            const time = timeout[points.length]

            target.style.transform = `scale(${point})`

            if (points.length) {
                setTimeout(() => loop(), time)
            } else if (index === host.targets.length - 1) {
                runEnd(host)()
            }
        }

        loop()
    })
}

export const trigger = host => runStart(host)

export const unloadTargets = host => {
    if (!host.targets$) { return }
    host.targets$.forEach(ob$ => ob$())
}

export const loadTargets = host => {
    if (!host.targets || !host.start || !host.targets$) { return }

    host.targets.forEach(target => {
        const start$ = ObserveEvent(target, host.start, { useCapture: false })
            .subscribe(
                runStart(host),
                () => start$(),
                () => start$()
            )

        host.targets$.push(start$)

        if (host.end) {
            const end$ = ObserveEvent(target, host.end, { useCapture: false })
                .subscribe(
                    signalEnd(host),
                    () => end$(),
                    () => end$()
                )

            host.targets$.push(end$)
        }
    })
}