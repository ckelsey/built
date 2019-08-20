import Subject from '../../utils/subject'
import { ToDate, DateToObject, MonthData } from '../../utils/convert/date'
import pipe from '../../utils/pipe'
import { IfInvalid } from '../../utils/convert/if'
import { ToBool } from '../../utils/convert/bool'
import { CommasToArray } from '../../utils/convert/commas-to-array'
import { ToObject } from '../../utils/convert/object'

import '../effect-bounce-z'
import '../effect-ripple'
import { webComponentTemplate } from '../../utils/html'

const template = require('./index.html')
const style = require('./style.html')
const componentName = `calendar-grid`
const componentRoot = `.calendar-container`

const Properties = {
    value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
    clickable: val => pipe(ToBool, IfInvalid(true))(val).value,
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
    clickable: () => that.populate(),
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

export class CalendarGrid extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public $containerInner

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
        this.$container = this.shadowRoot.querySelector(`.calendar-container`)
        this.$containerInner = this.shadowRoot.querySelector(`.calendar-inner`)

        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + -(currentDate.getDay()))

        Array.from(this.shadowRoot.querySelectorAll(`.calendar-day-of-week`))
            .forEach((el: HTMLElement, i) => el.textContent = new Date(
                new Date().setDate(currentDate.getDate() + i)
            ).toLocaleString(navigator.language, { weekday: `narrow` }))
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

    public populate() {

        if (!this.$container) { return }

        const date = this.Values ? this.Values[0] : this.Value ? this.Value : new Date()

        if (this[`clickable`]) {
            this.$containerInner.classList.add(`clickable`)
        } else {
            this.$containerInner.classList.remove(`clickable`)
        }

        this.$containerInner.innerHTML = ``

        const currentFirst = DateToObject(this.Values ? this.Values[0] : this.Value).value
        let currentLast = this.Values && this.Values[1] ? DateToObject(this.Values[1]).value : null

        MonthData(date).value.forEach(d => {
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
            if (isInRange) { classes.push(`in-range`) }

            dayElementContainer.className = classes.join(` `)
            dayElementContainer.date = d
            dayElementContainer.setAttribute('day', d.day)
            dayElementContainer.setAttribute('month', d.month)
            dayElementContainer.setAttribute('year', d.year)

            const dayElement = document.createElement(`div`)
            dayElement.className = `calendar-day`
            dayElement.textContent = d.day

            this.$containerInner.appendChild(dayElementContainer)
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

            if (!this[`clickable`]) {
                this.$containerInner.style.removeProperty(`overflow`)
                if (isCurrent) { dayElementContainer.classList.add(`current`) }
                return
            }

            dayElementContainer.tabIndex = -1

            if (isCurrent) {
                const ripple = document.createElement(`effect-ripple`) as any
                ripple.start = `focus`
                ripple.end = `blur`
                ripple.speed = 200
                ripple.opacity = 0.5
                ripple.targets = [dayElementContainer]

                const bounce = document.createElement(`effect-bounce-z`) as any
                bounce.start = `focus`
                bounce.speed = 125
                bounce.amount = -3
                bounce.targets = [dayElementContainer]

                dayElementContainer.appendChild(ripple)
                dayElementContainer.appendChild(bounce)
                dayElementContainer.focus()

                requestAnimationFrame(() => {
                    dayElementContainer.classList.add(`current`)
                    dayElementContainer.blur()

                    setTimeout(() => {
                        dayElementContainer.removeChild(ripple)
                        dayElementContainer.removeChild(bounce)
                    }, 200)
                })
            }

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

if (!window.customElements.get(componentName)) {
    window.customElements.define(componentName, CalendarGrid);
}
