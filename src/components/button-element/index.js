import {
    WCConstructor, WCDefine, Pipe, IfInvalid, ComponentClassObject,
    ToString, SetStyleRules, ToBool
} from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
}

const setTheme = (value, host) => {
    const themeElement = host.elements.theme
    if (!themeElement || value === undefined) { return }
    SetStyleRules(themeElement, value)
}

const setName = (btn, name) => btn ? btn.setAttribute(`name`, name) : undefined

const setRipple = host => {
    const ripple = host.elements.ripple

    if (!ripple) { return }

    ripple.color = host.accentcolor
    ripple.targets = host.ripple ? [host.elements.button] : []
}

const setBounce = host => {
    const bounce = host.elements.bounce
    const button = host.elements.button

    if (!bounce || !button) { return }

    bounce.targets = host.bounce ? [button] : []
}

const properties = {
    accentcolor: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (val, host) => {
            if (host.hasRipple) {
                host.elements.ripple.color = val
            }
            if (host.hasBounce) {
                host.elements.bounce.color = val
            }
        }
    },
    class: ComponentClassObject,
    ready: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            if (!val) { return }
            setBounce(host)
            setRipple(host)
        }
    },
    ripple: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setRipple(host)
    },
    bounce: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setBounce(host)
    },
    name: {
        format: (val, host) => Pipe(ToString, IfInvalid(host.textContent))(val).value,
        onChange: (val, host) => setName(host.elements.button, val)
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },
    theme: {
        format: (val, host) => typeof val === `string` ? val : host.theme,
        onChange: setTheme
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: `.button-element`,
        onChange: () => { }
    },
    button: {
        selector: `.button-element > button`,
        onChange: (el, host) => {
            setBounce(host)
            setRipple(host)

            if (!el.getAttribute(`name`)) {
                setName(el, host.name)
            }
        }
    },
    ripple: {
        selector: `effect-ripple`,
        onChange: (_el, host) => setRipple(host)
    },
    bounce: {
        selector: `effect-bounce-z`,
        onChange: (_el, host) => setBounce(host)
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
    },
    theme: {
        selector: `style.themeStyles`,
        onChange: (_el, host) => setTheme(host.theme, host)
    }
}

const template = require(`./index.html`)
const componentName = `button-element`
const componentRoot = `.button-element`
export const ButtonElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    computed: {
        hasRipple: host => ({
            get() {
                const el = host.elements.ripple
                return !!el && el.ready === true
            }
        }),
        hasBounce: host => ({
            get() {
                const el = host.elements.bounce
                return !!el && el.ready === true
            }
        }),
        canRipple: host => ({
            get() {
                const can = !!host.ripple
                return host.hasRipple && can && !!host.elements.button && host.ready === true
            }
        }),
        canBounce: host => ({
            get() {
                const can = !!host.bounce
                return host.hasBounce && can && !!host.elements.button && host.ready === true
            }
        })
    },
    onConnected: host => {
        host.elements.button.classList.add(`ready`)
    },
})

WCDefine(componentName, ButtonElement)