import { WCConstructor, WCDefine, AppendStyleElement, ObserverUnsubscribe, SetStyleRules, ID, ToNumber, Pipe, IfInvalid, Get, ToBool, OnNextFrame, ObserveSlots, CommasToArray, ToMap } from '../..'
import { Try } from '../../utils/try'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./external.scss`).toString()
const template = require(`./index.html`)
const componentName = `grid-layout`
const componentRoot = `.${componentName}-container`
const defaultWidth = 240
const defaultGap = [16, 16]
const unsupportedCSS = (host, gap, columnwidth) => typeof host.style.grid === `string` ? `` : `.grid-layout-items{margin-left:-${gap}px;margin-right:-${gap}px;}.grid-layout-items .grid-layout-item{max-width:${columnwidth}px;margin:${gap}px;}`

const setScale = host =>
    OnNextFrame(() => {
        if (!host.scaletofit) { return }

        const gap = host.gap || defaultGap
        let gapMedian = gap.reduce((t, c) => { t = t + c; return t }, 0) / 2
        let columnwidth = host.columnwidth || defaultWidth
        const contentWidth = host.elements.root.offsetWidth + gapMedian
        let columnGapPercent = 100 / Math.round(contentWidth / (gapMedian + columnwidth))
        const ratio = 1 - (gapMedian / columnwidth)

        if (columnwidth === `100%`) {
            columnwidth = 100
            gapMedian = 0
        } else {
            if (columnGapPercent > 50) {
                columnGapPercent = 50
            }

            columnwidth = columnGapPercent * ratio

            gapMedian = (columnGapPercent - columnwidth) / 2
        }

        const thisStyle = `.grid-layout-items{display:flex; width:${100 + (gapMedian * 2)}%;margin-left:-${gapMedian}%;}.grid-layout-item{width:${columnwidth}%;padding:${gapMedian / 2}% ${gapMedian}%;}`

        SetStyleRules(host.elements.innerStyles, thisStyle)
    })

const setDimensions = host => OnNextFrame(() => {
    if (host.scaletofit) { return setScale(host) }

    const gap = host.gap || defaultGap
    const gapValues = Array.isArray(gap) ? [gap[0], gap[1]] : [gap, gap]
    const gapMedian = gapValues.reduce((t, c) => { t = t + c; return t }, 0) / 2
    const columnwidth = host.columnwidth || defaultWidth
    const thisStyle = `.grid-layout-items{grid-row-gap:${gapValues[0]}px; grid-column-gap:${gapValues[1]}px; grid-template-columns:repeat(auto-fit, minmax(${columnwidth}px, 0fr));}${unsupportedCSS(host, gapMedian, columnwidth)}`

    SetStyleRules(host.elements.innerStyles, thisStyle)
})

const elements = {
    root: { selector: componentRoot },
    itemsContainer: { selector: `.${componentName}-items` },
    innerStyles: { selector: `style.innerStyles` }
}

const properties = {
    columnwidth: {
        format: val => val === `100%` ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    gap: {
        format: val => Pipe(CommasToArray, IfInvalid([val, val]), ToMap(v => {
            const tv = ToNumber(v).value
            if (isNaN(tv)) { return defaultGap[0] }
            return tv
        }))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    scaletofit: { format: val => Pipe(ToBool, IfInvalid(false))(val).value }
}

const getComponentStyles = host => () => `${require(`./style.scss`).toString()}${host.theme || ``}${host.styles}`
const notSlottable = el => Get(el, `nongrid`) || Get(el, `tagName.toLowerCase()`) === `style`
const clear = host => () => Array.from(host.children).forEach(el => !notSlottable(el) ? Try(el => host.removeChild(el))(el) : undefined)
const wrap = host => () => Array.from(host.children)
    .forEach(el => notSlottable(el) || el.getAttribute(`wrapped`) ? undefined : wrapItem(host.elements.itemsContainer, el))

const wrapItem = (itemsContainer, el) => {
    const id = ID()
    const slotWrapper = document.createElement(`div`)
    slotWrapper.className = `grid-layout-item`
    slotWrapper.id = id
    itemsContainer.appendChild(slotWrapper)

    const slot = document.createElement(`slot`)
    slot.name = id
    slotWrapper.appendChild(slot)
    el.slot = id
    el.container = slotWrapper
    el.setAttribute(`wrapped`, id)

    return el
}

export const GridLayout = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    computed: {
        items: host => ({ get() { return Array.from(host.children).filter(el => el.tagName.toLowerCase() !== `style`) } })
    },
    methods: {
        getComponentStyles,
        clear,
        wrap
    },
    onConnected(host) {
        host.elements.innerStyles = AppendStyleElement(` `, host.shadowRoot, `innerStyles`, `innerStyles`)

        const disconnectEl = el => {
            const containerParent = Get(el, `container.parentElement`)
            Get(el, `eventSubscriptions.span.disconnect()`)
            if (containerParent) { containerParent.removeChild(el.container) }
        }

        host.eventSubscriptions = {
            slot: ObserveSlots(host).subscribe(results => {
                results.removed.forEach(disconnectEl)
                host.wrap()
            })
        }

        window.addEventListener(`resize`, () => setScale(host))

        OnNextFrame(() => {
            host.wrap()
            host.setAttribute(`viewable`, true)
        })
    },
    onDisconnected(host) { ObserverUnsubscribe(host) }
})

WCDefine(componentName, GridLayout)