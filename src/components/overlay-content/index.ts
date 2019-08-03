import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { OverlayContentObservedAttributes } from './attributes'
import { GetCurve } from '../../utils/curve'

export class OverlayContent extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public $contentContainer
    public $inner
    public positionTimer
    public showing = false

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
            const Template = document.createElement(`template`)
            Template.innerHTML = `${style}${template}`

            const clone = document.importNode(Template.content, true)
            this.attachShadow({ mode: 'open' }).appendChild(clone)

            this.setElements()
        }
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.overlay-content-container`)
        this.$contentContainer = this.shadowRoot.querySelector(`.overlay-content-content-container`)
        this.$inner = this.shadowRoot.querySelector(`.overlay-content-container-inner`)
    }

    public show() {
        if (this.showing) { return }

        this.showing = true
        this.setPositions()

        const scalePoints = GetCurve([0, 1.02, 0.99, 1])
        const timeout = GetCurve([0, this[`speed`] / scalePoints.length])

        this.setTransformOrigin()

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
        this.showing = false

        const scalePoints = GetCurve([1, 0])
        const timeout = GetCurve([0, this[`speed`] / scalePoints.length])

        this.setTransformOrigin()

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
    }

    public setTransformOrigin() {
        let origin = `center center`

        switch (this[`align`]) {
            case `center bottom`:
                origin = `center top`
                break
        }

        this.$contentContainer.style.transformOrigin = `${origin}`
    }

    public setPositions() {
        cancelAnimationFrame(this.positionTimer)

        const target: HTMLElement = this[`target`]

        if (!this.showing || !target) { return }

        const targetBox = target.getBoundingClientRect()

        this.$contentContainer.style.width = `${targetBox.width}px`
        this.$contentContainer.style.removeProperty(`height`)

        const centerY = () => {
            const center = (target.offsetHeight / 2) + targetBox.top
            const contentCenter = this.$contentContainer.offsetHeight / 2
            let top = center - contentCenter

            if (top < 5) {
                top = 5
            }

            if (top + this.$contentContainer.offsetHeight > window.innerHeight - 5) {
                top = (window.innerHeight - 5) - this.$contentContainer.offsetHeight
            }

            if (top < 5) {
                top = 5
                this.$contentContainer.style.height = `${window.innerHeight - 10}px`
            }

            this.$contentContainer.style.top = `${top}px`
        }

        const bottomY = () => {
            let top = targetBox.bottom

            if (top < 5) {
                top = 5
            }

            if (top + this.$contentContainer.offsetHeight > window.innerHeight - 5) {
                top = (window.innerHeight - 5) - this.$contentContainer.offsetHeight
            }

            if (top < 5) {
                top = 5
                this.$contentContainer.style.height = `${window.innerHeight - 10}px`
            }

            this.$contentContainer.style.top = `${top}px`
        }

        const centerX = () => {
            const center = (target.offsetWidth / 2) + targetBox.left
            const contentCenter = this.$contentContainer.offsetWidth / 2
            let left = center - contentCenter

            if (left < 5) {
                left = 5
            }

            this.$contentContainer.style.left = `${left}px`
        }


        switch (this[`align`]) {
            case `center`:
            case `center center`:
                centerY()
                centerX()
                break;

            case `bottom`:
            case `center bottom`:
                bottomY()
                centerX()
                break;

            default:
                break;
        }

        this.positionTimer = requestAnimationFrame(() => {
            this.setPositions()
        })
    }
}

if (!window.customElements.get(`overlay-content`)) {
    window.customElements.define(`overlay-content`, OverlayContent)
}
