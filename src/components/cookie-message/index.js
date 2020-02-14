import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'cookie-message'
const componentRoot = ''.concat('.', componentName, '-container')

function setButton(host) {
    const button = host.elements.button

    if (!button) { return }

    button.innerHTML = host.buttontext || ''
    button.accentcolor = host.buttonaccent
    button.ripple = host.buttonripple
    button.bounce = host.buttonbounce

    if (typeof button.clickListener === 'function') {
        button.clickListener()
    }

    button.clickListener = ObserveEvent(button, 'click').subscribe(function () {
        host.shown = false
    })
}

function setMessage(host) {
    const message = host.elements.message

    if (!message) { return }

    message.innerHTML = host.message || ''
}

const cookieName = 'accepted_cookies'

function setCookie() {
    return document.cookie = ''.concat(cookieName, '=true')
}

function getCookie() {
    try {
        return !!document.cookie
            .split(';')
            .filter(function (c) {
                return c.indexOf(cookieName) > -1
            })
            .map(function (c) {
                return JSON.parse(c.split('=')[1])
            })[0]
    } catch (error) { }
}

const properties = {
    shown: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(!getCookie()))(val).value
        },
        onChange: function (val, host) {
            const root = host.elements.root

            if (val) {
                try {
                    localStorage.removeItem(cookieName)
                } catch (error) { }
            } else {
                setCookie()
            }

            if (root) {
                root.classList[val ? 'add' : 'remove']('shown')
            }
        }
    },
    message: {
        format: function (val) {
            return typeof val === 'string' ? val : 'By clicking "Continue" or continuing to use our site, you acknowledge that you accept our use of cookies, which are used to provide you with the best possible experience and no personal information is stored.'
        },
        onChange: function (_val, host) { setMessage(host) }
    },
    buttontext: {
        format: function (val) {
            return typeof val === 'string' ? val : 'Continue'
        },
        onChange: function (_val, host) { setButton(host) }
    },
    buttonripple: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (_val, host) { setButton(host) }
    },
    buttonbounce: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (_val, host) { setButton(host) }
    },
    buttonaccent: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('#59a2d8'))(val).value
        },
        onChange: function (_val, host) { setButton(host) }
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
    },
    button: {
        selector: 'button-element',
        onChange: function (_el, host) {
            setButton(host)
        }
    },
    message: {
        selector: '.cookie-message-text',
        onChange: function (_el, host) {
            setMessage(host)
        }
    }
}

const CookieMessage = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements,
    onConnected: function (host) {
        host.shown = !getCookie()
    }
})

Components.addComponent(componentName, CookieMessage)

export { CookieMessage }