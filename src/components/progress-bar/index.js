import {
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    WCConstructor, WCDefine, ComponentClassObject, SetStyleRules, Pipe, ToBool, IfInvalid, ToString,
    IndexOf, ToNumber, CommasToArray, ToMap, ValidateHtml
} from '../..'
import './style.scss'
import { ObserveEvent } from '../../utils/observe-event'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `progress-bar`
const componentRoot = `.${componentName}-container`
const types = [`bar`, `circle`]
const animations = [`indeterminate`, `linear`, `volley`]
const setStyles = (el, styles) => el ? SetStyleRules(el, styles) : undefined
const setVisible = (val, root) => root ? root.classList[val ? `add` : `remove`](`visible`) : undefined
const setOverlay = (val, root) => root ? root.classList[val ? `add` : `remove`](`overlay`) : undefined
const setPercentage = (val, root) => root ? root.classList[val ? `add` : `remove`](`percentage`) : undefined
const setScrimColor = (val, root) => root ? val ? root.style.backgroundColor = val : root.style.removeProperty(`background-color`) : undefined
const setTrack = (val, root) => root ? root.classList[val ? `add` : `remove`](`track`) : undefined
const setScrimBlur = (val, root) => root ? root.style.backdropFilter = `blur(${val}px)` : undefined
const setThickness = (val, el) => el ? el.style.height = val : undefined
const setHeading = (val, el) => el ? el.innerHTML = ValidateHtml(val, [], [`script`]).sanitized : undefined
const setText = (val, el) => el ? el.innerHTML = ValidateHtml(val, [], [`script`]).sanitized : undefined
const setColor = (val, el) => el && val ? el.style.color = val : el ? el.style.removeProperty(`color`) : undefined

const setScrim = (val, root) => {
    if (!root) { return }
    if (!val) { root.style.removeProperty(`background-color`) }
    root.classList[val ? `add` : `remove`](`scrim`)
}

const setCancel = (val, el) => {
    if (val && el) {
        el.classList.add(`show`)
        el.innerHTML = ValidateHtml(val, [], [`script`]).sanitized
    } else if (el) {
        el.classList.remove(`show`)
    }
}

const setValues = (vals, host) => {
    const top = host.elements.top
    const bottom = host.elements.bottom
    const percentage = host.elements.percentage
    const mainVal = `${Math.min(100, (vals[0] || 0))}%`
    const secondaryVal = `${Math.min(100, (vals[1] || 0))}%`

    if (!top || !bottom) { return }

    top.style.width = mainVal
    bottom.style.width = secondaryVal
    percentage.textContent = mainVal
}

const properties = {
    class: ComponentClassObject,
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    },
    value: {
        format: val => Pipe(
            CommasToArray,
            IfInvalid([val]),
            ToMap(v => isNaN(parseInt(v)) ? 0 : parseInt(v)),
        )(val).value,
        onChange(val, host) { setValues(val, host) }
    },
    color: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange(val, host) { setColor(val, host.elements.trackInner) }
    },
    cancel: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange(val, host) { setCancel(val, host.elements.cancel) }
    },
    text: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange(val, host) { setText(val, host.elements.text) }
    },
    header: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange(val, host) { setHeading(val, host.elements.header) }
    },
    percentage: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange(val, host) { setPercentage(val, host.elements.root) }
    },
    thickness: {
        format: val => Pipe(ToString, IfInvalid(`3px`))(val).value,
        onChange(val, host) { setThickness(val, host.elements.container) }
    },
    visible: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange(val, host) { setVisible(val, host.elements.root) }
    },
    overlay: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange(val, host) { setOverlay(val, host.elements.root) }
    },
    scrim: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange(val, host) { setScrim(val, host.elements.root) }
    },
    track: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange(val, host) { setTrack(val, host.elements.root) }
    },
    scrimcolor: {
        format: val => Pipe(ToString, IfInvalid(`rgba(0,0,0,0.84)`))(val).value,
        onChange(val, host) { setScrimColor(val, host.elements.root) }
    },
    scrimblur: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange(val, host) { setScrimBlur(val, host.elements.root) }
    },

    /** TODO */
    type: { format: val => Pipe(IndexOf(types), IfInvalid(types[0]))(val).value },
    animation: { format: val => Pipe(IndexOf(animations), IfInvalid(animations[0]))(val).value },
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange(el, host) {
            setOverlay(host.overlay, el)
            setScrim(host.scrim, el)
            setScrimColor(host.scrimcolor, el)
            setVisible(host.visible, el)
            setTrack(host.visible, el)
            setScrimBlur(host.scrimblur, el)
            setPercentage(host.percentage, el)
        }
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    },
    container: {
        selector: `.progress-bar-inner`,
        onChange(el, host) {
            setThickness(host.thickness, el)
        }
    },
    trackInner: {
        selector: `.progress-bar-track-inner`,
        onChange(el, host) { setColor(host.color, el) }
    },
    header: {
        selector: `.progress-bar-header`,
        onChange(el, host) { setHeading(host.header, el) }
    },
    text: {
        selector: `.progress-bar-text`,
        onChange(el, host) { setText(host.text, el) }
    },
    cancel: {
        selector: `.progress-bar-cancel`,
        onChange(el, host) {
            el.eventSubscriptions = { click: ObserveEvent(el, `click`).subscribe(() => host.dispatchEvent(new CustomEvent(`canceled`, { detail: host }))) }
            setCancel(host.cancel, el)
        }
    },
    percentage: { selector: `.progress-bar-percentage` },
    bottom: { selector: `.progress-bar-bottom` },
    top: { selector: `.progress-bar-top` }
}

export const ProgressBar = WCConstructor({ componentName, componentRoot, template, style, observedAttributes, properties, elements })
WCDefine(componentName, ProgressBar)