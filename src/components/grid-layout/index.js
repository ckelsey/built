import { WCConstructor, WCDefine, AppendStyleElement, ID, Pipe, SetStyleRules, ToString, IfInvalid, Get } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `grid-layout`
const componentRoot = `.${componentName}-container`

const defaultWidth = `15em`
const defaultGap = `1em`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setDimensions = host => {
    const canDoGrid = typeof host.style.grid === `string`
    const gap = host.gap || defaultGap
    const columnwidth = host.columnwidth || defaultWidth
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)
    const themeStyles = host.elements.themeStyles
    const injectedStyles = host.elements.injectedStyles
    let outerStyle = host.querySelector(`style[name="outer"]`)

    const unsupportedCSS = canDoGrid ? `` : `.grid-layout-items{margin-left:-${gap};margin-right:-${gap};}.grid-layout-items .grid-layout-item{max-width:${columnwidth};margin:${gap};}`

    const styleString = [
        style,
        themeStyles ? themeStyles.innerHTML : ``,
        injectedStyles ? injectedStyles.innerHTML : ``,
        `.grid-layout-items{grid-gap:${gap}; grid-template-columns:repeat(auto-fit, minmax(${columnwidth}, 0fr));}${unsupportedCSS}`
    ].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
        outerStyle.nongrid = true
    }

    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

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
        format: val => Pipe(ToString, IfInvalid(defaultWidth))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    gap: {
        format: val => Pipe(ToString, IfInvalid(defaultGap))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    styles: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
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
        const itemsContainer = host.elements.itemsContainer
        // const spanValue = span => !HasNonDigits(span).valid ? `span ${span}` : span === `full` ? `1 / -1` : span
        // const setSpan = (el, span) => Set(el, `container.style.gridColumn`, spanValue(span))
        const wrapItem = el => {
            const id = ID()
            const slotWrapper = document.createElement(`div`)
            slotWrapper.className = `grid-layout-item`
            slotWrapper.id = id
            // setSpan(el, Get(el, `span`, host.subsections))
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

            // const element = wrapItem(el)
            // Set(
            //     element,
            //     `eventSubscriptions.span`,
            //     new MutationObserver(mutationsList => {
            //         const list = Array.from(mutationsList)

            //         while (list.length) {
            //             const mutation = list.shift()
            //             if (mutation.type === `attributes` && mutation.attributeName === `span`) {
            //                 // const span = element.getAttribute('span') || host.subsections
            //                 // setSpan(element, span)
            //             }
            //         }
            //     })
            // )

            // element.eventSubscriptions.span.observe(element, { attributes: true })
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
    }
})

WCDefine(componentName, GridLayout)