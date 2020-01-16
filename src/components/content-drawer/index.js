import { WCConstructor, WCDefine, ObserveEvent, iconArrow, Pipe, IndexOf, IfInvalid, ToBool, ToNumber } from '../..'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `content-drawer`
const componentRoot = `.content-drawer-container`
const directions = [`auto`, `left`, `right`, `top`, `bottom`]
export const toEffectStartFrom = val => val === `auto`
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

const toggle = (host, open) => {
    if (!host.ready) { return }

    const root = host.elements.root

    if (root) {
        root.classList[open ? `add` : `remove`](`open`)
    }
}

const properties = {
    drawergroup: { format: val => val, },
    headericon: { format: val => val === `true` || val === undefined || val === null ? iconArrow : val === `false` ? false : val, },
    openfrom: { format: val => Pipe(IndexOf(directions), IfInvalid(`top`))(val).value },
    open: {
        format: val => ToBool(val).value,
        onChange: (val, host) => toggle(host, val)
    },
    speed: { format: val => Pipe(ToNumber, IfInvalid(333))(val).value, }
}

const elements = {
    root: { selector: `.content-drawer-container` },
    header: {
        selector: `.content-drawer-header`,
        onChange: (el, host) => el.eventSubscriptions = { click: ObserveEvent(el, `click`).subscribe(() => host.open = !host.open) }
    },
    content: { selector: `.content-drawer-content` },
    contentInner: { selector: `.content-drawer-content-inner` },
    headerIcon: { selector: `icon-element` }
}

export const ContentDrawer = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    onReady: host => {
        host.elements.root.classList[host.open ? `add` : `remove`](`open`)
        setHeaderIcon(host)
    }
})

WCDefine(componentName, ContentDrawer)
