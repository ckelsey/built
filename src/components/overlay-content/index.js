import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { Get } from '../../utils/get.js'
import { IndexOf } from '../../utils/index-of.js'
import { Timer } from '../../services/timer.js'
import { EaseInOut } from '../../utils/ease-in-out.js'

const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const positionPadding = 40
const widths = [`content`, `target`]
const alignments = [`center`, `left`, `right`, `top`, `bottom`, `center center`, `center top`, `center bottom`, `left center`, `left top`, `left bottom`, `right center`, `right top`, `right bottom`,]
const emptyBox = { top: 0, y: 0, bottom: 0, left: 0, x: 0, right: 0, width: 0, height: 0, }
const template = require(`./index.html`)
const componentName = `overlay-content`
const componentRoot = `.overlay-content-container`
const elements = {
    root: { selector: componentRoot },
    contentContainer: { selector: `.${componentName}-content-container` },
    contentInner: { selector: `.${componentName}-content-inner` },
    inner: { selector: `.${componentName}-container-inner` },
}

const attributes = {
    target: { format: val => val instanceof HTMLElement || val instanceof HTMLUnknownElement ? val : null },
    align: { format: val => Pipe(IndexOf(alignments), IfInvalid(`center`))(val).value },
    from: { format: val => Pipe(IndexOf(alignments), IfInvalid(`center`))(val).value },
    speed: { format: val => Pipe(ToNumber, IfInvalid(333))(val).value },
    widthbasis: { format: val => Pipe(IndexOf(widths), IfInvalid(`content`))(val).value },
}

const setPositions = host => {
    cancelAnimationFrame(host.positionTimer)
    const target = host.target

    if (!host.showing || !target) { return }

    host.getPositions().then(positions => {
        if (positions.outOfView) { return host.hide() }

        host.width = positions.containerWidth

        if (positions.rootBox.y !== 0) {
            positions.inner.style.top = `-${positions.rootBox.y}px`
        }

        if (positions.rootBox.x !== 0) {
            positions.inner.style.left = `-${positions.rootBox.x}px`
        }

        if (positions.rootBox.width !== positions.clientWidth) {
            positions.inner.style.width = `${positions.clientWidth}px`
        }

        if (positions.rootBox.height !== positions.clientHeight) {
            positions.inner.style.height = `${positions.clientHeight}px`
        }

        positions.container.style.width = positions.targetWidth
        positions.container.style.minWidth = positions.targetMinWidth
        positions.container.style.height = `auto`
        positions.container.style.maxHeight = `${positions.hostHeight}px`
        positions.container.style.left = `${positions.containerLeft}px`
        positions.container.style.top = `${positions.isOnTop ? positions.targetBox.top - positions.containerHeight : positions.spaceAbove + positions.targetBox.height}px`
        positions.container.style.transformOrigin = `center ${positions.isOnTop ? `bottom` : `top`}`

        if (positions.inner.classList.contains(`bottom`) && positions.isOnTop) {
            positions.inner.classList.remove(`bottom`)
        }

        if (!positions.inner.classList.contains(`bottom`) && !positions.isOnTop) {
            positions.inner.classList.add(`bottom`)
        }

        host.positionTimer = requestAnimationFrame(() => OnNextFrame(() => setPositions(host)))
    })
}

const animator = (points, speed, stepFn) => new Promise(resolve =>
    Timer(
        stepFn,
        EaseInOut(points, speed),
    ).then(resolve)
)

export const OverlayContent = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes: Object.keys(attributes),
    properties: Object.assign({}, {
        showing: { format: val => ToBool(val).value, },
        width: {
            format: val => val,
            onChange: (_val, host) => host.dispatchEvent(new CustomEvent(`widthchange`, { detail: host }))
        },
    }, attributes),
    computed: { position: host => ({ get() { return host.getPositions() } }), },
    methods: {
        getPositions: host => () => OnNextFrame(() => {
            const container = host.elements.contentContainer
            const targetBox = Get(host, `target.getBoundingClientRect()`, emptyBox)
            const targetMinWidth = targetBox.width ? `${targetBox.width}px` : `auto`
            const spaceAbove = targetBox.top
            const clientHeight = document.documentElement.clientHeight
            const spaceBelow = clientHeight - (targetBox.top + targetBox.height)
            const containerWidth = Get(container, `offsetWidth`, 0)
            const containerHeight = Get(container, `offsetHeight`, 0)
            const windowWidth = window.innerWidth
            const inner = host.elements.inner
            const innerBox = Get(inner, `getBoundingClientRect()`, emptyBox)
            const isOnTop = spaceAbove > spaceBelow

            return Object.assign(
                {},
                Get(container, `getBoundingClientRect()`, emptyBox),
                {
                    hostHeight: (isOnTop ? spaceAbove : spaceBelow) - positionPadding,
                    scrollTop: Get(container, `scrollTop`, 0),
                    scrollLeft: Get(container, `scrollLeft`, 0),
                    targetWidth: !host.widthbasis || host.widthbasis === `content` ? `auto` : targetMinWidth,
                    targetMinWidth,
                    targetBox,
                    rootBox: Get(host, `elements.root.getBoundingClientRect()`, emptyBox),
                    spaceAbove,
                    spaceBelow,
                    isOnTop,
                    clientWidth: document.documentElement.clientWidth,
                    clientHeight,
                    windowWidth,
                    containerWidth,
                    containerHeight,
                    containerTop: (isOnTop ? targetBox.top - containerHeight : spaceAbove + targetBox.height) - innerBox.y,
                    containerLeft: (targetBox.left + containerWidth >= (windowWidth - 10) ? targetBox.right - containerWidth : targetBox.left) - innerBox.left,
                    container,
                    inner,
                    innerBox,
                    outOfView: targetBox.top - 10 > clientHeight || targetBox.bottom + 10 < 0
                }
            )
        }).promise,
        scrollContent: host => (x, y) => {
            const container = host.elements.contentContainer

            if (!container) { return }

            container.scrollTop = y
            container.scrollLeft = x
        },
        show: host => () => {
            if (host.showing) { return Promise.resolve() }

            return new Promise(resolve => {
                host.showing = true

                const container = host.elements.contentContainer
                const inner = host.elements.inner

                if (!container || !inner) { return }

                container.style.pointerEvents = `all`
                inner.style.display = `block`

                animator([0, 1.02, 0.99, 1], host.speed / 2, scalePoint => {
                    container.style.transform = `scale(1, ${scalePoint})`
                    container.style.opacity = scalePoint
                }).then(() => {
                    container.style.transform = `scale(1, 1)`
                    container.style.opacity = 1
                    resolve(host.dispatchEvent(new CustomEvent(`shown`)))
                })

                setPositions(host)
            })
        },

        hide: host => () => {
            if (!host.showing) { return Promise.resolve() }

            return new Promise(resolve => {
                host.showing = false

                const container = host.elements.contentContainer
                const inner = host.elements.inner

                if (!container || !inner) { return }

                inner.style.display = container.style.pointerEvents = `none`
                container.style.transform = `scale(1, 0)`
                container.style.opacity = 0
                resolve(host.dispatchEvent(new CustomEvent(`hidden`)))
            })
        }
    },
    elements,
})

WCDefine(componentName, OverlayContent)