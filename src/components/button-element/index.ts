import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import { wcClassObject } from '../../utils/html/attr'
import ToString from '../../utils/convert/to_string'
import { setStyleRules } from '../../utils/html/markup'
import { BUTTONELEMENT } from './theme'
import './style.scss'
import '../effect-bounce-z'
import '../effect-ripple'
import ToBool from '../../utils/convert/bool'

const style = require('./style.scss').toString()

const setStyles = (el, host, styles) => {
    if (!el) { return }
    setStyleRules(el, styles || host.styles)
}

const properties = {
    accentcolor: {
        format: val => pipe(ToString, IfInvalid(BUTTONELEMENT.accentcolor))(val).value,
        onChange: (val, host) => {
            if (host.hasRipple) {
                host.elements.ripple.color = val
            }
            if (host.hasBounce) {
                host.elements.bounce.color = val
            }
        }
    },
    class: wcClassObject,
    ready: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            if (!val) { return }
            setBounce(host)
            setRipple(host)
        }
    },
    ripple: {
        format: val => pipe(ToBool, IfInvalid(BUTTONELEMENT.ripple))(val).value,
        onChange: (_val, host) => setRipple(host)
    },
    bounce: {
        format: val => pipe(ToBool, IfInvalid(BUTTONELEMENT.bounce))(val).value,
        onChange: (_val, host) => setBounce(host)
    },
    styles: {
        format: val => typeof val === `string` ? val : BUTTONELEMENT.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    }
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: `.button-element`,
        onChange: () => { }
    },
    button: {
        selector: `button`,
        onChange: (_el, host) => {
            setBounce(host)
            setRipple(host)
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
    }
}

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

const template = require('./index.html')
const componentName = `button-element`
const componentRoot = `.button-element`
const ButtonElement = /*#__PURE__*/ Constructor({
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

Define(componentName, ButtonElement)

export default ButtonElement