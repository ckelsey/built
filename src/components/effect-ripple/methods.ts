import ObserveEvent from '../../utils/observeEvent'

const signalEnd = host => runEnd(host)

const runEnd = host => () => {
    host.elements.root.classList.remove(`hide`)
    host.elements.root.classList.add(`fade`)
    host.elements.root.classList.remove(`active`)
    host.on = false

    const startTime = new Date().getTime()
    let loop = () => {
        const now = new Date().getTime()

        if (now - startTime >= host.speed) {
            host.elements.root.classList.remove(`fade`)
        } else {
            requestAnimationFrame(loop)
        }
    }

    loop()
}

const runStart = host => e => {
    if (host.on) { return }
    if (!host.targets || host.targets.length === 0) { return }

    const el = e ? e.target as HTMLElement : host.targets[0]

    host.on = true
    host.elements.root.classList.remove(`hide`)
    host.elements.root.classList.add(`active`)

    const startTime = new Date().getTime()
    let loop = () => {
        const now = new Date().getTime()

        setPositions(host)(el, e ? e.type === `focus` ? host.downEvent : e : host.downEvent)

        if (now - startTime < host.speed) {
            return requestAnimationFrame(loop)
        }

        runEnd(host)()
    }
    loop()
}

const setPositions = host => (element, e) => {
    const el = !!element ? element : !!e && e.target ? e.target : host.targets[0]

    if (!el) { return }

    host.elements.ripple.style.width = `${el.offsetWidth}px`
    host.elements.ripple.style.height = `${el.offsetHeight}px`

    if (e) {
        const x = ((e.x - el.offsetLeft) / el.offsetWidth) * 100
        const left = Math.min(Math.max(x, 5), 95)
        host.elements.rippleInner.style.transformOrigin = `${100 - left}% 50%`
    }
}

export const trigger = host => runStart(host)

export const unloadTargets = host => {
    if (!host.targets$) { return }
    host.targets$.forEach(ob$ => ob$())
}

export const loadTargets = host => {
    if (!host.targets || !host.start || !host.targets$) { return }

    host.targets.forEach((target, index) => {
        target[`bounceindex`] = index

        const start$ = ObserveEvent(target, host.start, { useCapture: false })
            .subscribe(
                runStart(host),
                () => start$(),
                () => start$()
            )

        host.targets$.push(start$)

        const down$ = ObserveEvent(target, `mousedown`, { useCapture: false })
            .subscribe(
                e => host.downEvent = e,
                () => down$(),
                () => down$()
            )
        host.targets$.push(down$)

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