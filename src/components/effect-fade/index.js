import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { Get } from '../../utils/get.js'
import { Timer } from '../../services/timer.js'
import { GetCurve } from '../../utils/get-curve.js'
import { IsElement } from '../../utils/is-element.js'
import { ToArray } from '../../utils/to-array.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-fade`
const componentRoot = `.effect-fade-container`
const elements = { root: { selector: `.effect-fade-container` } }
const defaultOn = `mousedown`
const defaultOff = `mouseup`
const defaultSpeed = 600
const defaultOpacity = [0, 1]
const unloadTargets = host => Get(host, `_targets`, []).forEach(target => [Get(target, `observers.on()`), Get(target, `observers.off()`)])
const validTarget = target => target && !!target.element
const animator = (points, speed, stepFn) => Timer(stepFn, GetCurve(points, 0.5, false, speed))
const atStartPosition = object => parseFloat(window.getComputedStyle(object.element).getPropertyValue(`opacity`)) === parseFloat(object.opacity[0])

const loadTargets = (_val, host) => {
    unloadTargets(host)

    host._targets = Get(host, `targets`, [])
        .map(target => {
            const object = {
                element: Pipe(IsElement, IfInvalid(null))(Get(target, `element`)).value,
                on: Get(target, `on`) && typeof target.on === `string` ? target.on : defaultOn,
                off: Get(target, `off`) && typeof target.off === `string` ? target.off : defaultOff,
                opacity: Pipe(CommasToArray, IfInvalid(defaultOpacity), ToMap(v => ToNumber(v).value))(Get(target, `opacity`)).value,
                speed: Pipe(ToNumber, IfInvalid(defaultSpeed))(Get(target, `speed`)).value,
            }


            if (validTarget(target)) {
                object.onHandler = e => {
                    object.atStart = atStartPosition(object)
                    host.dispatchEvent(new Event(`startedon`, { detail: object }))

                    if (typeof target.onHandler === `function`) { target.onHandler(e) }

                    return animator(
                        object.opacity.slice(),
                        object.speed,
                        opacity => object.element.style.opacity = opacity
                    ).then(() => {
                        object.element.style.opacity = object.opacity[object.opacity.length]
                        host.dispatchEvent(new Event(`endedon`, { detail: object }))
                        return object
                    })
                }

                object.offHandler = e => {
                    object.atStart = atStartPosition(object)
                    host.dispatchEvent(new Event(`startedoff`, { detail: object }))

                    if (typeof target.offHandler === `function`) { target.offHandler(e) }

                    return animator(
                        object.opacity.slice().reverse(),
                        object.speed,
                        opacity => object.element.style.opacity = opacity
                    ).then(() => {
                        object.element.style.opacity = object.opacity[0]
                        host.dispatchEvent(new Event(`endedoff`, { detail: object }))
                        return object
                    })
                }

                object.observers = {
                    on: ObserveEvent(object.element, object.on).subscribe(object.onHandler),
                    off: ObserveEvent(object.element, object.off).subscribe(object.offHandler)
                }

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

const runTargetAtIndex = (index, host) => {
    const object = Get(host, `_targets.${index}`)
    const handler = Get(object, `${atStartPosition(object) ? `on` : `off`}Handler`)
    return handler ? handler() : undefined
}

export const EffectFade = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    methods: { trigger: host => index => runTargetAtIndex(index, host) },
    onReady: host => loadTargets(undefined, host),
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectFade)