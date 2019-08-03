import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import Observable from '../../utils/observable'
import { BounceZObservedAttributes, BounceZOperations } from './attributes'
import { GetCurve } from '../../utils/curve'

const getDimension = target => {
    const max = Math.max(target.offsetWidth, target.offsetHeight)
    const min = Math.min(target.offsetWidth, target.offsetHeight)

    return (((max - min) / 2) + min)
}

export class EffectBounceZ extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public targets$ = []
    public downEvent
    public on = false

    public static get observedAttributes(): string[] {
        return Object.keys(BounceZObservedAttributes)
    }

    constructor() {
        super()

        this.runStart = this.runStart.bind(this)
        this.signalEnd = this.signalEnd.bind(this)

        Object.keys(BounceZObservedAttributes).forEach((attrKey) => {
            this.state[attrKey] = new Subject(BounceZObservedAttributes[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = BounceZObservedAttributes[attrKey](attrValue)

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

            Object.keys(BounceZObservedAttributes)
                .forEach(attrKey => {
                    if (!BounceZOperations[attrKey]) { return }

                    this.state[attrKey].subscribe(
                        val => BounceZOperations[attrKey](this, val)
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

            const start$ = Observable
                .fromEvent(target, this[`start`])
                .subscribe(this.runStart)

            this.targets$.push(start$)

            const down$ = Observable
                .fromEvent(target, `mousedown`)
                .subscribe(e => this.downEvent = e)

            this.targets$.push(down$)

            if (this[`end`]) {
                const end$ = Observable
                    .fromEvent(target, this[`end`])
                    .subscribe(this.signalEnd)
                this.targets$.push(end$)
            }
        })
    }

    public runStart() {
        if (this.on) { return }

        this.on = true

        this[`targets`].forEach((target, index) => {

            const amount = this[`amount`]
            const dimension = getDimension(target)
            const scale = (dimension - amount) / dimension
            const points = GetCurve([1, 1 - ((1 - scale) * 1.125), scale])
            const timeout = GetCurve([0, this[`speed`] / points.length])

            const loop = () => {
                if (!this.on) { return }

                const point = points.shift()
                const time = timeout[points.length]

                target.style.transform = `scale(${point})`

                if (points.length) {
                    setTimeout(() => loop(), time)
                } else if (index === this[`targets`].length - 1) {
                    this.runEnd()
                }
            }

            loop()
        })
    }

    public runEnd() {
        this.on = false

        this[`targets`].forEach(target => {

            const amount = this[`amount`]
            const dimension = getDimension(target)
            const scale = (dimension - amount) / dimension
            const points = GetCurve([scale, 1 + ((1 - scale) * 0.38), 1])
            const timeout = GetCurve([0, this[`speed`] / points.length])

            const loop = () => {
                if (this.on) { return }

                const point = points.shift()
                const time = timeout[points.length]

                target.style.transform = `scale(${point})`

                if (points.length) {
                    setTimeout(() => loop(), time)
                }
            }

            loop()
        })
    }

    public signalEnd() {
        return this.runEnd()
    }
}

if (!window.customElements.get(`effect-bounce-z`)) {
    window.customElements.define(`effect-bounce-z`, EffectBounceZ)
}