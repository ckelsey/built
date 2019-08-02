import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import Observable from '../../utils/observable'
import { RippleObservedAttributes, RippleOperations } from './attributes'
import Convert from '../../utils/convert'

class EffectRipple extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public targets$ = []
    public downEvent
    public on = false
    public $ripple
    public $rippleInner
    public $container

    public static get observedAttributes(): string[] {
        return Object.keys(RippleObservedAttributes)
    }

    constructor() {
        super()

        this.runStart = this.runStart.bind(this)
        this.signalEnd = this.signalEnd.bind(this)

        Object.keys(RippleObservedAttributes).forEach((attrKey) => {
            this.state[attrKey] = new Subject(RippleObservedAttributes[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = RippleObservedAttributes[attrKey](attrValue)

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

            this.$container = this.shadowRoot.querySelector(`.effect-ripple-container`)
            this.$ripple = this.shadowRoot.querySelector(`.ripple`)
            this.$rippleInner = this.shadowRoot.querySelector(`.ripple-inner`)

            Object.keys(RippleObservedAttributes)
                .forEach(attrKey => {
                    if (!RippleOperations[attrKey]) { return }

                    this.state[attrKey].subscribe(
                        val => RippleOperations[attrKey](this, val)
                    )
                })
        }
    }

    public unloadTargets() {
        this.targets$.forEach(ob$ => ob$())
    }

    public loadTargets() {
        if (!this[`targets`] || !this[`start`]) { return }

        this[`targets`].forEach((target, index) => {
            target[`rippleindex`] = index

            this.setPositions(target)

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
        const el = e.target as HTMLElement
        const index = el ? el[`rippleindex`] : null

        if ((!index && index !== 0) || this.on) {
            return
        }

        this.on = true
        this.$container.classList.remove(`hide`)
        this.$container.classList.add(`active`)

        const startTime = new Date().getTime()
        const loop = Convert(
            () => {
                const now = new Date().getTime()
                this.setPositions(
                    el,
                    e.type === `focus` ? this.downEvent : e
                )

                if (now - startTime < this[`speed`]) {
                    requestAnimationFrame(loop)
                } else if (!this.on || e.type === `focus`) {
                    this.runEnd()
                } else {
                    this.on = false
                }
            }
        ).bind(this).value

        loop()
    }

    public runEnd() {
        this.$container.classList.remove(`hide`)
        this.$container.classList.add(`fade`)
        this.$container.classList.remove(`active`)
        this.on = false

        const startTime = new Date().getTime()
        const loop = Convert(
            () => {
                const now = new Date().getTime()

                if (now - startTime >= this[`speed`]) {
                    this.$container.classList.remove(`fade`)
                } else {
                    requestAnimationFrame(loop)
                }
            }
        ).bind(this).value

        loop()
    }

    public signalEnd() {
        if (this.on) { return this.on = false }
        return this.runEnd()
    }

    public setPositions(el, e?) {
        this.$ripple.style.width = `${el.offsetWidth}px`
        this.$ripple.style.height = `${el.offsetHeight}px`

        if (e) {
            const x = ((e.x - el.offsetLeft) / el.offsetWidth) * 100
            const left = Math.min(Math.max(x, 5), 95)
            this.$rippleInner.style.transformOrigin = `${100 - left}% 50%`
        }
    }
}

window.customElements.define(`effect-ripple`, EffectRipple)

export default EffectRipple
