import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ToNumber } from '../../utils/to-number.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { CreateElement } from '../../utils/create-element.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { ArrayFrom } from '../../utils/array-from.js'
import { LoadOnReady } from '../../component-build/load-on-ready.js'
import { ForEach } from '../../utils/for-each.js'

const defaultWidth = 400
const template = require('./index.html')
const componentName = 'ajax-form'
const outerStyle = require('./outer.scss').toString()

function setAttribute(host, val, name, elKey) {
    return WhenAvailable(host, 'elements.' + elKey)
        .then(function ElReady(el) {
            return el[val ? 'setAttribute' : 'removeAttribute'](name, val)
        })
        .catch(function () { })
}

function submitForm(host) {
    return DispatchEvent(host.elements.form, 'submit')
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
    DispatchEvent(host, 'submitdata', data)
    OnNextFrame(function getFormDataNext() { document.body.removeChild(newForm) })
}

const elements = {
    root: { selector: '.' + componentName + '-container' },
    grid: { selector: '.' + componentName + '-grid' },
    buttonGrid: { selector: '.' + componentName + '-grid-buttons' },
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
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'columnwidth', 'grid')
        }
    },
    mincolumnwidth: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(300))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'minwidth', 'grid')
        }
    },
    buttonscolumnwidth: {
        format: function (val) { return val === '100%' ? val : Pipe(ToNumber, IfInvalid(50))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'columnwidth', 'buttonGrid')
        }
    },
    buttonsmincolumnwidth: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(50))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'minwidth', 'buttonGrid')
        }
    },
    gap: {
        format: function (val) { return val },
        onChange: function (val, host) {
            return setAttribute(host, val, 'gap', 'grid')
        }
    },
    buttonsgap: {
        format: function (val) { return val },
        onChange: function (val, host) {
            return setAttribute(host, val, 'gap', 'buttonGrid')
        }
    }
}

function addItem(host) {
    return function addItemInner(node) {
        const isSubmit = node.type === 'submit'

        if (!node.eventSubscriptions) { node.eventSubscriptions = {} }

        if (isSubmit) {
            node.eventSubscriptions = {
                click: ObserveEvent(node, 'click').subscribe(function () {
                    return submitForm(host)
                })
            }
        } else {
            node.eventSubscriptions = { done: ObserveEvent(node, 'done').subscribe(function () { return submitForm(host) }) }
        }
    }
}

const AjaxForm = {
    componentName: componentName,
    template: template,
    outerStyle: outerStyle,
    properties: properties,
    elements: elements,
    observeChildren: true,
    methods: { addItem: addItem },
    onConnected: function (host) {
        host.eventSubscriptions.addedChildren = host.children$.on('addedNodes', function (addedNodes) {
            if (!addedNodes.length) { return }
            ForEach(host.addItem, addedNodes)
        })

        host.eventSubscriptions.removedNodes = host.children$.on('removedNodes', function (removedNodes) {
            if (!removedNodes.length) { return }
            ForEach(ObserverUnsubscribe, removedNodes)
        })
    }
}

LoadOnReady(AjaxForm)

export { AjaxForm }