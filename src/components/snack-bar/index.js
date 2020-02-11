import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { ToBool } from '../../utils/to-bool.js'
import { EventName } from '../../utils/event-name.js'
import { IndexOf } from '../../utils/index-of.js'
import { iconInfo, iconCheck, iconError, iconWarning, iconClose } from '../../services/icons.js'
import { IfEmpty } from '../../utils/if-empty.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { Components } from '../../services/components.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'
import { ForEach } from '../../utils/for-each.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()
const template = require('./index.html')
const componentName = 'snack-bar'
const componentRoot = ''.concat('.', componentName, '-container')

function setShown(host) {
    const root = host.elements.root

    if (!root) { return }

    const endEventName = EventName('transitionend')

    function dispatch() {
        return DispatchEvent(host, host.shown ? 'opened' : 'closed', host)
    }

    if (endEventName) {
        root.addEventListener(endEventName, function startEvent() {
            root.removeEventListener(endEventName, startEvent)
            OnNextFrame(dispatch)
        })
    } else {
        OnNextFrame(dispatch)
    }

    root.classList[host.shown ? 'add' : 'remove']('shown')
}

function setAlign(host) {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute('align', host.align)
}

function setType(host) {
    const root = host.elements.root

    if (!root) { return }

    root.setAttribute('type', host.type)
}

function setIcon(host, key) {
    WhenAvailable(host, 'elements.' + key)
        .then(function (icon) {
            if (!icon) { return }
            icon[host[key][0] === '<' ? 'svg' : 'type'] = host[key]
        })
        .catch(function () { })
}

function showHideClose(el, show) {
    if (!el) { return }
    el.classList[show ? 'remove' : 'add']('hide-close-btn')
}

const properties = {
    shown: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setShown(host) }) }
    },
    align: {
        format: function (val) {
            return Pipe(ToString, IndexOf(['top', 'bottom', 'none']), IfInvalid('bottom'))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setAlign(host) }) }
    },
    type: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(''))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setType(host) }) }
    },
    infoicon: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(iconInfo), IfEmpty(iconInfo))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setIcon(host, 'infoicon') }) }
    },
    successicon: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(iconCheck), IfEmpty(iconCheck))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setIcon(host, 'successicon') }) }
    },
    erroricon: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(iconError), IfEmpty(iconError))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setIcon(host, 'erroricon') }) }
    },
    warningicon: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(iconWarning), IfEmpty(iconWarning))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setIcon(host, 'warningicon') }) }
    },
    hideclose: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (val, host) { OnNextFrame(function () { showHideClose(host.elements.root, !val) }) }
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: function (_el, host) {
            return OnNextFrame(function () {
                setAlign(host)
                setShown(host)
            })
        }
    },
    button: {
        selector: '.snack-bar-close',
        onChange: function (el, host) {
            OnNextFrame(function () {
                el.eventListeners = {
                    click: ObserveEvent(el, 'click').subscribe(function () { host.shown = false })
                }

                showHideClose(host.elements.root, !host.hideclose)
            })
        }
    },
    infoicon: {
        selector: '.infoicon',
        onChange: function (_el, host) { OnNextFrame(function () { setIcon(host, 'infoicon') }) }
    },
    successicon: {
        selector: '.successicon',
        onChange: function (_el, host) { OnNextFrame(function () { setIcon(host, 'successicon') }) }
    },
    erroricon: {
        selector: '.erroricon',
        onChange: function (_el, host) { OnNextFrame(function () { setIcon(host, 'erroricon') }) }
    },
    warningicon: {
        selector: '.warningicon',
        onChange: function (_el, host) { OnNextFrame(function () { setIcon(host, 'warningicon') }) }
    },
    closeIcon: {
        selector: ''.concat('.', componentName, '-close-icon'),
        onChange: function (el) { el.svg = iconClose }
    }
}


const SnackBar = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements,
    methods: {
        clear: function (host) {
            return function () {
                ForEach(function slottedRemove(slot) {
                    host.slotted$.remove(slot)
                    try { slot.parentElement.removeChild(slot) } catch (error) { }
                }, host.slotted$.value, true)
            }
        }
    }
})

Components.addComponent(componentName, SnackBar)

export { SnackBar }