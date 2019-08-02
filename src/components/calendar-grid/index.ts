import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { ToDate } from '../../utils/convert/date'
import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToBool } from '../../utils/convert/bool'
import { CommasToArray } from '../../utils/convert/commas-to-array'
import { ToObject } from '../../utils/convert/object'

const Properties = {
    value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
    clickable: val => pipe(ToBool, IfInvalid(true))(val).value,
    values: val => pipe(CommasToArray, IfInvalid(null))(val).value,
    dates: val => pipe(ToObject, IfInvalid({}))(val).value
}

const operations = that => ({
    value: () => {
        that.populate(that.lastPopulate)
        that.valuechange()
    },
    values: () => {
        that.populate(that.lastPopulate)
        that.valuechange()
    },
    clickable: () => that.populate(that[`value`]),
    dates: () => that.populate(that[`value`]),
})

class CalendarGrid extends HTMLElement {
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
        // const Operations = {}
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
        this.populate(this.Values ? this.Values[0] : this.Value)
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.calendar-inner`)
    }

    public dateToObject(value: Date, outOfRange = false) {
        const hour = value.getHours() > 12 ? value.getHours() - 12 : value.getHours()
        return {
            year: value.getFullYear(),
            yearShort: value.getFullYear().toString().slice(-2),
            monthIndex: value.getMonth(),
            month: value.getMonth() + 1,
            monthDouble: `0${value.getMonth() + 1}`.slice(-2),
            monthName: value.toLocaleString(undefined, { month: 'long' }),
            monthNameShort: value.toLocaleString(undefined, { month: 'short' }),
            day: value.getDate(),
            dayDouble: `0${value.getDate()}`.slice(-2),
            dayOfWeek: value.toLocaleString(undefined, { weekday: 'long' }),
            dayOfWeekShort: value.toLocaleString(undefined, { weekday: 'short' }),
            dayIndex: value.getDay(),
            hour24: value.getHours(),
            hour,
            hourDouble: `0${hour}`.slice(-2),
            minutes: value.getMinutes(),
            minutesDouble: `0${value.getMinutes()}`.slice(-2),
            seconds: value.getSeconds(),
            secondsDouble: `0${value.getSeconds()}`.slice(-2),
            milliseconds: value.getMilliseconds(),
            ampm: value.getHours() > 11 ? `PM` : `AM`,
            date: value,
            outOfRange
        }
    }

    public firstOfMonth(date) {
        return this.dateToObject(new Date(date.getFullYear(), date.getMonth(), 1))
    }

    public lastOfMonth(date) {
        return this.dateToObject(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    }

    public monthData(date) {
        const first = this.firstOfMonth(date)
        const last = this.lastOfMonth(date)

        let startIndex = first.dayIndex
        const bufferStart = []

        while (startIndex) {
            bufferStart.push(
                this.dateToObject(
                    new Date(
                        first.year,
                        first.monthIndex,
                        1 - startIndex
                    ),
                    true
                )
            )
            startIndex = startIndex - 1
        }

        let endIndex = 6 - last.dayIndex
        const bufferEnd = []

        while (endIndex) {
            bufferEnd.push(
                this.dateToObject(
                    new Date(
                        last.year,
                        last.monthIndex,
                        last.day + (7 - (endIndex + last.dayIndex))
                    ),
                    true
                )
            )
            endIndex = endIndex - 1
        }

        let daysArray = [].concat(bufferStart.slice())
        let dayIndex = 0

        while (dayIndex < last.day) {
            daysArray.push(
                this.dateToObject(
                    new Date(
                        first.year,
                        first.monthIndex,
                        first.day + dayIndex
                    )
                )
            )
            dayIndex = dayIndex + 1
        }

        daysArray = daysArray.concat(bufferEnd.slice())

        return daysArray
    }

    public getDateData(d) {
        if (this[`dates`]) {
            let year = this[`dates`][d.year] || this[`dates`][d.year.toString()]

            if (year) {
                const month = year[d.month] || year[d.month.toString()]

                if (month) {
                    const day = month[d.day] || month[d.day.toString()]

                    if (day) { return day }
                }
            }
        }

        return []
    }

    public populate(date) {

        if (!this.$container) { return }
        if (!date) { date = new Date() }

        this.lastPopulate = date

        if (this[`clickable`]) {
            this.$container.classList.add(`clickable`)
        } else {
            this.$container.classList.remove(`clickable`)
        }

        this.$container.innerHTML = ``

        const currentFirst = this.dateToObject(this.Values ? this.Values[0] : this.Value)
        let currentLast = this.Values && this.Values[1] ? this.dateToObject(this.Values[1]) : null

        this.monthData(date).forEach(d => {
            const basicMatch = compare => {
                return !compare ? false : d.month === compare.month && d.year === compare.year
            }

            const sameDay = d.day === currentFirst.day || (!!currentLast && d.day === currentLast.day)
            const isCurrent = sameDay && (basicMatch(currentFirst) || basicMatch(currentLast))
            const isInRange = !currentLast
                ? false
                : basicMatch(currentFirst) || basicMatch(currentLast)
                    ? d.day > currentFirst.day && d.day < currentLast.day
                        ? true
                        : false
                    : false

            const dateDataContainer = document.createElement(`div`)
            dateDataContainer.className = `calendar-day-data-container`

            const dayElementContainer = document.createElement(`div`) as any
            const classes = [`calendar-day-container`]

            if (d.outOfRange) { classes.push(`out-of-range`) }
            if (isCurrent) { classes.push(`current`) }
            if (isInRange) { classes.push(`in-range`) }

            dayElementContainer.className = classes.join(` `)
            dayElementContainer.date = d
            dayElementContainer.setAttribute('day', d.day)
            dayElementContainer.setAttribute('month', d.month)
            dayElementContainer.setAttribute('year', d.year)

            const dayElement = document.createElement(`div`)
            dayElement.className = `calendar-day`
            dayElement.textContent = d.day

            this.$container.appendChild(dayElementContainer)
            dayElementContainer.appendChild(dayElement)

            const dateData = this.getDateData(d)

            if (dateData) {
                dateData.forEach(dd => {
                    const ddElement = document.createElement(`div`)
                    ddElement.className = `calendar-day-data-item`
                    dateDataContainer.appendChild(ddElement)

                    ddElement.addEventListener(`mouseover`, () => {
                        this.dateenter(dd)
                    })
                    ddElement.addEventListener(`mouseleave`, () => {
                        this.dateleave(dd)
                    })
                    ddElement.addEventListener(`click`, e => {
                        e.preventDefault()
                        e.stopPropagation()
                        this.dateclick(dd)
                    })
                })
            }

            dayElement.appendChild(dateDataContainer)

            if (!this[`clickable`]) { return }

            dayElementContainer.addEventListener(`click`, () => {
                if (Array.isArray(this.Values)) {
                    if (this.Values[1]) {
                        this[`values`] = [dayElementContainer.date.date]
                    } else {
                        if (currentFirst.day >= dayElementContainer.date.day) {
                            this[`values`] = [dayElementContainer.date.date]
                        } else {
                            this[`values`] = [this.Values.slice(0, 1), dayElementContainer.date.date]
                        }
                    }
                } else {
                    this[`value`] = dayElementContainer.date.date
                }
            })
        })
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

window.customElements.define(`calendar-grid`, CalendarGrid)

export default CalendarGrid
