import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ToNumber } from '../../utils/to-number.js'
import { EaseInOut } from '../../utils/ease-in-out.js'
import { Timer } from '../../services/timer.js'
import { SelectorArrayToElements } from '../../utils/selector-array-to-elements.js'

const style = require(`./style.scss`).toString()
const outerStyle = `effect-ripple{pointer-events:none;}`
const template = require(`./index.html`)
const componentName = `effect-ripple`
const componentRoot = `.effect-ripple-container`
const maxScale = 1.3
const animator = (points, speed, stepFn) => new Promise(resolve => Timer(stepFn, EaseInOut(points, speed)).then(resolve))
const trigger = host => () => runStart(host)
const selectorsToDom = val => SelectorArrayToElements(null, val).value

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

const unloadTargets = host => {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(ob$ => ob$())
    host.targets$ = []
}

const loadTargets = host => {
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

const resetTargets = host => {
    unloadTargets(host)
    loadTargets(host)
}

const properties = {
    color: { format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value, },
    opacity: { format: val => Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value)), },
    speed: { format: val => Pipe(ToNumber, IfInvalid(600))(val).value, },
    start: {
        format: val => Pipe(ToString, IfInvalid(`mousedown`))(val).value,
        onChange: (_val, host) => resetTargets(host)
    },
    direction: { format: val => typeof val === `string` ? val : `auto`, },
    targets: {
        format: selectorsToDom,
        onChange: (_val, host) => resetTargets(host)
    },
}

const hasTargets = host => ({ get() { return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length } })
const hasTargets$ = host => ({ get() { return host.hasTargets && host.targets$ && Array.isArray(host.targets$) } })
const hasStart = host => ({ get() { return host.hasTargets && host.hasTargets$ && !!host.start } })
const canStart = host => ({ get() { return host.hasTargets && host.hasTargets$ && host.start && host.start !== `none` } })

const nonAutoOrigin = host => ({
    get() {
        return (
            host.downEvent === undefined
            || (host.downEvent && !host.downEvent.target)
            || (host.direction !== undefined && host.direction !== `auto`)
        )
            ? host.direction === `to left`
                ? `100% center`
                : [`center`, `auto`].indexOf(host.direction) > -1
                    ? `center center`
                    : `0% center`
            : false
    }
})

const canLoadTargets = host => ({
    get() {
        return host.hasTargets && host.hasTargets$ && host.hasStart
    }
})

const elements = {
    root: { selector: `.effect-ripple-container` },
    ripple: { selector: `.ripple` },
}

export const EffectRipple = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    methods: { trigger },
    computed: {
        hasTargets,
        hasTargets$,
        hasStart,
        canLoadTargets,
        canStart,
        nonAutoOrigin,
    },
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectRipple)