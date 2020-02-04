import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserveEvent } from '../../utils/observe-event.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `cookie-message`
const componentRoot = `.cookie-message-container`

const setButton = host => {
    const button = host.elements.button

    if (!button) { return }

    button.innerHTML = host.buttontext || ``
    button.accentcolor = host.buttonaccent
    button.ripple = host.buttonripple
    button.bounce = host.buttonbounce

    if (typeof button.clickListener === `function`) {
        button.clickListener()
    }

    button.clickListener = ObserveEvent(button, `click`).subscribe(() => {
        host.shown = false
    })
}

const setMessage = host => {
    const message = host.elements.message

    if (!message) { return }

    message.innerHTML = host.message || ``
}

const cookieName = `accepted_cookies`
const setCookie = () => document.cookie = `${cookieName}=true`

const getCookie = () => {
    try {
        return !!document.cookie
            .split(`;`)
            .filter(c => c.indexOf(cookieName) > -1)
            .map(c => JSON.parse(c.split(`=`)[1]))[0]
    } catch (error) { }
}

const properties = {
    shown: {
        format: val => Pipe(ToBool, IfInvalid(!getCookie()))(val).value,
        onChange: (val, host) => {
            const root = host.elements.root

            if (val) {
                try {
                    localStorage.removeItem(cookieName)
                } catch (error) { }
            } else {
                setCookie()
            }

            if (root) {
                root.classList[val ? `add` : `remove`](`shown`)
            }
        }
    },
    message: {
        format: val => typeof val === `string` ? val : `By clicking "Continue" or continuing to use our site, you acknowledge that you accept our use of cookies, which are used to provide you with the best possible experience and no personal information is stored.`,
        onChange: (_val, host) => setMessage(host)
    },
    buttontext: {
        format: val => typeof val === `string` ? val : `Continue`,
        onChange: (_val, host) => setButton(host)
    },
    buttonripple: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setButton(host)
    },
    buttonbounce: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setButton(host)
    },
    buttonaccent: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (_val, host) => setButton(host)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: () => { }
    },
    button: {
        selector: `button-element`,
        onChange: (_el, host) => setButton(host)
    },
    message: {
        selector: `.cookie-message-text`,
        onChange: (_el, host) => setMessage(host)
    }
}

export const CookieMessage = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    onConnected: host => {
        host.shown = !getCookie()
    }
})

WCDefine(componentName, CookieMessage)