import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { CreateElement } from '../../utils/create-element.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { Try } from '../../utils/try.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { Get } from '../../utils/get.js'
import { ObserveSlots } from '../../utils/observe-slots.js'
import { ID } from '../../services/id.js'
import { ArrayFrom } from '../../utils/array-from.js'

const defaultWidth = 240
const defaultGap = [16, 16]
const template = require('./index.html')
const componentName = 'ajax-form'
const componentRoot = '.' + componentName + '-container'
const outerStyle = require('./outer.scss').toString()

function setAttribute(host, val, name, elKey) {
    return WCWhenPropertyReady(host, 'elements.' + elKey).then(
        function ElReady(el) {
            return el[val ? 'setAttribute' : 'removeAttribute'](name, val)
        }
    )
}

function submitForm(host) {
    return host.elements.form.dispatchEvent(new Event('submit'))
}

function getFormData(host) {
    const newForm = CreateElement({
        tagName: 'form',
        action: host.action,
        method: host.method,
        name: host.name,
        style: 'position:fixed;top:0;left:0;pointer-events:none;opacity:0;'
    })

    ArrayFrom(host.querySelectorAll('input')).forEach(
        function inputForeach(input) {
            return newForm.appendChild(
                CreateElement({
                    tagName: 'input',
                    autocomplete: input.autocomplete,
                    value: input.value,
                    type: input.type,
                    name: input.name || input.autocomplete || input.type
                })
            )
        })

    document.body.appendChild(newForm)

    const data = {}
    const formData = new FormData(newForm)

    formData.forEach(function formDataForEach(value, key) { data[key] = value })
    host.dispatchEvent(new CustomEvent('submitdata', { detail: data }))
    OnNextFrame(function getFormDataNext() { document.body.removeChild(newForm) })
}

const elements = {
    root: { selector: componentRoot },
    grid: { selector: '.' + componentName + '-grid' },
    form: {
        selector: '.' + componentName + '-form',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                submit: ObserveEvent(el, 'submit', { preventDefault: true })
                    .subscribe(function submitSubscription(e) {
                        e.preventDefault()
                        getFormData(host)
                    })
            }
        }
    }
}

const properties = {
    action: {
        format: function (val) { return Pipe(ToString, IfInvalid('/'))(val).value },
        onChange: function (val, host) { return setAttribute(host, val, 'action', 'form') }
    },
    method: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('POST'))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'method', 'form')
        }
    },
    name: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'name', 'form')
        }
    },
    request: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        }
    },

    reload: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value }
    },
    contenttype: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('application/json'))(val).value
        }
    },
    scaletofit: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'scaletofit', 'grid')
        }
    },
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'columnwidth', 'grid')
        }
    },
    gap: {
        format: function (val) {
            return Pipe(CommasToArray, IfInvalid([val, val]), ToMap(
                function gapMap(v) {
                    const tv = ToNumber(v).value
                    if (isNaN(tv)) { return defaultGap[0] }
                    return tv
                }
            ))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'gap', 'grid')
        }
    }
}

export const AjaxForm = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    outerStyle: outerStyle,
    properties: properties,
    observedAttributes: Object.keys(properties),
    elements: elements,
    onConnected: function (host) {
        function wrap(el) {
            return WCWhenPropertyReady(host, 'elements.grid')
                .then(function gridReady(appendTo) {
                    const tagName = Get(el, 'tagName.toLowerCase()')
                    const isInput = tagName === 'input-field'
                    const isBtn = tagName === 'button-element'
                    const isSubmit = isBtn && el.type === 'submit'
                    const id = ID()
                    const wrapper = CreateElement({ tagName: 'div', class: '.' + componentName + '-slot-wrapper', id: id })
                    const slot = CreateElement({ tagName: 'slot', name: id })

                    if (isSubmit) {
                        el.eventSubscriptions = { click: ObserveEvent(el, 'click').subscribe(function () { return submitForm(host) }) }
                    } else if (isInput) {
                        el.eventSubscriptions = { done: ObserveEvent(el, 'done').subscribe(function () { return submitForm(host) }) }
                    }

                    el.slot = id
                    el.container = wrapper

                    wrapper.appendChild(slot)
                    appendTo.appendChild(wrapper)
                })
        }

        function removeEl() {
            Try(function (el) {
                Get(el, 'container.parentElement').removeChild(el.container)
            })
        }

        function unsubscribeEl() {
            Try(function (el) {
                ObserverUnsubscribe(el)
            })
        }

        function unwrap(el) {
            unsubscribeEl(el)
            removeEl(el)
        }

        function addedEach(el) {
            Get(el, 'tagName.toLowerCase()') === 'style' ? undefined : wrap(el)
        }

        host.eventSubscriptions = {
            slots: ObserveSlots(host, false).subscribe(function SlotsSub(elements) {
                elements.added.forEach(addedEach)
                elements.removed.forEach(unwrap)
            })
        }

        ArrayFrom(host.children).forEach(addedEach)
    },
    onDisconnected: function (host) {
        ObserverUnsubscribe(host)
    }
})

WCDefine(componentName, AjaxForm)