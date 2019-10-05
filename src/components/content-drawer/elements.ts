import ObserveEvent from '../../utils/observeEvent'
import { toEffectStartFrom } from './properties'
import SetStyleRules from '../../utils/html/set-style-rules'

export const elementSelectors = {
    root: `.content-drawer-container`,
    header: `.content-drawer-header`,
    content: `.content-drawer-content`,
    contentInner: `.content-drawer-content-inner`,
    scaler: `effect-scale`,
    underline: `effect-underline`,
    ripple: `effect-ripple`,
    fader: `effect-fade`,
    headerIcon: `icon-element`,
    bounce: `effect-bounce-z`,
    injectedStyles: `style.injectedStyles`
}

const elements = {}

export const setScaler = host => {
    const inner = host.elements.contentInner
    const scaler = host.elements.scaler
    scaler.targets = [inner]
    scaler.x = [`left`, `right`].indexOf(host.openfrom) > -1
    scaler.y = [`top`, `bottom`].indexOf(host.openfrom) > -1
    scaler.startfrom = toEffectStartFrom(host.openfrom)
    scaler.scaled = !host.open
}

export const setFader = host => {
    host.elements.fader.targets = [host.elements.contentInner]
}

export const setUnderline = host => {
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

export const setRipple = host => {
    const ripple = host.elements.ripple
    ripple.targets = [host.elements.header]
    ripple.color = host.accentcolor
    ripple.direction = host.ripple
}

export const setHeaderIcon = host => {
    const prop = host.headericon.slice(0, 4) === `<svg` ? `svg` : `type`
    host.elements.headerIcon[prop] = host.headericon
}

export const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elementMethods = {
    header: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => host.open = !host.open)
        }
    },
    injectedStyles: (el, host) => setStyles(el, host.styles),
}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: elementMethods[key] ? elementMethods[key] : () => { }
    }
})

export default elements