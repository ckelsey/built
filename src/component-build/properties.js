import { ComponentClassProperty } from './component-class-property.js'
import { Pipe } from '../utils/pipe.js'
import { ToBool } from '../utils/to-bool.js'
import { IfInvalid } from '../utils/if-invalid.js'
import { DispatchEvent } from '../utils/dispatch-event.js'
import { WhenAvailable } from '../utils/when-available.js'
import { SetStyleRules } from '../utils/set-style-rules.js'
import { ObjectAssign } from '../utils/object-assign.js'

const emptyFn = function () { }

export function Properties(_properties) {
    const properties = ObjectAssign({}, Object.freeze(_properties || {}))

    if (!properties.class) {
        properties.class = ComponentClassProperty
    }

    if (!properties.ready) {
        properties.ready = {
            format: function validationFn(val) { return Pipe(ToBool, IfInvalid(false))(val).value },
            onChange: function onReadyChange(_val, host) {
                host.setAttribute('ready', 'true')
                host.onReady(host)
                DispatchEvent(host, 'ready', host)
            }
        }
    }

    if (!properties.theme) {
        properties.theme = {
            format: function (val, host) { return typeof val === 'string' ? val : host.theme },
            onChange: function (val, host) {
                return WhenAvailable(host, 'elements.theme')
                    .then(function (themeElement) { return SetStyleRules(themeElement, val) })
                    .catch(emptyFn)
            }
        }
    }

    if (!properties.outertheme) {
        properties.outertheme = {
            format: function (val, host) { return typeof val === 'string' ? val : host.theme },
            onChange: function (val, host) {
                return WhenAvailable(host, 'elements.outertheme')
                    .then(function (themeElement) { return SetStyleRules(themeElement, val) })
                    .catch(emptyFn)
            }
        }
    }

    return properties
}