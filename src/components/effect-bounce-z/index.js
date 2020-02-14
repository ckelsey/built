import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { Get } from '../../utils/get.js'
import { Timer } from '../../services/timer.js'
import { GetCurve } from '../../utils/get-curve.js'
import { IsElement } from '../../utils/is-element.js'
import { ToArray } from '../../utils/to-array.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { Components } from '../../services/components.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'

const template = require('./index.html')
const componentName = 'effect-bounce-z'
const componentRoot = '.effect-push-container'
const defaultOn = 'mousedown'
const defaultSpeed = 300
const defaultAmount = -4

function unloadTargets(host) {
    return Get(host, '_targets', []).forEach(function (target) { return Get(target, 'observer()') })
}

function validTarget(target) {
    return target && !!target.element
}

function animator(points, speed, stepFn) {
    return Timer(stepFn, GetCurve(points, 0.5, false, speed))
}

function loadTargets(_val, host) {
    unloadTargets(host)

    host._targets = Get(host, 'targets', [])
        .map(function (target) {
            const object = {
                element: Pipe(IsElement, IfInvalid(null))(target).value,
                on: typeof target.on === 'string' ? target.on : defaultOn,
                amount: Pipe(ToNumber, IfInvalid(defaultAmount))(target.amount).value,
                speed: Pipe(ToNumber, IfInvalid(defaultSpeed))(target.speed).value
            }

            if (validTarget(object)) {
                object.handler = function (e) {
                    DispatchEvent(host, 'started', object)

                    object.element.style.transformStyle = 'preserve-3d'
                    object.element.style.backfaceVisibility = 'hidden'

                    // if (typeof object.handler === 'function') { object.handler(e) }

                    return animator(
                        [1, -object.amount, (-object.amount * 1.125), 1],
                        object.speed,
                        function (scale) {
                            const max = Math.max(object.element.offsetWidth, object.element.offsetHeight)
                            const min = Math.min(object.element.offsetWidth, object.element.offsetHeight)
                            const dimension = (((max - min) / 2) + min)
                            object.element.style.transform = 'perspective(1px) translateZ(0) scale('.concat((dimension - scale) / dimension, ')')
                        }
                    ).then(function () {
                        object.element.style.removeProperty('transform')
                        DispatchEvent(host, 'ended', object)
                        return object
                    })
                }

                object.observer = ObserveEvent(object.element, object.on).subscribe(object.handler)
                return object
            }

            return object
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
    return Get(host, '_targets.' + index + '.handler()')
}

const EffectBounceZ = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    properties: properties,
    observedAttributes: Object.keys(properties),
    methods: {
        trigger: function (host) {
            return function (index) {
                runTargetAtIndex(index, host)
            }
        }
    }
})

Components.addComponent(componentName, EffectBounceZ)

export { EffectBounceZ }