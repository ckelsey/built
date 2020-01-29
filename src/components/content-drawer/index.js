import { WCConstructor, WCDefine, ObserveEvent, iconArrow, Pipe, IndexOf, IfInvalid, ToBool, ToNumber } from '../..'
import { toggle } from './toggle.js'
import { ToString } from '../../utils/to-string.js'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-drawer`
const componentRoot = `.${componentName}-container`
const directions = [`auto`, `left`, `right`, `top`, `bottom`]
const setElementParam = (el, key, value) => !el ? undefined : el[key] = value
const toEffectStartFrom = val => val === `auto`
    ? `auto`
    : val === `top`
        ? `center top`
        : val === `bottom`
            ? `center bottom`
            : val === `left`
                ? `left center`
                : `right center`

const setHeaderIcon = host => {
    const prop = host.headericon.slice(0, 4) === `<svg` ? `svg` : `type`
    host.elements.headerIcon[prop] = host.headericon
}

const properties = {
    drawergroup: { format: val => val, },
    headericon: {
        format: val => val === `true` || val === undefined || val === null ? iconArrow : val === `false` ? false : val,
        onChange: (_val, host) => setHeaderIcon(host)
    },
    openfrom: {
        format: val => Pipe(IndexOf(directions), IfInvalid(`top`))(val).value,
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
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value,
        onChange: (val, host) => setElementParam(host.elements.scaler, `speed`, val)
    },

    underline: {
        format: val => val,
    },

    underlineamount: {
        format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value,
    },

    underlinecolor: {
        format: val => Pipe(ToString, IfInvalid(undefined))(val).value,
    },

    underlinespeed: {
        format: val => Pipe(ToNumber, IfInvalid(undefined))(val).value,
    },
}

const elements = {
    root: { selector: `.${componentName}-container` },
    header: {
        selector: `.${componentName}-header`,
        onChange: (el, host) => el.eventSubscriptions = { click: ObserveEvent(el, `click`).subscribe(() => host.open = !host.open) }
    },
    content: { selector: `.${componentName}-content` },
    contentInner: { selector: `.${componentName}-content-inner` },
    headerIcon: { selector: `icon-element` },
    scaler: {
        selector: `effect-scale`,
        onChange(scaler, host) {
            scaler.targets = [host.elements.contentInner]
            scaler.x = [`left`, `right`].indexOf(host.openfrom) > -1
            scaler.y = [`top`, `bottom`].indexOf(host.openfrom) > -1
            scaler.startfrom = toEffectStartFrom(host.openfrom)
            scaler.scaled = !host.open
        }
    },
    underline: {
        selector: `effect-underline`,
        onChange(underline, host) {
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
    }
}

export const ContentDrawer = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    onReady: host => {
        host.elements.root.classList[host.open ? `add` : `remove`](`open`)
        setHeaderIcon(host)
    }
})

WCDefine(componentName, ContentDrawer)
