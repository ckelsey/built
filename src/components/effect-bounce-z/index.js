import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { Get } from '../../utils/get.js'
import { Timer } from '../../services/timer.js'
import { GetCurve } from '../../utils/get-curve.js'
import { IsElement } from '../../utils/is-element.js'
import { ToArray } from '../../utils/to-array.js'

const template = require(`./index.html`)
const componentName = `effect-bounce-z`
const componentRoot = `.effect-push-container`
const defaultOn = `mousedown`
const defaultSpeed = 300
const defaultAmount = -4

const unloadTargets = host => Get(host, `_targets`, []).forEach(target => Get(target, `observer()`))
const validTarget = target => !!target.element
const animator = (points, speed, stepFn) => Timer(stepFn, GetCurve(points, 0.5, false, speed))

const loadTargets = (_val, host) => {
    unloadTargets(host)

    host._targets = Get(host, `targets`, [])
        .map(target => {
            const object = {
                element: Pipe(IsElement, IfInvalid(null))(target.element).value,
                on: typeof target.on === `string` ? target.on : defaultOn,
                amount: Pipe(ToNumber, IfInvalid(defaultAmount))(target.amount).value,
                speed: Pipe(ToNumber, IfInvalid(defaultSpeed))(target.speed).value
            }

            if (validTarget(target)) {
                object.handler = e => {
                    host.dispatchEvent(new Event(`started`, { detail: object }))

                    object.element.style.transformStyle = `preserve-3d`
                    object.element.style.backfaceVisibility = `hidden`

                    if (typeof target.handler === `function`) { target.handler(e) }

                    return animator(
                        [1, -object.amount, (-object.amount * 1.125), 1],
                        object.speed,
                        scale => {
                            const max = Math.max(object.element.offsetWidth, object.element.offsetHeight)
                            const min = Math.min(object.element.offsetWidth, object.element.offsetHeight)
                            const dimension = (((max - min) / 2) + min)
                            object.element.style.transform = `perspective(1px) translateZ(0) scale(${(dimension - scale) / dimension})`
                        }
                    ).then(() => {
                        object.element.style.removeProperty(`transform`)
                        host.dispatchEvent(new Event(`ended`, { detail: object }))
                        return object
                    })
                }

                object.observer = ObserveEvent(object.element, object.on).subscribe(object.handler)
                return object
            }
        })
        .filter(t => !!t)
}

const properties = {
    targets: {
        format: val => Pipe(ToArray, IfInvalid([]))(val).value,
        onChange: loadTargets
    }
}

const runTargetAtIndex = (index, host) => Get(host, `_targets.${index}.handler()`)

export const EffectBounceZ = WCConstructor({
    componentName,
    componentRoot,
    template,
    properties,
    observedAttributes: Object.keys(properties),
    methods: { trigger: host => index => runTargetAtIndex(index, host) },
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectBounceZ)