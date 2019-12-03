import { WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, Pipe, ToBool, IfInvalid, ToString, ObserveEvent } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `cookie-message`
const componentRoot = `.cookie-message-container`

const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
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

const getCookie = () => {
    try {
        return !!document.cookie
            .split(`;`)
            .filter(c => c.indexOf(cookieName) > -1)
            .map(c => JSON.parse(c.split(`=`)[1]))[0]
    } catch (error) { }
}

const properties = {
    class: ComponentClassObject,
    shown: {
        format: val => Pipe(ToBool, IfInvalid(!getCookie()))(val).value,
        onChange: (val, host) => {
            if (val) {
                try {
                    localStorage.removeItem(cookieName)
                } catch (error) { }
                host.elements.root.classList.add(`shown`)
            } else {
                setCookie()
                host.elements.root.classList.remove(`shown`)
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
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
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