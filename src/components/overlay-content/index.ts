import pipe from '../../utils/pipe'
import { ToBool } from '../../utils/convert/bool'
import { IfInvalid } from '../../utils/convert/if'
import { IndexOf } from '../../utils/convert/array'
import { ToNumber } from '../../utils/convert/number'
import { Constructor, Define } from '../../utils/webcomponent/constructor'
import ID from '../../utils/id'
import { GetCurve } from '../../utils/curve'

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

const template = require('./index.html')
const style = require('./style.html')
const componentName = `overlay-content`
const componentRoot = `.overlay-content-container`
const positionPadding = 40
const elements = {}
const onChange = () => { }

const elementSelectors = {
    root: componentRoot,
    contentContainer: `.overlay-content-content-container`,
    contentInner: `.overlay-content-content-inner`,
    inner: `.overlay-content-container-inner`
}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
    }
})

const attributes = {
    scrim: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value
    },
    target: {
        format: val => val instanceof HTMLElement ? val : null
    },
    align: {
        format: val => pipe(IndexOf(alignments), IfInvalid(`center`))(val).value
    },
    from: {
        format: val => pipe(IndexOf(alignments), IfInvalid(`center`))(val).value
    },
    speed: {
        format: val => pipe(ToNumber, IfInvalid(333))(val).value
    },
    class: {
        format: val => val
    }
}

const setPositions = host => () => {
    cancelAnimationFrame(host.positionTimer)

    const target: HTMLElement = host.target

    if (!host.showing || !target) { return }

    const targetBox = target.getBoundingClientRect()
    const isOnTop = host.isOnTop

    if (targetBox.top - 10 > window.innerHeight || targetBox.bottom + 10 < 0) {
        return host.hide()
    }

    host.elements.contentContainer.style.width = `${targetBox.width}px`
    host.elements.contentContainer.style.height = `${host.height}px`
    host.elements.contentContainer.style.left = `${targetBox.left}px`
    host.elements.contentContainer.style.top = `${isOnTop ? targetBox.top - host.elements.contentContainer.offsetHeight : host.spaceAbove + targetBox.height}px`
    let origin = `center ${isOnTop ? `bottom` : `top`}`

    host.elements.contentContainer.style.transformOrigin = `${origin}`

    if (host.elements.contentInner.classList.contains(`bottom`) && isOnTop) {
        host.elements.contentInner.classList.remove(`bottom`)
    }

    if (!host.elements.contentInner.classList.contains(`bottom`) && !isOnTop) {
        host.elements.contentInner.classList.add(`bottom`)
    }

    host.positionTimer = requestAnimationFrame(() => {
        setPositions(host)()
    })
}

const OverlayContent = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    properties: Object.assign({
        positionTimer: {
            format: val => val,
            onChange
        },
        showing: {
            format: val => ToBool(val).value,
            onChange
        }
    }, attributes),
    computed: {
        height: host => ({ get() { return (host.isOnTop ? host.spaceAbove : host.spaceBelow) - positionPadding } }),
        isOnTop: host => ({ get() { return host.spaceAbove > host.spaceBelow } }),
        spaceAbove: host => ({ get() { return host.target ? host.target.getBoundingClientRect().top : 0 } }),
        spaceBelow: host => ({ get() { return window.innerHeight - (host.spaceAbove + (host.target ? host.target.getBoundingClientRect().height : 0)) } }),
        position: host => ({
            get() {
                if (!host.elements.contentContainer) {
                    return { top: 0, y: 0, bottom: 0, left: 0, x: 0, right: 0, width: 0, height: 0, scrollTop: 0, scrollLeft: 0 }
                }

                const box = host.elements.contentContainer.getBoundingClientRect()

                return {
                    top: box.top,
                    y: box.y,
                    bottom: box.bottom,
                    left: box.left,
                    x: box.x,
                    right: box.right,
                    width: box.width,
                    height: box.height,
                    scrollTop: host.elements.contentContainer.scrollTop,
                    scrollLeft: host.elements.contentContainer.scrollLeft
                }
            }
        }),
    },
    methods: {
        scrollContent: host => (x, y) => {
            host.elements.contentContainer.scrollTop = y
            host.elements.contentContainer.scrollLeft = x
        },
        show: host => () => {
            if (host.showing) { return }

            host.showing = true
            setPositions(host)()

            const scalePoints = GetCurve([0, 1.02, 0.99, 1])
            const timeout = GetCurve([0, host.speed / scalePoints.length])

            if (host.target) {
                host.elements.contentContainer.style.width = `${host.target.offsetWidth}px`
            }

            const loop = () => {
                if (!host.showing) { return }

                const scalePoint = scalePoints.shift()
                const time = timeout[scalePoints.length]
                host.elements.contentContainer.style.transform = `scale(1, ${scalePoint})`

                if (scalePoints.length) {
                    setTimeout(() => loop(), time)
                } else {
                    host.elements.root.classList.add(`active`)
                }
            }

            loop()
        },

        hide: host => () => {
            if (!host.showing) { return }

            host.showing = false
            const scalePoints = GetCurve([1, 0])
            const timeout = GetCurve([0, host.speed / scalePoints.length])

            const loop = () => {
                if (host.showing) { return }

                const scalePoint = scalePoints.shift()
                const time = timeout[scalePoint.length]

                host.elements.contentContainer.style.transform = `scale(1, ${scalePoint})`

                if (scalePoints.length) {
                    setTimeout(() => loop(), time)
                } else {
                    host.elements.root.classList.remove(`active`)
                }
            }

            loop()

            host.dispatchEvent(new CustomEvent(`hidden`))
        }
    },
    elements,
    onConnected: host => host.inputID = ID(componentName)
})

Define(componentName, OverlayContent)

export default OverlayContent

/*
import Subject from '../../utils/subject'
import { OverlayContentObservedAttributes } from './attributes'
import { GetCurve } from '../../utils/curve'
import { webComponentTemplate } from '../../utils/html'



export class OverlayContent extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public $contentContainer
    public $contentInner
    public $inner
    public positionTimer
    public showing = false

    public get height() {
        return (this.isOnTop ? this.spaceAbove : this.spaceBelow) - positionPadding
    }

    public get isOnTop() {
        return this.spaceAbove > this.spaceBelow
    }

    public get spaceAbove() {
        const target: HTMLElement = this[`target`]

        if (!target) { return 0 }

        return target.getBoundingClientRect().top
    }

    public get spaceBelow() {
        const target: HTMLElement = this[`target`]

        if (!target) { return 0 }

        return window.innerHeight - (this.spaceAbove + target.getBoundingClientRect().height)
    }

    public get position() {
        const box = this.$contentContainer.getBoundingClientRect()

        return {
            top: box.top,
            y: box.y,
            bottom: box.bottom,
            left: box.left,
            x: box.x,
            right: box.right,
            width: box.width,
            height: box.height,
            scrollTop: this.$contentContainer.scrollTop,
            scrollLeft: this.$contentContainer.scrollLeft
        }
    }

    static get observedAttributes(): string[] { return Object.keys(OverlayContentObservedAttributes) }

    constructor() {
        super()

        Object.keys(OverlayContentObservedAttributes).forEach((attrKey) => {
            this.state[attrKey] = new Subject(OverlayContentObservedAttributes[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = OverlayContentObservedAttributes[attrKey](attrValue)

                    if (this.state[attrKey].value !== formattedValue) {
                        this.state[attrKey].next(formattedValue)
                    }
                }
            })
        })
    }

    public attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
        if (newValue !== oldValue) { this[attrName] = newValue }
    }

    public connectedCallback() {
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)

        if (!this.shadowRoot) {
            webComponentTemplate(componentName, template, this, style, componentRoot)
            this.setElements()
        }
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.overlay-content-container`)
        this.$contentContainer = this.shadowRoot.querySelector(`.overlay-content-content-container`)
        this.$contentInner = this.shadowRoot.querySelector(`.overlay-content-content-inner`)
        this.$inner = this.shadowRoot.querySelector(`.overlay-content-container-inner`)
    }

    public show() {
        if (this.showing) { return }

        this.showing = true
        this.setPositions()

        const scalePoints = GetCurve([0, 1.02, 0.99, 1])
        const timeout = GetCurve([0, this[`speed`] / scalePoints.length])

        if (this[`target`]) {
            this.$contentContainer.style.width = `${this[`target`].offsetWidth}px`
        }

        const loop = () => {
            if (!this.showing) { return }

            const scalePoint = scalePoints.shift()
            const time = timeout[scalePoints.length]

            this.$contentContainer.style.transform = `scale(1, ${scalePoint})`

            if (scalePoints.length) {
                setTimeout(() => loop(), time)
            } else {
                this.$container.classList.add(`active`)
            }
        }

        loop()
    }

    public hide() {
        if (!this.showing) { return }
        this.showing = false

        const scalePoints = GetCurve([1, 0])
        const timeout = GetCurve([0, this[`speed`] / scalePoints.length])

        const loop = () => {
            if (this.showing) { return }

            const scalePoint = scalePoints.shift()
            const time = timeout[scalePoint.length]

            this.$contentContainer.style.transform = `scale(1, ${scalePoint})`

            if (scalePoints.length) {
                setTimeout(() => loop(), time)
            } else {
                this.$container.classList.remove(`active`)
            }
        }

        loop()

        this.dispatchEvent(new CustomEvent(`hidden`))
    }

    public setPositions() {
        cancelAnimationFrame(this.positionTimer)

        const target: HTMLElement = this[`target`]

        if (!this.showing || !target) { return }

        const targetBox = target.getBoundingClientRect()
        const isOnTop = this.isOnTop

        if (targetBox.top - 10 > window.innerHeight || targetBox.bottom + 10 < 0) {
            return this.hide()
        }

        this.$contentContainer.style.width = `${targetBox.width}px`
        this.$contentContainer.style.height = `${this.height}px`
        this.$contentContainer.style.left = `${targetBox.left}px`
        this.$contentContainer.style.top = `${isOnTop ? targetBox.top - this.$contentContainer.offsetHeight : this.spaceAbove + targetBox.height}px`
        let origin = `center ${isOnTop ? `bottom` : `top`}`

        this.$contentContainer.style.transformOrigin = `${origin}`

        if (this.$contentInner.classList.contains(`bottom`) && isOnTop) {
            this.$contentInner.classList.remove(`bottom`)
        }

        if (!this.$contentInner.classList.contains(`bottom`) && !isOnTop) {
            this.$contentInner.classList.add(`bottom`)
        }

        this.positionTimer = requestAnimationFrame(() => {
            this.setPositions()
        })
    }

    public scrollContent(x, y) {
        this.$contentContainer.scrollTop = y
        this.$contentContainer.scrollLeft = x
    }
}

if (!window.customElements.get(componentName)) {
    window.customElements.define(componentName, OverlayContent)
}
*/