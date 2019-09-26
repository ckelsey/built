import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { wcClassObject } from '../../utils/html/attr'
import { setStyleRules } from '../../utils/html/markup'
import { COOKIEMESSAGE } from './theme'
import './style.scss'
import '../button-element'
import pipe from '../../utils/pipe'
import ToBool from '../../utils/convert/bool'
import IfInvalid from '../../utils/convert/if_invalid'
import ToString from '../../utils/convert/to_string'
import ObserveEvent from '../../utils/observeEvent'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `cookie-message`
const componentRoot = `.cookie-message-container`

const setStyles = (el, host, styles) => {
    if (!el) { return }
    setStyleRules(el, styles || host.styles)
}

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
const setCookie = () => {
    document.cookie = `${cookieName}=true`
}

const getCookie = () => !!document.cookie
    .split(';')
    .filter(c => c.indexOf(cookieName) > -1)
    .map(c => JSON.parse(c.split(`=`)[1]))[0]

const properties = {
    class: wcClassObject,
    shown: {
        format: val => pipe(ToBool, IfInvalid(!getCookie()))(val).value,
        onChange: (val, host) => {
            if (val) {
                localStorage.removeItem(cookieName)
                host.elements.root.classList.add(`shown`)
            } else {
                setCookie()
                host.elements.root.classList.remove(`shown`)
            }
        }
    },
    message: {
        format: val => typeof val === `string` ? val : COOKIEMESSAGE.message,
        onChange: (_val, host) => setMessage(host)
    },
    buttontext: {
        format: val => typeof val === `string` ? val : COOKIEMESSAGE.buttontext,
        onChange: (_val, host) => setButton(host)
    },
    buttonripple: {
        format: val => pipe(ToBool, IfInvalid(COOKIEMESSAGE.buttonripple))(val).value,
        onChange: (_val, host) => setButton(host)
    },
    buttonbounce: {
        format: val => pipe(ToBool, IfInvalid(COOKIEMESSAGE.buttonbounce))(val).value,
        onChange: (_val, host) => setButton(host)
    },
    buttonaccent: {
        format: val => pipe(ToString, IfInvalid(COOKIEMESSAGE.buttonaccent))(val).value,
        onChange: (_val, host) => setButton(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : COOKIEMESSAGE.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
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
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
    }
}

const CookieMessage = /*#__PURE__*/ Constructor({
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

Define(componentName, CookieMessage)

export default CookieMessage