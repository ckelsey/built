import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { Get } from '../../utils/get.js'
import { ObserveSlots } from '../../utils/observe-slots.js'
import { Timer } from '../../services/timer.js'
import { EaseInOut } from '../../utils/ease-in-out.js'
import { IndexOf } from '../../utils/index-of.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'overlay-message'
const componentRoot = ''.concat('.', componentName, '-container')
const speed = 333

function setShown(host) {
    const root = host.elements.root

    if (!root) { return }

    const opacityNow = root.style.opacity

    if (!host.shown && (opacityNow === '' || opacityNow === '0')) { return }

    Timer(
        function (opacityStep) {
            return root.style.opacity = opacityStep
        },
        EaseInOut(host.shown ? [0, 1] : [1, 0], speed)
    )
        .then(function () {
            root.classList[host.shown ? 'add' : 'remove']('shown')
            DispatchEvent(host, host.shown ? 'opened' : 'closed', host)
        })
}

function setColorTheme(color, root) {
    return root.setAttribute('colortheme', color)
}

function setCloseButton(host) {
    Array.from(host.querySelectorAll('*'))
        .forEach(function (el) {
            try { Get(el, 'eventSubscriptions.closeOverlay', function () { })() } catch (error) { }
        })

    if (!host.closeselector) { return }

    Array.from(host.querySelectorAll(host.closeselector))
        .forEach(function (el) {
            return Set(
                el,
                'eventSubscriptions.closeOverlay',
                ObserveEvent(el, 'click').subscribe(function () {
                    host.shown = false
                })
            )
        })
}

const properties = {
    shown: {
        format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value },
        onChange: function (_val, host) {
            OnNextFrame(function () {
                setShown(host)
            })
        }
    },
    colortheme: {
        format: function (val) {
            return Pipe(IndexOf(['dark', 'light', 'transparent']), IfInvalid('light'))(val).value
        },
        onChange: function (val, host) {
            return OnNextFrame(function () {
                return setColorTheme(val, host.elements.root)
            })
        }
    },
    closeselector: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('[overlay-message-close]'))(val).value
        },
        onChange: function (_val, host) { OnNextFrame(function () { setCloseButton(host) }) }
    }
}

const elements = { root: { selector: componentRoot } }

export const OverlayMessage = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    methods: {
        clear: function (host) {
            return function () {
                return Array.from(host.children)
                    .forEach(function (c) {
                        return c.slot ? host.removeChild(c) : undefined
                    })
            }
        }
    },
    onConnected: function (host) {
        host.subscriptions = {
            slots: ObserveSlots(host, true).subscribe(function () {
                return OnNextFrame(function () {
                    return setCloseButton(host)
                })
            })
        }
    }
})

WCDefine(componentName, OverlayMessage)