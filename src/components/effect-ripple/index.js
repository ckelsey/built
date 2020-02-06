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

const style = require('./style.scss').toString()
const outerStyle = 'effect-ripple{pointer-events:none;}'
const template = require('./index.html')
const componentName = 'effect-ripple'
const componentRoot = ''.concat('.', componentName, '-container')
const maxScale = 1.3

function animator(points, speed, stepFn) {
    return new Promise(function (resolve) {
        return Timer(stepFn, EaseInOut(points, speed)).then(resolve)
    })
}

function trigger(host) {
    return function () {
        return runStart(host)
    }
}

function selectorsToDom(val) {
    return SelectorArrayToElements(null, val).value
}

function runStart(host) {
    if (!host.ready || host.isRunning) { return }

    host.isRunning = true

    const ripple = host.elements.ripple
    const rippleInner = document.createElement('span')

    rippleInner.className = 'ripple-inner'
    rippleInner.style.backgroundColor = host.color
    ripple.appendChild(rippleInner)

    setOrigin(host, rippleInner)

    animator(
        [0, maxScale],
        host.speed / 2,
        function (scale) {
            const scaleAmount = Math.max(Math.min(maxScale, scale), 0)
            rippleInner.style.transform = 'perspective(1px) translateZ(0) scaleX('.concat(scaleAmount, ') scaley(', scaleAmount, ')')
        }
    )

    animator(
        [host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0],
        host.speed,
        function (opacity) {
            return rippleInner.style.opacity = ''.concat(Math.max(Math.min(1, opacity), 0))
        }
    )
        .then(function () {
            return OnNextFrame(function () {
                return ripple ? ripple.removeChild(rippleInner) : undefined
            })
        })

}

function setOrigin(host, rippleInner) {
    if (!host.ready) { return }

    OnNextFrame(function () {
        const nonAutoOrigin = host.nonAutoOrigin
        const rippleInnerStyle = rippleInner.style

        if (nonAutoOrigin) { return rippleInnerStyle.transformOrigin = nonAutoOrigin }

        if (!host.downEvent || !host.downEvent.target) {
            return rippleInnerStyle.transformOrigin = '50% 50%'
        }

        const eventX = host.downEvent.x
        const eventY = host.downEvent.y
        const targetBox = host.downEvent.target.getBoundingClientRect()
        const left = Math.round(((eventX - targetBox.left) / targetBox.width) * 100)
        const top = Math.round(((eventY - targetBox.top) / targetBox.height) * 100)

        rippleInnerStyle.transformOrigin = ''.concat(left, '% ', top, '%')
    })
}

function unloadTargets(host) {
    if (!host.hasTargets$) { return }
    host.targets$.forEach(function (ob$) { return ob$() })
    host.targets$ = []
}

function loadTargets(host) {
    if (!Array.isArray(host.targets$)) {
        host.targets$ = []
    }
    if (!host.targets || !host.start) { return }
    if (!Array.isArray(host.targets)) { return }

    host.targets.forEach(function (target) {
        host.targets$.push(
            ObserveEvent(target, 'mousedown')
                .subscribe(function (e) {
                    return host.downEvent = e
                })
        )
        host.targets$.push(
            ObserveEvent(target, host.start)
                .subscribe(function () {
                    return runStart(host)
                })
        )
    })
}

function resetTargets(host) {
    unloadTargets(host)
    loadTargets(host)
}

const properties = {
    color: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('#59a2d8'))(val).value
        }
    },
    opacity: {
        format: function (val) {
            return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value))
        }
    },
    speed: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(600))(val).value }
    },
    start: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('mousedown'))(val).value
        },
        onChange: function (_val, host) {
            resetTargets(host)
        }
    },
    direction: {
        format: function (val) { return typeof val === 'string' ? val : 'auto' }
    },
    targets: {
        format: selectorsToDom,
        onChange: function (_val, host) {
            resetTargets(host)
        }
    },
}

function hasTargets(host) {
    return {
        get: function () { return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length }
    }
}

function hasTargets$(host) {
    return {
        get: function () {
            return host.hasTargets && host.targets$ && Array.isArray(host.targets$)
        }
    }
}

function hasStart(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && !!host.start
        }
    }
}

function canStart(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.start && host.start !== 'none'
        }
    }
}

function nonAutoOrigin(host) {
    return {
        get: function () {
            return (
                host.downEvent === undefined
                || (host.downEvent && !host.downEvent.target)
                || (host.direction !== undefined && host.direction !== 'auto')
            )
                ? host.direction === 'to left'
                    ? '100% center'
                    : ['center', 'auto'].indexOf(host.direction) > -1
                        ? 'center center'
                        : '0% center'
                : false
        }
    }
}

function canLoadTargets(host) {
    return {
        get: function () {
            return host.hasTargets && host.hasTargets$ && host.hasStart
        }
    }
}

const elements = {
    root: { selector: '.effect-ripple-container' },
    ripple: { selector: '.ripple' },
}

export const EffectRipple = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    methods: { trigger: trigger },
    computed: {
        hasTargets: hasTargets,
        hasTargets$: hasTargets$,
        hasStart: hasStart,
        canLoadTargets: canLoadTargets,
        canStart: canStart,
        nonAutoOrigin: nonAutoOrigin,
    },
    onDisconnected: function (host) { unloadTargets(host) }
})

WCDefine(componentName, EffectRipple)