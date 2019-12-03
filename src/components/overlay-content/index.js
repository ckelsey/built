import { Pipe, ToBool, IfInvalid, ToNumber, WCConstructor, WCDefine, GetCurve, ComponentClassObject, SetStyleRules, IndexOf } from '../..'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

export const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const alignments = [
    `center`,
    `left`,
    `right`,
    `top`,
    `bottom`,
    `center center`,
    `center top`,
    `center bottom`,
    `left center`,
    `left top`,
    `left bottom`,
    `right center`,
    `right top`,
    `right bottom`,
]

const template = require(`./index.html`)
const componentName = `overlay-content`
const componentRoot = `.overlay-content-container`
const positionPadding = 40
const elements = {}

const elementSelectors = {
    root: componentRoot,
    contentContainer: `.overlay-content-content-container`,
    contentInner: `.overlay-content-content-inner`,
    inner: `.overlay-content-container-inner`,
    injectedStyles: `style.injectedStyles`
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: key === `injectedStyles`
            ? (el, host) => setStyles(el, host.styles)
            : () => { }
    }
})

const widths = [`content`, `target`]

const attributes = {
    target: {
        format: val => val instanceof HTMLElement ? val : null
    },
    align: {
        format: val => Pipe(IndexOf(alignments), IfInvalid(`center`))(val).value
    },
    from: {
        format: val => Pipe(IndexOf(alignments), IfInvalid(`center`))(val).value
    },
    speed: {
        format: val => Pipe(ToNumber, IfInvalid(333))(val).value
    },
    class: ComponentClassObject,
    widthbasis: {
        format: val => Pipe(IndexOf(widths), IfInvalid(`content`))(val).value
    },
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
}

const getWidth = host => {
    const targetWidth = host.target ? `${host.target.getBoundingClientRect().width}px` : `auto`
    return {
        width: !host.widthbasis || host.widthbasis === `content` ? `auto` : targetWidth,
        minWidth: targetWidth
    }
}

const setPositions = host => () => {
    cancelAnimationFrame(host.positionTimer)

    const target = host.target

    if (!host.showing || !target) { return }

    const container = host.elements.contentContainer
    const inner = host.elements.inner
    const rootBox = host.elements.root.getBoundingClientRect()

    if (rootBox.y !== 0) {
        inner.style.top = `-${rootBox.y}px`
    }

    if (rootBox.x !== 0) {
        inner.style.left = `-${rootBox.x}px`
    }

    if (rootBox.width !== document.documentElement.clientWidth) {
        inner.style.width = `${document.documentElement.clientWidth}px`
    }

    if (rootBox.height !== document.documentElement.clientHeight) {
        inner.style.height = `${document.documentElement.clientHeight}px`
    }

    const targetBox = target.getBoundingClientRect()
    const isOnTop = host.isOnTop

    if (targetBox.top - 10 > document.documentElement.clientHeight || targetBox.bottom + 10 < 0) {
        return host.hide()
    }

    const widths = getWidth(host)
    container.style.width = widths.width
    container.style.minWidth = widths.minWidth
    container.style.height = `auto`
    container.style.maxHeight = `${host.height}px`

    const left = targetBox.left + container.offsetWidth >= (window.innerWidth - 10)
        ? targetBox.right - container.offsetWidth
        : targetBox.left

    container.style.left = `${left}px`
    container.style.top = `${isOnTop ? targetBox.top - container.offsetHeight : host.spaceAbove + targetBox.height}px`
    let origin = `center ${isOnTop ? `bottom` : `top`}`

    host.width = container.offsetWidth

    container.style.transformOrigin = `${origin}`

    if (inner.classList.contains(`bottom`) && isOnTop) {
        inner.classList.remove(`bottom`)
    }

    if (!inner.classList.contains(`bottom`) && !isOnTop) {
        inner.classList.add(`bottom`)
    }

    host.positionTimer = requestAnimationFrame(() => {
        setPositions(host)()
    })
}

export const OverlayContent = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
    properties: Object.assign({}, {
        positionTimer: { format: val => val, },
        showing: { format: val => ToBool(val).value, },
        width: {
            format: val => val,
            onChange: (_val, host) => {
                host.dispatchEvent(new CustomEvent(`widthchange`, { detail: host }))
            }
        },
    }, attributes),
    computed: {
        height: host => ({ get() { return (host.isOnTop ? host.spaceAbove : host.spaceBelow) - positionPadding } }),
        isOnTop: host => ({ get() { return host.spaceAbove > host.spaceBelow } }),
        spaceAbove: host => ({ get() { return host.target ? host.target.getBoundingClientRect().top : 0 } }),
        spaceBelow: host => ({ get() { return document.documentElement.clientHeight - (host.spaceAbove + (host.target ? host.target.getBoundingClientRect().height : 0)) } }),
        position: host => ({
            get() {
                const container = host.elements.contentContainer

                if (!container) {
                    return { top: 0, y: 0, bottom: 0, left: 0, x: 0, right: 0, width: 0, height: 0, scrollTop: 0, scrollLeft: 0 }
                }

                const box = container.getBoundingClientRect()

                return {
                    top: box.top,
                    y: box.y,
                    bottom: box.bottom,
                    left: box.left,
                    x: box.x,
                    right: box.right,
                    width: box.width,
                    height: box.height,
                    scrollTop: container.scrollTop,
                    scrollLeft: container.scrollLeft,
                }
            }
        }),
    },
    methods: {
        scrollContent: host => (x, y) => {
            const container = host.elements.contentContainer
            container.scrollTop = y
            container.scrollLeft = x
        },
        show: host => () => {
            if (host.showing) { return Promise.resolve() }

            return new Promise(resolve => {
                host.elements.root.classList.add(`activating`)
                host.showing = true
                setPositions(host)()

                const scalePoints = GetCurve([0, 1.02, 0.99, 1])
                const timeout = GetCurve([0, host.speed / scalePoints.length])
                const widths = getWidth(host)
                const container = host.elements.contentContainer

                container.style.width = widths.width
                container.style.minWidth = widths.minWidth

                const loop = () => {
                    if (!host.showing) { return Promise.resolve() }

                    const scalePoint = scalePoints.shift()
                    const time = timeout[scalePoints.length]
                    container.style.transform = `scale(1, ${scalePoint})`

                    if (scalePoints.length) {
                        setTimeout(() => loop(), time)
                    } else {
                        host.elements.root.classList.add(`active`)
                        host.elements.root.classList.remove(`activating`)
                        resolve()
                        host.dispatchEvent(new CustomEvent(`shown`))
                    }
                }

                loop()
            })
        },

        hide: host => () => {
            if (!host.showing) { return Promise.resolve() }

            return new Promise(resolve => {
                host.elements.root.classList.remove(`activating`)
                host.showing = false
                const scalePoints = GetCurve([1, 0])
                const timeout = GetCurve([0, host.speed / scalePoints.length])
                const container = host.elements.contentContainer

                const loop = () => {
                    if (host.showing) { return resolve() }

                    const scalePoint = scalePoints.shift()
                    const time = timeout[scalePoint.length]

                    container.style.transform = `scale(1, ${scalePoint})`

                    if (scalePoints.length) {
                        setTimeout(() => loop(), time)
                    } else {
                        host.elements.root.classList.remove(`active`)
                        resolve()
                        host.dispatchEvent(new CustomEvent(`hidden`))
                    }
                }

                loop()
            })
        }
    },
    elements,
})

WCDefine(componentName, OverlayContent)