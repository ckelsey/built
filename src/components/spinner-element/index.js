import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
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

function onChangeDoThings(_el, host) {
    return doAllTheThings(host)
}

const elements = {
    root: {
        selector: componentRoot,
        onChange: onChangeDoThings
    },
    scrim: {
        selector: '.spinner-element-scrim',
        onChange: onChangeDoThings
    },
    inner: { selector: '.spinner-element-inner' },
    slot: { selector: 'slot' }
}

const properties = {
    visible: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (_val, host) { toggleVisibility(host) }
    },
    page: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: onChangeDoThings
    },
    scrim: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: onChangeDoThings
    },
    blur: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(0))(val).value
        },
        onChange: onChangeDoThings
    },
    scrimopacity: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(1))(val).value
        },
        onChange: onChangeDoThings
    },
    type: {
        format: function (val) {
            return typeof val === 'string' ? val : 'column'
        },
        onChange: onChangeDoThings
    }
}

export const SpinnerElement = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
})

WCDefine(componentName, SpinnerElement)