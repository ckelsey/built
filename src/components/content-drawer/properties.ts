import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import IfEmpty from '../../utils/convert/if_empty'
import ToBool from '../../utils/convert/bool'
import ToNumber from '../../utils/convert/to_number'
import { toggle } from './methods'
import { setHeaderIcon, setStyles } from './elements'
import CommasToArray from '../../utils/convert/commas-to-array'
import ComponentClassObject from '../../utils/html/component-class-object'
import ToString from '../../utils/convert/to_string'
import Map from '../../utils/convert/map'
import IndexOf from '../../utils/convert/indexof'

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`

const directions = [
    `auto`,
    `left`,
    `right`,
    `top`,
    `bottom`
]

export const toEffectStartFrom = val => val === `auto`
    ? `auto`
    : val === `top`
        ? `center top`
        : val === `bottom`
            ? `center bottom`
            : val === `left`
                ? `left center`
                : `right center`

const setElementParam = (el, key, value) => !el ? undefined : el[key] = value

const attributes = {
    accentcolor: {
        format: val => pipe(ToString, IfEmpty(`#59a2d8`))(val).value,
        onChange: (val, host) => {
            setElementParam(host.elements.ripple, `color`, val)
            setElementParam(host.elements.underline, `color`, val)
        }
    },

    bounce: {
        format: val => pipe(ToString, IfInvalid(`all`))(val).value,
    },

    bounceamount: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
    },

    bouncespeed: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
    },

    class: ComponentClassObject,

    drawergroup: {
        format: val => val,
    },

    fade: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
    },

    fadeamount: {
        format: val => pipe(CommasToArray, IfInvalid([0, 1]), Map(v => ToNumber(v).value))(val).value,
    },

    fadespeed: {
        format: val => pipe(ToNumber, IfInvalid(null))(val).value,
    },

    headericon: {
        format: val => val === `true` || val === undefined || val === null ? arrowIcon : val === `false` ? false : val,
        onChange: (_val, host) => setHeaderIcon(host)
    },

    openfrom: {
        format: val =>
            pipe(
                IndexOf(directions),
                IfInvalid(`top`)
            )(val).value,
        onChange: (val, host) => {
            setElementParam(host.elements.scaler, `startfrom`, toEffectStartFrom(val))
            setElementParam(host.elements.scaler, `x`, [`left`, `right`].indexOf(val) > -1)
            setElementParam(host.elements.scaler, `y`, [`top`, `bottom`].indexOf(val) > -1)
        }
    },

    open: {
        format: val => ToBool(val).value,
        onChange: (val, host) => toggle(host, val)
    },

    ripple: {
        format: val => pipe(ToString, IfInvalid(`auto`))(val).value,
    },

    rippleamount: {
        format: val => pipe(ToNumber, IfInvalid(undefined))(val).value,
    },

    ripplecolor: {
        format: val => pipe(ToString, IfInvalid(undefined))(val).value,
    },

    ripplespeed: {
        format: val => pipe(ToNumber, IfInvalid(undefined))(val).value,
    },

    speed: {
        format: val =>
            pipe(
                ToNumber,
                IfInvalid(333)
            )(val).value,
        onChange: (val, host) => setElementParam(host.elements.scaler, `speed`, val)
    },

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },

    underline: {
        format: val => val,
    },

    underlineamount: {
        format: val => pipe(ToNumber, IfInvalid(undefined))(val).value,
    },

    underlinecolor: {
        format: val => pipe(ToString, IfInvalid(undefined))(val).value,
    },

    underlinespeed: {
        format: val => pipe(ToNumber, IfInvalid(undefined))(val).value,
    },
}

export const properties = Object.assign({}, attributes)
export const observedAttributes = Object.keys(attributes)

export const hasScaler = host => ({
    get() {
        const el = host.elements.scaler
        return !!el && el.ready === true
    }
})

export const hasUnderline = host => ({
    get() {
        const el = host.elements.underline
        return !!el && el.ready === true
    }
})

export const hasRipple = host => ({
    get() {
        const el = host.elements.ripple
        return !!el && el.ready === true
    }
})

export const hasHeaderIcon = host => ({
    get() {
        const el = host.elements.headerIcon
        return !!el && !!el.ready && host.headericon !== false
    }
})

export const canScale = host => ({
    get() {
        return host.hasScaler && !!host.elements.header && !!host.elements.contentInner
    }
})

export const canUnderline = host => ({
    get() {
        const can = !!host.underline && host.underline !== `false`
        return host.hasUnderline && can && !!host.elements.header && host.ready === true
    }
})

export const canRipple = host => ({
    get() {
        const can = !!host.ripple && host.ripple !== `false`
        return host.hasRipple && can && !!host.elements.header && host.ready === true
    }
})

export const hasFader = host => ({
    get() {
        const el = host.elements.fader
        return !!el && el.ready === true
    }
})

export const canFade = host => ({
    get() {
        const can = !!host.fade && host.fade !== `false`
        return host.hasFader && can && !!host.elements.contentInner && host.ready === true
    }
})