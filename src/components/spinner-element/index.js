import { Components } from '../../services/components.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()
const template = require('./index.html')
const componentName = 'spinner-element'
const componentRoot = ''.concat('.', componentName, '-container')

function doAllTheThings(host) {
    const root = host.elements.root
    if (!root) { return }

    root.setAttribute('type', host.type)

    setRootClass(host, host.page, 'fullpage')
    setRootClass(host, host.scrim, 'showscrim')
    setType(host)
    setScrimColor(host)
    setScrimOpacity(host)
    setBlur(host)
}

function setRootClass(host, condition, clss) {
    OnNextFrame(function () {
        const root = host.elements.root

        if (!root) { return }

        root.classList[condition ? 'add' : 'remove'](clss)
    })
}

function setType(host) {
    OnNextFrame(function () {
        const root = host.elements.root
        if (!root) { return }
        root.setAttribute('type', host.type)
    })
}

function setBlur(host) {
    OnNextFrame(function () {
        const scrim = host.elements.scrim
        if (!scrim) { return }
        scrim.style.backdropFilter = ''.concat('blur(', host.blur, 'px)')
    })
}

function setScrimColor(host) {
    OnNextFrame(function () {
        const scrim = host.elements.scrim
        if (!scrim) { return }
        scrim.style.background = host.scrimcolor
    })
}

function setScrimOpacity(host) {
    OnNextFrame(function () {
        const scrim = host.elements.scrim

        if (!scrim) { return }

        if (host.scrim) {
            return scrim.style.opacity = host.scrimopacity
        }

        scrim.style.opacity = 0
    })
}

function toggleVisibility(host) {
    return OnNextFrame(function () {
        return host.elements.root.classList[host.visible ? 'add' : 'remove']('shown')
    })
}

const elements = {
    root: {
        selector: componentRoot,
        onChange: function (_el, host) {
            doAllTheThings(host)
        }
    },
    scrim: {
        selector: '.spinner-element-scrim',
        onChange: function (_el, host) {
            doAllTheThings(host)
        }
    },
    inner: { selector: '.spinner-element-inner' },
    slot: { selector: 'slot' }
}

const properties = {
    visible: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (val, host) {
            host.setAttribute('visible', val)
            toggleVisibility(host)
        }
    },
    page: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (val, host) {
            host.setAttribute('page', val)
            doAllTheThings(host)
        }
    },
    scrim: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (val, host) {
            host.setAttribute('scrim', val)
            doAllTheThings(host)
        }
    },
    blur: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(0))(val).value
        },
        onChange: function (val, host) {
            host.setAttribute('blur', val)
            doAllTheThings(host)
        }
    },
    scrimopacity: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(1))(val).value
        },
        onChange: function (_val, host) {
            doAllTheThings(host)
        }
    },
    type: {
        format: function (val) {
            return typeof val === 'string' ? val : 'column'
        },
        onChange: function (val, host) {
            host.setAttribute('type', val)
            doAllTheThings(host)
        }
    }
}

const SpinnerElement = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
})

Components.addComponent(componentName, SpinnerElement)

export { SpinnerElement }