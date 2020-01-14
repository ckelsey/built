import {
    WCConstructor, WCDefine, Pipe, IfInvalid, ToNumber, ToArray,
    ComponentClassObject, GetCurve, ObserveEvent, Timer, Get, IsElement
} from '../..'

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
    class: ComponentClassObject,
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