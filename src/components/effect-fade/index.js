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
import { DispatchEvent } from '../../utils/dispatch-event.js'

const style = require('./style.scss').toString()
const outerStyle = 'effect-ripple{pointer-events:none;}'
const template = require('./index.html')
const componentName = 'effect-fade'
const componentRoot = ''.concat('.', componentName, '-container')
const elements = { root: { selector: '.effect-fade-container' } }
const defaultOn = 'mousedown'
const defaultOff = 'mouseup'
const defaultSpeed = 600
const defaultOpacity = [0, 1]

function unloadTargets(host) {
    return Get(host, '_targets', []).forEach(function (target) { return [Get(target, 'observers.on()'), Get(target, 'observers.off()')] })
}

function validTarget(target) {
    return target && !!target.element
}

function animator(points, speed, stepFn) {
    return Timer(stepFn, GetCurve(points, 0.5, false, speed))
}

function atStartPosition(object) {
    return parseFloat(window.getComputedStyle(object.element).getPropertyValue('opacity')) === parseFloat(object.opacity[0])
}

function loadTargets(_val, host) {
    unloadTargets(host)

    host._targets = Get(host, 'targets', [])
        .map(function (target) {
            const object = {
                element: Pipe(IsElement, IfInvalid(null))(Get(target, 'element')).value,
                on: Get(target, 'on') && typeof target.on === 'string' ? target.on : defaultOn,
                off: Get(target, 'off') && typeof target.off === 'string' ? target.off : defaultOff,
                opacity: Pipe(CommasToArray, IfInvalid(defaultOpacity), ToMap(
                    function (v) {
                        return ToNumber(v).value
                    }
                ))(Get(target, 'opacity')).value,
                speed: Pipe(ToNumber, IfInvalid(defaultSpeed))(Get(target, 'speed')).value,
            }

            function setOpacity(opacity) {
                object.element.style.opacity = opacity
            }


            if (validTarget(target)) {
                object.onHandler = function (e) {
                    object.atStart = atStartPosition(object)
                    DispatchEvent(host, 'startedon', object)

                    if (typeof target.onHandler === 'function') { target.onHandler(e) }

                    return animator(
                        object.opacity.slice(),
                        object.speed,
                        setOpacity
                    ).then(function () {
                        setOpacity(object.opacity[object.opacity.length])
                        DispatchEvent(host, 'endedon', object)
                        return object
                    })
                }

                object.offHandler = function (e) {
                    object.atStart = atStartPosition(object)
                    DispatchEvent(host, 'startedoff', object)

                    if (typeof target.offHandler === 'function') { target.offHandler(e) }

                    return animator(
                        object.opacity.slice().reverse(),
                        object.speed,
                        setOpacity
                    ).then(function () {
                        setOpacity(object.opacity[0])
                        DispatchEvent(host, 'endedoff', object)
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
        .filter(function (t) { return !!t })
}

const properties = {
    targets: {
        format: function (val) {
            return Pipe(ToArray, IfInvalid([]))(val).value
        },
        onChange: loadTargets
    }
}

function runTargetAtIndex(index, host) {
    const object = Get(host, '_targets.'.concat(index))
    const handler = Get(object, ''.concat(atStartPosition(object) ? 'on' : 'off', 'Handler'))
    return handler ? handler() : undefined
}

export const EffectFade = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    methods: {
        trigger: function (host) {
            return function (index) {
                runTargetAtIndex(index, host)
            }
        }
    },
    onReady: function (host) {
        return loadTargets(undefined, host)
    },
    onDisconnected: function (host) {
        return unloadTargets(host)
    }
})

WCDefine(componentName, EffectFade)