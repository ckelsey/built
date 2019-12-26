import {
    WCConstructor, WCDefine, AppendStyleElement, ID, ToNumber,
    Pipe, SetStyleRules, ToString, IfInvalid, Get, ToBool, OnNextFrame
} from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `grid-layout`
const componentRoot = `.${componentName}-container`

const defaultWidth = 240
const defaultGap = 16

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setAllStyles = (host, string) => {
    const componentStyle = host.shadowRoot.querySelector(`style[name="grid-layout-innerstyles"]`)
    const themeStyles = host.elements.themeStyles
    const injectedStyles = host.elements.injectedStyles
    let outerStyle = host.querySelector(`style[name="outer"]`)

    const styleString = [
        style,
        themeStyles ? themeStyles.innerHTML : ``,
        injectedStyles ? injectedStyles.innerHTML : ``,
        string
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nongrid = true
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const unsupportedCSS = (host, gap, columnwidth) => typeof host.style.grid === `string` ? `` : `.grid-layout-items{margin-left:-${gap}px;margin-right:-${gap}px;}.grid-layout-items .grid-layout-item{max-width:${columnwidth}px;margin:${gap}px;}`

const setScale = host =>
    OnNextFrame(() => {
        if (!host.scaletofit) { return }

        let gap = host.gap || defaultGap
        let columnwidth = host.columnwidth || defaultWidth
        const contentWidth = host.elements.root.offsetWidth + gap
        let columnGapPercent = 100 / Math.round(contentWidth / (gap + columnwidth))
        const ratio = 1 - (gap / columnwidth)

        if (columnwidth === `100%`) {
            columnwidth = 100
            gap = 0
        } else {
            if (columnGapPercent > 50) {
                columnGapPercent = 50
            }

            columnwidth = columnGapPercent * ratio

            gap = (columnGapPercent - columnwidth) / 2
        }

        setAllStyles(host, `.grid-layout-items{display:flex; width:${100 + (gap * 2)}%;margin-left:-${gap}%;}.grid-layout-item{width:${columnwidth}%;padding:${gap === 0 ? 4 : gap / 2}% ${gap}%;}`)
    })

const setDimensions = host => OnNextFrame(() => {
    if (host.scaletofit) { return setScale(host) }

    let gap = host.gap || defaultGap
    let columnwidth = host.columnwidth || defaultWidth

    setAllStyles(host, `.grid-layout-items{grid-gap:${gap}px; grid-template-columns:repeat(auto-fit, minmax(${columnwidth}px, 0fr));}${unsupportedCSS(host, gap, columnwidth)}`)
})

const elements = {
    root: {
        selector: componentRoot,
    },
    itemsContainer: {
        selector: `.${componentName}-items`
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host.theme)
    }
}

const properties = {
    columnwidth: {
        format: val => val === `100%` ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    gap: {
        format: val => Pipe(ToNumber, IfInvalid(defaultGap))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    },
    scaletofit: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
    }
}

const getComponentStyles = host => () => `${require(`./style.scss`).toString()}${host.theme || ``}${host.styles}`

export const GridLayout = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(properties),
    properties,
    elements,
    computed: {
        items: host => ({
            get() {
                Array.from(host.children).filter(el => el.tagName.toLowerCase() !== `style`)
            }
        })
    },
    methods: { getComponentStyles },
    onConnected(host) {
        OnNextFrame(() => {
            const itemsContainer = host.elements.itemsContainer

            const wrapItem = el => {
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

                return el
            }

            const observeEl = el => {
                if (el.nongrid) { return }
                wrapItem(el)
            }

            const disconnectEl = el => {
                const containerParent = Get(el, `container.parentElement`)

                Get(el, `eventSubscriptions.span.disconnect()`)

                if (containerParent) {
                    containerParent.removeChild(el.container)
                }
            }

            Array
                .from(host.children)
                .forEach(observeEl)

            host.slotObserver = new MutationObserver(mutationsList => {
                const list = Array.from(mutationsList)

                while (list.length) {
                    const mutation = list.shift()
                    if (mutation.type === `childList`) {
                        Array.from(mutation.addedNodes).forEach(observeEl)
                        Array.from(mutation.removedNodes).forEach(disconnectEl)
                    }
                }
            })

            host.slotObserver.observe(host, { childList: true })
            window.addEventListener(`resize`, () => setScale(host))

            OnNextFrame(() => host.setAttribute(`viewable`, true))
        })
    }
})

WCDefine(componentName, GridLayout)