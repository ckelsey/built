import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { ToDate } from '../../utils/convert/date'
import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToBool } from '../../utils/convert/bool'

const Properties = {
    value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
    readonly: val => pipe(ToBool, IfInvalid(true))(val).value,
}

const operations = that => ({
    value: () => {
        that.populate(that.lastPopulate)
        that.valuechange()
    },
    readonly: () => that.populate(that[`value`]),
})

class TimeDisplay extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public lastPopulate

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
        const Template = document.createElement(`template`)
        Template.innerHTML = `${style}${template}`

        const clone = document.importNode(Template.content, true)
        this.attachShadow({ mode: 'open' }).appendChild(clone)

        Object.keys(Properties)
            .forEach(attrKey => {
                if (!Operations[attrKey]) { return }

                this.state[attrKey].subscribe(
                    val => Operations[attrKey](val)
                )
            })

        this.setElements()
        // this.populate(new Date(this[`value`]))
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.time-display-inner`)
    }

    public timeToObject(value: Date) {
        console.log(value)
        // const hour = value.getHours() > 12 ? value.getHours() - 12 : value.getHours()
        // return {
        //     year: value.getFullYear(),
        //     yearShort: value.getFullYear().toString().slice(-2),
        //     month: value.getMonth() + 1,
        //     monthDouble: `0${value.getMonth() + 1}`.slice(-2),
        //     monthName: value.toLocaleString('default', { month: 'long' }),
        //     monthNameShort: value.toLocaleString('default', { month: 'short' }),
        //     day: value.getDate(),
        //     dayDouble: `0${value.getDate()}`.slice(-2),
        //     dayOfWeek: value.toLocaleString('default', { weekday: 'long' }),
        //     dayOfWeekShort: value.toLocaleString('default', { weekday: 'short' }),
        //     dayIndex: value.getDay(),
        //     hour24: value.getHours(),
        //     hour,
        //     hourDouble: `0${hour}`.slice(-2),
        //     minutes: value.getMinutes(),
        //     minutesDouble: `0${value.getMinutes()}`.slice(-2),
        //     seconds: value.getSeconds(),
        //     secondsDouble: `0${value.getSeconds()}`.slice(-2),
        //     milliseconds: value.getMilliseconds(),
        //     ampm: value.getHours() > 11 ? `PM` : `AM`,
        //     date: value,
        //     outOfRange
        // }
    }

    public populate(time) {

        if (!this.$container) { return }

        if (!time) {
            time = new Date()
        }

        this.lastPopulate = time
    }

    public dispatch(type, data) {
        const event = new CustomEvent(type, { detail: data })
        this.dispatchEvent(event)
    }

    public dateenter(d) {
        this.dispatch(`dateenter`, d)
    }

    public dateleave(d) {
        this.dispatch(`dateleave`, d)
    }

    public dateclick(d) {
        this.dispatch(`dateclick`, d)
    }

    public valuechange() {
        this.dispatch(`valuechange`, this.Values || this.Value)
    }
}

window.customElements.define(`time-display`, TimeDisplay)

export default TimeDisplay
