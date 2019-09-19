// /**
//  * TODO - ability to add remove hh/mm/ss/ampm
//  * TODO - date range
//  * TODO - date data
//  */

// import Subject from '../../utils/subject'
// import { ToDate, DateToObject } from '../../utils/convert/date'
// import pipe from '../../utils/pipe'
// import { IfInvalid } from '../../utils/convert/if'
// import { CommasToArray } from '../../utils/convert/commas-to-array'
// import { ToObject } from '../../utils/convert/object'
// import ObserveEvent from '../../utils/observeEvent'

// import '../calendar-controls'
// import '../calendar-grid'
// import '../time-display'
// import { webComponentTemplate } from '../../utils/html'

// const template = require('./index.html')
// const style = require('./style.html')
// const componentName = `date-time`
// const componentRoot = `.date-time-container`

// const Properties = {
//     value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
//     values: val => pipe(CommasToArray, IfInvalid(null))(val).value,
//     dates: val => pipe(ToObject, IfInvalid({}))(val).value,
//     class: val => val
// }

// const operations = that => ({
//     value: () => {
//         that.populate()
//         that.valuechange()
//     },
//     values: () => {
//         that.populate()
//         that.valuechange()
//     },
//     dates: () => that.populate(),
//     class: val => {
//         const newClasses = !!val && typeof val === `string` ? val.split(` `).map(c => c.trim()) : []
//         const clss = that.$container.className.split(` `).map(c => c.trim())
//         const prev = !!that.state.class.previous && typeof that.state.class.previous === `string` ? that.state.class.previous.split(` `).map(c => c.trim()) : []

//         prev.forEach(c => {
//             const indexInClss = clss.indexOf(c)
//             if (newClasses.indexOf(c) === -1 && indexInClss > -1) {
//                 clss.splice(indexInClss, 1)
//             }
//         })

//         newClasses.forEach(c => {
//             if (clss.indexOf(c) === -1) {
//                 clss.push(c)
//             }
//         })

//         that.$container.className = clss.map(c => c.trim()).filter(c => !!c).join(` `)
//     }
// })

// export class DateTime extends HTMLElement {
//     public state: { [key: string]: Subject } = {}
//     public $container
//     public $calendar
//     public $calendarControls
//     public $timeDisplay
//     public calendarValue$
//     public calendarControlsValue$
//     public timeDisplayValue$

//     public get Value() {
//         return new Date(this.state.value.value)
//     }

//     public get Values() {
//         return Array.isArray(this.state.values.value) ? this.state.values.value.map(v => new Date(v)) : null
//     }

//     static get observedAttributes(): string[] { return Object.keys(Properties) }

//     constructor() {
//         super()

//         Object.keys(Properties).forEach((attrKey) => {
//             this.state[attrKey] = new Subject(Properties[attrKey](this[attrKey], this))

//             Object.defineProperty(this, attrKey, {
//                 get() {
//                     if (attrKey === `value`) {
//                         return this.Value
//                     }

//                     if (attrKey === `values`) {
//                         return this.Values
//                     }

//                     return this.state[attrKey].value
//                 },
//                 set(attrValue) {
//                     if (!this.state[attrKey]) { return }

//                     const formattedValue = Properties[attrKey](attrValue, this)

//                     if (this.state[attrKey].value !== formattedValue) {
//                         return this.state[attrKey].next(formattedValue)
//                     }
//                 }
//             })
//         })
//     }

//     public attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
//         if (newValue !== oldValue) {
//             this[attrName] = newValue
//         }
//     }

//     public connectedCallback() {
//         if (this.shadowRoot) { return }

//         const Operations = operations(this)

//         webComponentTemplate(componentName, template, this, style, componentRoot)

//         Object.keys(Properties)
//             .forEach(attrKey => {
//                 if (!Operations[attrKey]) { return }

//                 this.state[attrKey].subscribe(
//                     val => Operations[attrKey](val)
//                 )
//             })

//         this.setElements()
//         this.populate()
//     }

//     public disconnectedCallback() {
//         if (this.calendarValue$) { this.calendarValue$() }
//         if (this.calendarControlsValue$) { this.calendarControlsValue$() }
//         if (this.timeDisplayValue$) { this.timeDisplayValue$() }
//     }

//     public setElements() {
//         this.$container = this.shadowRoot.querySelector(`.date-time-container`)
//         this.$calendar = this.shadowRoot.querySelector(`calendar-grid`)
//         this.$calendarControls = this.shadowRoot.querySelector(`calendar-controls`)
//         this.$timeDisplay = this.shadowRoot.querySelector(`time-display`)

//         this.calendarControlsValue$ = ObserveEvent(this.$calendarControls, `valuechange`).subscribe(e => {
//             this[`value`] = e.detail
//         }, () => this.calendarControlsValue$(), () => this.calendarControlsValue$())

//         this.calendarValue$ = ObserveEvent(this.$calendar, `valuechange`).subscribe(e => {
//             this[`value`] = e.detail
//         }, () => this.calendarValue$(), () => this.calendarValue$())

//         this.timeDisplayValue$ = ObserveEvent(this.$timeDisplay, `valuechange`).subscribe(e => {
//             this[`value`] = e.detail
//         }, () => this.timeDisplayValue$(), () => this.timeDisplayValue$())
//     }

//     public populate() {
//         if (!this.$container) { return }

//         if (this.Values) {
//             const dates = this.Values.map(v => DateToObject(v).value.date)
//             this.$timeDisplay.values = dates
//             this.$calendar.values = dates
//             this.$calendarControls.values = dates
//         }

//         const date = DateToObject(this.Value || new Date()).value
//         this.$timeDisplay.value = date.date
//         this.$calendar.value = date.date
//         this.$calendarControls.value = date.date
//     }

//     public dispatch(type, data) {
//         const event = new CustomEvent(type, { detail: data })
//         this.dispatchEvent(event)
//     }

//     public valuechange() {
//         this.dispatch(`valuechange`, this.Values || this.Value)
//     }
// }

// if (!window.customElements.get(componentName)) {
//     window.customElements.define(componentName, DateTime);
// }
