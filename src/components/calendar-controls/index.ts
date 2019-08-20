import Subject from '../../utils/subject'
import { ToDate, DateToObject } from '../../utils/convert/date'
import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { CommasToArray } from '../../utils/convert/commas-to-array'
import { ToObject } from '../../utils/convert/object'

import '../icon-element'
import '../effect-bounce-z'
import '../effect-ripple'
import { webComponentTemplate } from '../../utils/html'

const template = require('./index.html')
const style = require('./style.html')
const componentName = `calendar-controls`
const componentRoot = `.calendar-controls`

const Properties = {
    value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
    values: val => pipe(CommasToArray, IfInvalid(null))(val).value,
    dates: val => pipe(ToObject, IfInvalid({}))(val).value,
    class: val => val
}

const operations = that => ({
    value: () => {
        that.populate()
        that.valuechange()
    },
    values: () => {
        that.populate()
        that.valuechange()
    },
    dates: () => that.populate(),
    class: val => {
        const newClasses = !!val && typeof val === `string` ? val.split(` `).map(c => c.trim()) : []
        const clss = that.$container.className.split(` `).map(c => c.trim())
        const prev = !!that.state.class.previous && typeof that.state.class.previous === `string` ? that.state.class.previous.split(` `).map(c => c.trim()) : []

        prev.forEach(c => {
            const indexInClss = clss.indexOf(c)
            if (newClasses.indexOf(c) === -1 && indexInClss > -1) {
                clss.splice(indexInClss, 1)
            }
        })

        newClasses.forEach(c => {
            if (clss.indexOf(c) === -1) {
                clss.push(c)
            }
        })

        that.$container.className = clss.map(c => c.trim()).filter(c => !!c).join(` `)
    }
})

export class CalendarControls extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public $calendar
    public $month
    public $year
    public $chevronLeft
    public $chevronRight

    public get Value() {
        return new Date(this.state.value.value)
    }

    public get Values() {
        return Array.isArray(this.state.values.value) ? this.state.values.value.map(v => new Date(v)) : null
    }

    static get observedAttributes(): string[] { return Object.keys(Properties) }

    constructor() {
        super()

        Object.keys(Properties).forEach((attrKey) => {
            this.state[attrKey] = new Subject(Properties[attrKey](this[attrKey], this))

            Object.defineProperty(this, attrKey, {
                get() {
                    if (attrKey === `value`) {
                        return this.Value
                    }

                    if (attrKey === `values`) {
                        return this.Values
                    }

                    return this.state[attrKey].value
                },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = Properties[attrKey](attrValue, this)

                    if (this.state[attrKey].value !== formattedValue) {
                        return this.state[attrKey].next(formattedValue)
                    }
                }
            })
        })
    }

    public attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
        if (newValue !== oldValue) {
            this[attrName] = newValue
        }
    }

    public connectedCallback() {
        if (this.shadowRoot) { return }

        const Operations = operations(this)

        webComponentTemplate(componentName, template, this, style, componentRoot)

        Object.keys(Properties)
            .forEach(attrKey => {
                if (!Operations[attrKey]) { return }

                this.state[attrKey].subscribe(
                    val => Operations[attrKey](val)
                )
            })

        this.setElements()
        this.populate()
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.calendar-controls`)
        this.$month = this.shadowRoot.querySelector(`.calendar-month`)
        this.$year = this.shadowRoot.querySelector(`.calendar-year`)
        this.$chevronLeft = this.shadowRoot.querySelector(`.icon-chevron-left`)
        this.$chevronRight = this.shadowRoot.querySelector(`.icon-chevron-right`)

        const displayFontSize = getComputedStyle(this.shadowRoot.querySelector(`.calendar-control`)).getPropertyValue(`font-size`)
        this.$chevronLeft.size = this.$chevronRight.size = displayFontSize
        this.$chevronLeft.type = '../../../icons/chevron_left.svg'
        this.$chevronRight.type = '../../../icons/chevron_right.svg'

        const changeMonth = (amount, d) => !d ? undefined : new Date(d.setMonth(d.getMonth() + amount))
        const monthChange = amount => {
            if (this.Values && this.Values[0]) {
                const d1 = changeMonth(amount, this.Values[0])
                const d2 = changeMonth(amount, this.Values[1])
                this[`values`] = [d1, d2]
                return
            }

            this[`value`] = changeMonth(amount, this.Value)
        }

        this.$chevronLeft.addEventListener(`click`, () => monthChange(-1))
        this.$chevronRight.addEventListener(`click`, () => monthChange(1))

        const triggerEffect = el => {
            el.dispatchEvent(new Event('mousedown'))
            el.dispatchEvent(new Event('mouseup'))
        }

        const leftBounce = this.shadowRoot.querySelector(`.calendar-previous effect-bounce-z`) as any
        const leftRipple = this.shadowRoot.querySelector(`.calendar-previous effect-ripple`) as any
        leftBounce.targets = [this.$chevronLeft]
        leftRipple.targets = [this.$chevronLeft]

        leftBounce.addEventListener(`focus`, () => triggerEffect(leftBounce))
        leftRipple.addEventListener(`focus`, () => triggerEffect(leftRipple))

        const rightBounce = this.shadowRoot.querySelector(`.calendar-next effect-bounce-z`) as any
        const rightRipple = this.shadowRoot.querySelector(`.calendar-next effect-ripple`) as any
        rightBounce.targets = [this.$chevronRight]
        rightRipple.targets = [this.$chevronRight]

        rightBounce.addEventListener(`focus`, () => triggerEffect(rightBounce))
        rightRipple.addEventListener(`focus`, () => triggerEffect(rightRipple))

    }

    public populate() {
        if (!this.$month) { return }

        const date = DateToObject(this.Values ? this.Values[0] : this.Value ? this.Value : new Date()).value
        this.$month.textContent = date.monthName
        this.$year.textContent = date.year
    }

    public dispatch(type, data) {
        const event = new CustomEvent(type, { detail: data })
        this.dispatchEvent(event)
    }

    public valuechange() {
        this.dispatch(`valuechange`, this.Values || this.Value)
    }
}

if (!window.customElements.get(componentName)) {
    window.customElements.define(componentName, CalendarControls);
}
