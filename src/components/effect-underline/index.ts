import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import Observable from '../../utils/observable'
import { UnderlineObservedAttributes, UnderlineOperations } from './attributes'
import Convert from '../../utils/convert'

export class EffectUnderline extends HTMLElement {
    public Template
    public state: { [key: string]: Subject } = {}
    public targets$ = []
    public downEvent
    public on = false
    public $underline
    public $container

    public static get observedAttributes(): string[] {
        return Object.keys(UnderlineObservedAttributes)
    }

    constructor() {
        super()

        this.runStart = this.runStart.bind(this)
        this.signalEnd = this.signalEnd.bind(this)

        Object.keys(UnderlineObservedAttributes).forEach((attrKey) => {
            this.state[attrKey] = new Subject(UnderlineObservedAttributes[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = UnderlineObservedAttributes[attrKey](attrValue)

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
        if (!this.shadowRoot) {
            const Template = document.createElement(`template`)
            Template.innerHTML = `${style}${template}`

            const clone = document.importNode(Template.content, true)
            this.attachShadow({ mode: 'open' }).appendChild(clone)

            this.$container = this.shadowRoot.querySelector(`.effect-underline-container`)
            this.$underline = this.shadowRoot.querySelector(`.underline`)

            Object.keys(UnderlineObservedAttributes)
                .forEach(attrKey => {
                    if (!UnderlineOperations[attrKey]) { return }

                    this.state[attrKey].subscribe(
                        val => UnderlineOperations[attrKey](this, val)
                    )
                })
        }
    }

    public unloadTargets() {
        this.targets$.forEach(ob$ => ob$())
    }

    public loadTargets() {
        if (!this[`targets`] || !this[`start`]) { return }

        this[`targets`].forEach((target) => {
            this.setPositions(target.getBoundingClientRect())

            const start$ = Observable
                .fromEvent(target, this[`start`])
                .subscribe(this.runStart)

            const end$ = Observable
                .fromEvent(target, this[`end`])
                .subscribe(this.signalEnd)

            const down$ = Observable
                .fromEvent(target, `mousedown`)
                .subscribe(e => {
                    this.downEvent = e
                })

            this.targets$.push(start$)
            this.targets$.push(end$)
            this.targets$.push(down$)
        })
    }

    public runStart(e: Event) {
        if (this.on) { return }

        const el = e.target as HTMLElement
        const isBlur = e.type === `focus` && this[`end`] === `blur`

        this.on = true
        this.$container.classList.add(`active`)

        const startTime = new Date().getTime()
        const loop = Convert(
            () => {
                const now = new Date().getTime()
                this.setPositions(
                    el,
                    e.type === `focus` ? this.downEvent : e
                )

                const timesNotUp = now - startTime < this[`speed`]
                const animateAgain = timesNotUp || (this.on && isBlur)

                return animateAgain ? requestAnimationFrame(loop) : this.runEnd()
            }
        ).bind(this).value

        loop()
    }

    public runEnd() {
        this.$container.classList.remove(`active`)
        this.on = false

        const startTime = new Date().getTime()
        const loop = Convert(
            () => {
                const now = new Date().getTime()
                const timesNotUp = now - startTime < this[`speed`]

                return timesNotUp ? requestAnimationFrame(loop) : undefined
            }
        ).bind(this).value

        loop()
    }

    public signalEnd() {
        if (this.on) { return this.on = false }
        return this.runEnd()
    }

    public setPositions(el, e?) {
        if (e && this[`direction`] === `auto`) {
            const x = ((e.x - el.offsetLeft) / el.offsetWidth) * 100
            const left = Math.min(Math.max(x, 5), 95)
            this.$underline.style.transformOrigin = `${left}% 50%`
        } else {
            this.$underline.style.transformOrigin =
                this[`direction`] === `to left`
                    ? `100% center`
                    : this[`direction`] === `from center`
                        ? `center center`
                        : `to right`
        }
    }
}

if (!window.customElements.get(`effect-underline`)) {
    window.customElements.define(`effect-underline`, EffectUnderline)
}
