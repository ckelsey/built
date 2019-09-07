// import Subject from '../../utils/subject'
// import { ToDate, DateToObject } from '../../utils/convert/date'
// import pipe from '../../utils/pipe'
// import { IfInvalid } from '../../utils/convert/if'
// import { ToBool } from '../../utils/convert/bool'
// import { CommasToArray } from '../../utils/convert/commas-to-array'

// import '../rotary-list'
// import { webComponentTemplate } from '../../utils/html'

// const template = require('./index.html')
// const style = require('./style.html')
// const componentName = `time-display`
// const componentRoot = `.time-display-container`

// const Properties = {
//     value: val => pipe(ToDate, IfInvalid(new Date()))(val).value.getTime(),
//     values: val => pipe(CommasToArray, IfInvalid(null))(val).value,
//     readonly: val => pipe(ToBool, IfInvalid(true))(val).value,
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
//     readonly: () => that.populate(),
//     class: (that, val) => {
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

// export class TimeDisplay extends HTMLElement {
//     public state: { [key: string]: Subject } = {}
//     public $container
//     public $containerInner
//     public $hours
//     public $minutes
//     public $seconds
//     public $ampm

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

//     public setElements() {
//         this.$container = this.shadowRoot.querySelector(`.time-display-container`)
//         this.$containerInner = this.shadowRoot.querySelector(`.time-display-inner`)
//         this.$hours = this.shadowRoot.querySelector(`.time-display-hours`)
//         this.$minutes = this.shadowRoot.querySelector(`.time-display-minutes`)
//         this.$seconds = this.shadowRoot.querySelector(`.time-display-seconds`)
//         this.$ampm = this.shadowRoot.querySelector(`.time-display-ampm`)

//         const inputStyles = document.createElement(`style`)
//         inputStyles.appendChild(document.createTextNode(`.input-field-container-inner[input-kind=rotary] .input-field-input-container input{padding:1em 0.25em;}`))

//         this.$hours.shadowRoot.appendChild(inputStyles.cloneNode(true))
//         this.$minutes.shadowRoot.appendChild(inputStyles.cloneNode(true))
//         this.$seconds.shadowRoot.appendChild(inputStyles.cloneNode(true))
//         this.$ampm.shadowRoot.appendChild(inputStyles.cloneNode(true))

//         const am = DateToObject(new Date(new Date().setHours(1))).value.ampm
//         const pm = DateToObject(new Date(new Date().setHours(13))).value.ampm
//         const secondOptions = []
//         const minuteOptions = []
//         const hourOptions = []
//         let i = 0

//         while (i < 60) {
//             secondOptions.push(`0${i}`.slice(-2))
//             minuteOptions.push(`0${i}`.slice(-2))
//             if (i < 12) {
//                 hourOptions.push(`0${i + 1}`.slice(-2))
//             }
//             i = i + 1
//         }

//         this.$hours.options = hourOptions
//         this.$minutes.options = minuteOptions
//         this.$seconds.options = secondOptions
//         this.$ampm.options = [am, pm]
//     }

//     public populate() {

//         if (!this.$containerInner) { return }

//         if (this[`readonly`]) {
//             this.$containerInner.classList.add(`readonly`)
//         } else {
//             this.$containerInner.classList.remove(`readonly`)
//         }

//         const date = DateToObject(this.Value || new Date()).value
//         this.$hours.value = date.hourDouble
//         this.$minutes.value = date.minutesDouble
//         this.$seconds.value = date.secondsDouble
//         this.$ampm.value = date.ampm
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
//     window.customElements.define(componentName, TimeDisplay)
// }