import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ComponentClassObject } from '../../utils/component-class-object.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ToBool } from '../../utils/to-bool.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToString } from '../../utils/to-string.js'
import { IndexOf } from '../../utils/index-of.js'
import { IfEmpty } from '../../utils/if-empty.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`
const directions = [`auto`, `left`, `right`, `top`, `bottom`]
const toEffectStartFrom = val => val === `auto` ? `auto` : val === `top` ? `center top` : val === `bottom` ? `center bottom` : val === `left` ? `left center` : `right center`
const setElementParam = (el, key, value) => !el ? undefined : el[key] = value

const attributes = {
    accentcolor: {
        format: val => Pipe(ToString, IfEmpty(`#59a2d8`))(val).value,
        onChange: (val, host) => {
            setElementParam(host.elements.ripple, `color`, val)
            setElementParam(host.elements.underline, `color`, val)
        }
    },
    bounce: { format: val => Pipe(ToString, IfInvalid(`all`))(val).value, },
    bounceamount: { format: val => Pipe(ToNumber, IfInvalid(null))(val).value, },
    bouncespeed: { format: val => Pipe(ToNumber, IfInvalid(null))(val).value, },
    class: ComponentClassObject,
    drawergroup: { format: val => val, },
    fade: { format: val => Pipe(ToBool, IfInvalid(true))(val).value, },
    fadeamount: { format: val => Pipe(CommasToArray, IfInvalid([0, 1]), ToMap(v => ToNumber(v).value))(val).value, },
    fadespeed: { format: val => Pipe(ToNumber, IfInvalid(null))(val).value, },
    headericon: {
        format: val => val === `true` || val === undefined || val === null ? arrowIcon : val === `false` ? false : val,
        onChange: (_val, host) => setHeaderIcon(host)
    },
    openfrom: {
        format: val =>
            Pipe(
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
    ripple: { format: val => Pipe(ToString, IfInvalid(`auto`))(val).value, },
    rippleamount: { format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value, },
    ripplecolor: { format: val => Pipe(ToString, IfInvalid(undefined))(val).value, },
    ripplespeed: { format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value, },
    speed: {
        format: val =>
            Pipe(
                ToNumber,
                IfInvalid(333)
            )(val).value,
        onChange: (val, host) => setElementParam(host.elements.scaler, `speed`, val)
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    underline: { format: val => val, },
    underlineamount: { format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value, },
    underlinecolor: { format: val => Pipe(ToString, IfInvalid(undefined))(val).value, },
    underlinespeed: { format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value, },
}

const properties = Object.assign({}, attributes)
const observedAttributes = Object.keys(attributes)
const hasScaler = host => ({
    get() {
        const el = host.elements.scaler
        return !!el && el.ready === true
    }
})
const hasUnderline = host => ({
    get() {
        const el = host.elements.underline
        return !!el && el.ready === true
    }
})
const hasRipple = host => ({
    get() {
        const el = host.elements.ripple
        return !!el && el.ready === true
    }
})
const hasHeaderIcon = host => ({
    get() {
        const el = host.elements.headerIcon
        return !!el && !!el.ready && host.headericon !== false
    }
})
const canScale = host => ({
    get() {
        return host.hasScaler && !!host.elements.header && !!host.elements.contentInner
    }
})
const canUnderline = host => ({
    get() {
        const can = !!host.underline && host.underline !== `false`
        return host.hasUnderline && can && !!host.elements.header && host.ready === true
    }
})
const canRipple = host => ({
    get() {
        const can = !!host.ripple && host.ripple !== `false`
        return host.hasRipple && can && !!host.elements.header && host.ready === true
    }
})
const hasFader = host => ({
    get() {
        const el = host.elements.fader
        return !!el && el.ready === true
    }
})
const canFade = host => ({
    get() {
        const can = !!host.fade && host.fade !== `false`
        return host.hasFader && can && !!host.elements.contentInner && host.ready === true
    }
})

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-drawer`
const componentRoot = `.content-drawer-container`

const toggle = (host, open) => {
    if (!host.ready) { return }

    const root = host.elements.root

    if (root) {
        root.classList[open ? `add` : `remove`](`open`)
    }

    const header = host.elements.header
    const scaler = host.elements.scaler
    const inner = host.elements.contentInner
    const bounce = host.elements.bounce
    const underline = host.elements.underline
    const ripple = host.elements.ripple
    const fader = host.elements.fader

    scaler.scaled = !open

    if (!!host.bounce && host.bounce !== `false`) {
        let target

        if (host.bounce === `header`) { target = header }
        if (host.bounce === `content`) { target = inner }
        if (host.bounce === `true` || host.bounce === `all`) { target = root }

        bounce.targets = [target]
        bounce.amount = host.bounceamount || -4
        bounce.speed = host.bouncespeed

        if (typeof bounce.trigger === `function`) {
            bounce.trigger()
        }

    } else if (bounce.targets && bounce.targets.length) {
        bounce.targets = []
    }

    if (fader) {
        if (!host.fade && fader.targets.length) {
            fader.targets = []
        }

        if (host.fade && !fader.targets.length && inner) {
            fader.targets = [inner]
        }

        if (host.fade && fader.opacity !== host.fadeamount) {
            fader.opacity = host.fadeamount
        }

        if (host.fade && fader.speed !== host.fadespeed) {
            fader.speed = host.fadespeed
        }
    }

    if (underline) {
        if (!host.underline && underline.targets.length) {
            underline.targets = []
        }

        if (host.underline && !underline.targets.length && header) {
            underline.targets = [header]
        }

        if (host.underline && underline.opacity !== host.underlineamount) {
            underline.opacity = host.underlineamount
        }

        if (host.underline && underline.speed !== host.underlinespeed) {
            underline.speed = host.underlinespeed
        }

        if (host.underline && underline.color !== host.accentcolor && ripple.color !== host.underlinecolor) {
            underline.color = host.underlinecolor || host.accentcolor
        }

        if (!!host.underline && underline.direction !== host.underline) {
            underline.direction = host.underline
        }
    }

    if (ripple) {
        if (!host.ripple && ripple.targets.length) {
            ripple.targets = []
        }

        if (host.ripple && !ripple.targets.length && header) {
            ripple.targets = [header]
        }

        if (host.ripple && ripple.opacity !== host.rippleamount) {
            ripple.opacity = host.rippleamount
        }

        if (host.ripple && ripple.speed !== host.ripplespeed) {
            ripple.speed = host.ripplespeed
        }

        if (host.ripple && ripple.color !== host.accentcolor && ripple.color !== host.ripplecolor) {
            ripple.color = host.ripplecolor || host.accentcolor
        }

        if (!!host.ripple && ripple.direction !== host.ripple) {
            ripple.direction = host.ripple
        }
    }

    let others = []

    if (host.drawergroup) {
        others = Array.from(document.querySelectorAll(`content-drawer[drawergroup="${host.drawergroup}"]`))
    }

    if (open) {

        if (host.canUnderline) {
            underline.open()
        }

        if (host.canFade) {
            fader.open()
        }

        if (host.canRipple) {
            ripple.trigger()
        }

        others.forEach(other => {
            if (other !== host) {
                other.open = false
            }
        })

    } else {

        if (host.canUnderline) {
            underline.close()
        }

        if (host.canFade) {
            fader.close()
        }
    }
}

const setScaler = host => {
    const inner = host.elements.contentInner
    const scaler = host.elements.scaler
    scaler.targets = [inner]
    scaler.x = [`left`, `right`].indexOf(host.openfrom) > -1
    scaler.y = [`top`, `bottom`].indexOf(host.openfrom) > -1
    scaler.startfrom = toEffectStartFrom(host.openfrom)
    scaler.scaled = !host.open
}

const setFader = host => {
    host.elements.fader.targets = [host.elements.contentInner]
}

const setUnderline = host => {
    const underline = host.elements.underline

    if (!underline) { return }

    underline.color = host.accentcolor
    underline.direction = host.underline
    underline.targets = [host.elements.header]

    if (typeof underline.open !== `function`) { return }

    if (host.open) {
        underline.open()
    } else {
        underline.close()
    }
}

const setRipple = host => {
    const ripple = host.elements.ripple
    ripple.targets = [host.elements.header]
    ripple.color = host.accentcolor
    ripple.direction = host.ripple
}

const setHeaderIcon = host => {
    const prop = host.headericon.slice(0, 4) === `<svg` ? `svg` : `type`
    host.elements.headerIcon[prop] = host.headericon
}

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {
    root: { selector: `.content-drawer-container` },
    content: { selector: `.content-drawer-content` },
    contentInner: { selector: `.content-drawer-content-inner` },
    scaler: { selector: `effect-scale` },
    underline: { selector: `effect-underline` },
    ripple: { selector: `effect-ripple` },
    fader: { selector: `effect-fade` },
    headerIcon: { selector: `icon-element` },
    bounce: { selector: `effect-bounce-z` },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles),
    },
    header: {
        selector: `.content-drawer-header`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => host.open = !host.open)
            }
        }
    },
}

export const ContentDrawer = /*#__PURE__*/ WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    computed: {
        hasScaler,
        hasUnderline,
        hasRipple,
        hasHeaderIcon,
        hasFader,
        canUnderline,
        canScale,
        canRipple,
        canFade
    },
    onReady: host => {
        host.elements.root.classList[host.open ? `add` : `remove`](`open`)
        setScaler(host)
        setFader(host)
        setUnderline(host)
        setRipple(host)
        setHeaderIcon(host)
    }
})

WCDefine(componentName, ContentDrawer)
