import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import SetStyleRules from '../../utils/html/set-style-rules'
import './style.scss'
import pipe from '../../utils/pipe'
import ToString from '../../utils/convert/to_string'
import IfInvalid from '../../utils/convert/if_invalid'
import AppendStyle from '../../utils/webcomponent/append-style'
import Set from '../../utils/set'
import Get from '../../utils/get'
import ID from '../../utils/id'
import HasNonDigits from '../../utils/convert/has_non_digits'

const style = require('./style.scss').toString()
const template = require('./index.html')
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
        AppendStyle(styleString, host, `outer`)
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
        format: val => pipe(ToString, IfInvalid(defaultWidth))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    gap: {
        format: val => pipe(ToString, IfInvalid(defaultGap))(val).value,
        onChange: (_val, host) => setDimensions(host)
    },
    styles: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
    theme: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (val, host) => setStyles(host.elements.themeStyles, val)
    }
}

const getComponentStyles = host => () => `${require('./style.scss').toString()}${host.theme || ``}${host.styles}`

const GridLayout = Constructor({
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
                Array.from(host.children).filter((el: HTMLElement) => el.tagName.toLowerCase() !== `style`)
            }
        })
    },
    methods: { getComponentStyles },
    onConnected(host) {
        const itemsContainer = host.elements.itemsContainer
        const spanValue = span => !HasNonDigits(span).valid ? `span ${span}` : span === `full` ? `1 / -1` : span
        const setSpan = (el, span) => Set(el, `container.style.gridColumn`, spanValue(span))
        const wrapItem = el => {
            const id = ID()
            const slotWrapper = document.createElement(`div`)
            slotWrapper.className = `grid-layout-item`
            slotWrapper.id = id
            setSpan(el, Get(el, `span`, host.subsections))
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

            const element = wrapItem(el)
            Set(
                element,
                `eventSubscriptions.span`,
                new MutationObserver(mutationsList => {
                    const list = Array.from(mutationsList)

                    while (list.length) {
                        const mutation = list.shift()
                        if (mutation.type === `attributes` && mutation.attributeName === `span`) {
                            const span = element.getAttribute('span') || host.subsections
                            setSpan(element, span)
                        }
                    }
                })
            )

            element.eventSubscriptions.span.observe(element, { attributes: true })
        }

        const disconnectEl = el => Get(el, `eventSubscriptions.span.disconnect()`)

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

Define(componentName, GridLayout)

export default GridLayout