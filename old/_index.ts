// import Subject from '../../utils/subject'
// import { observedAttributes, properties } from './properties'
// import { getValue, webComponentTemplate } from '../../utils/html'
// import { InputFieldParseValue, InputFieldSanitizeValue, InputFieldValueNull, InputFieldInputAttributes, isEmpty } from './_methods'
// import { ValidateHtml } from '../../utils/validate'
// import { InputFieldSubscriptionMethods } from './subscription-methods'

// import '../effect-bounce-z'
// import '../effect-ripple'
// import '../effect-underline'
// import '../icon-element'
// import '../overlay-content'
// import '../rotary-list'

// const template = require('./index.html')
// const style = require('./style.html')
// const componentName = `input-field`
// const componentRoot = `.input-field-container`
// const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" style="stroke:currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`

// const typesWithOptions = [`select`, `rotary`]
// const typesWithOverlay = [`select`, `datetime`]
// const isMobile = (typeof window.orientation !== "undefined") || (window.navigator.userAgent.indexOf('IEMobile') !== -1)

// // const Value = that => {
// //     that.processValue()

// //     const displayInput = that.$input
// //     let value = that.$hiddenInput.value



// //     // if (that.type === `select` && !isMobile && input && !isEmpty(input[`selectedValue`])) {
// //     //     return input[`selectedValue`]
// //     // }

// //     // if (!!that.format && !!input) {
// //     //     return getValue(input) || ``
// //     // }

// //     // if (!!that.processedValue && !isEmpty(that.processedValue.sanitized)) {
// //     //     return that.processedValue.sanitized
// //     // }

// //     // if (!!that.state.value && !isEmpty(that.state.value.value)) {
// //     //     return that.state.value.value
// //     // }

// //     // return getValue(input) || ``
// // }

// export class InputField extends HTMLElement {
//     public state: { [key: string]: Subject } = {}

//     public $bounceZ: HTMLElement
//     public $clearButton: HTMLElement
//     public $container: HTMLElement
//     public $count: HTMLElement
//     public $error: HTMLElement
//     public $help: HTMLElement
//     public $hiddenInput: HTMLInputElement
//     public $icon: HTMLElement
//     public $inputContainer: HTMLElement
//     public $label: HTMLElement
//     public $max: HTMLElement
//     public $options: HTMLElement
//     public $ripple: HTMLElement
//     public $underline: HTMLElement
//     public $rotary: any
//     public $datetime: any
//     public $checkIcon: any

//     public autocompleteSource
//     public processTimer
//     public focusTimer
//     public containerClassesTimer
//     public processedErrorText = ``
//     public root
//     public labelClass = `input-field-top-label`

//     public SubscriptionMethods = InputFieldSubscriptionMethods(this)

//     public get $input(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
//         if (!this.shadowRoot) { return }
//         return this.shadowRoot.querySelector(`.input-field-input-container .input-field-input`)
//     }

//     public get $labelContainer(): HTMLElement {
//         if (!this.shadowRoot) { return }
//         return this.shadowRoot.querySelector(`.input-field-label-${this[`labelposition`]}`)
//     }

//     public get $optionElements() {
//         if (!this.$options) {
//             return []
//         }

//         return Array.from(this.$options.querySelectorAll(`.input-field-option`))
//     }

//     public get selected() {
//         const selected = {
//             value: ``,
//             label: ``
//         }

//         const val = this.$input ? this.$input[`selectedValue`] : this[`value`]

//         if (this[`options`] && val !== ``) {
//             const option = this[`options`].filter(opt =>
//                 typeof opt.value === `number`
//                     ? opt.value === parseFloat(val)
//                     : opt.value === val)[0]

//             if (option) {
//                 selected.label = option.label
//                 selected.value = option.value
//             }
//         }

//         return selected
//     }

//     public get tag() {
//         return this[`inputType`] === `textarea`
//             ? `textarea`
//             : this[`type`] === `select` && isMobile
//                 ? `select`
//                 : `input`
//     }

//     public get selectFilter() {
//         const input = this.$input

//         if (this[`type`] === `select` && input && !isMobile) {
//             const val = getValue(input)
//             const emptyOption = this.$options.querySelector(`.input-field-option.blank`)

//             if (!!emptyOption && emptyOption.textContent === val) {
//                 return ``
//             }

//             return val || ``
//         }

//         return ``
//     }

//     static get observedAttributes(): string[] { return Object.keys(observedAttributes) }

//     constructor() {
//         super()
//         Object.keys(properties).forEach((attrKey) => {
//             this.state[attrKey] = new Subject(properties[attrKey](this[attrKey], this))

//             Object.defineProperty(this, attrKey, {
//                 get() {
//                     if (attrKey === `value`) {
//                         return this.$hiddenInput.value
//                     }

//                     return this.state[attrKey].value
//                 },
//                 set(attrValue) {
//                     if (!this.state[attrKey]) { return }

//                     const formattedValue = properties[attrKey](attrValue, this)

//                     if (this.state[attrKey].value !== formattedValue) {
//                         this.state[attrKey].next(formattedValue)
//                     }
//                 }
//             })
//         })
//     }

//     public attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
//         if (newValue !== oldValue) { this[attrName] = newValue }
//     }

//     public connectedCallback() {
//         this.setBindings()

//         if (!this.shadowRoot) {
//             webComponentTemplate(componentName, template, this, style, componentRoot)

//             this.setElements()
//             this.setInput()
//             this.setLabel()
//             this.setEffects()

//             Object.keys(properties).forEach((attrKey) => {
//                 if (this.SubscriptionMethods[attrKey]) {
//                     this.state[attrKey].subscribe(val => {
//                         this.SubscriptionMethods[attrKey](val)
//                     })
//                 }
//             })

//             this.processValue()

//             requestAnimationFrame(() => {
//                 this[`ready`] = true
//             })
//         }
//     }

//     public setBindings() {
//         this.onInput = this.onInput.bind(this)
//         this.onFocus = this.onFocus.bind(this)
//         this.onBlur = this.onBlur.bind(this)
//         this.onLabelClick = this.onLabelClick.bind(this)
//         this.onInvalid = this.onInvalid.bind(this)
//         this.onDone = this.onDone.bind(this)
//         this.clearInput = this.clearInput.bind(this)
//         this.onKeypress = this.onKeypress.bind(this)
//     }

//     public setElements() {
//         this.$bounceZ = this.shadowRoot.querySelector(`.input-field-input-container effect-bounce-z`)
//         this.$clearButton = this.shadowRoot.querySelector(`.input-field-clear`)
//         this.$container = this.shadowRoot.querySelector(`.input-field-container-inner`)
//         this.$count = this.shadowRoot.querySelector(`.input-field-character-count`)
//         this.$error = this.shadowRoot.querySelector(`.input-field-message-error`)
//         this.$help = this.shadowRoot.querySelector(`.input-field-message-help`)
//         this.$icon = this.shadowRoot.querySelector(`.input-field-icon`)
//         this.$inputContainer = this.shadowRoot.querySelector(`.input-field-input-container-inner`)
//         this.$label = this.shadowRoot.querySelector(`.input-field-container-inner label`)
//         this.$max = this.shadowRoot.querySelector(`.input-field-character-count-max`)
//         this.$options = this.shadowRoot.querySelector(`overlay-content`)
//         this.$ripple = this.shadowRoot.querySelector(`.input-field-input-container effect-ripple`)
//         this.$underline = this.shadowRoot.querySelector(`.input-field-input-container effect-underline`)
//         this.$checkIcon = this.shadowRoot.querySelector(`.input-field-checkbox-icon`)

//         this.$clearButton.addEventListener(`click`, this.clearInput)
//         this.$checkIcon.svg = checkIcon
//     }

//     public setEffects() {
//         requestAnimationFrame(() => {
//             this.$bounceZ[`targets`] = [this.shadowRoot.querySelector(`.input-field-input-container`)]
//             this.$options[`targets`] = this.$ripple[`targets`] = this.$underline[`targets`] = [this.$input]
//             this.$options[`target`] = this.$input
//         })
//     }

//     public addRemoveInputAttr(input, attr) {

//         if (attr === `class`) {
//             return input.className = `input-field-input`
//         }

//         if (attr === `type`) {
//             if (this[`inputType`] === `textarea`) { return }

//             if ([`radio`, `checkbox`, `password`].indexOf(this[`inputType`]) > -1) {
//                 return input.setAttribute(attr, this[`inputType`])
//             }

//             return input.setAttribute(attr, `text`)
//         }

//         if (attr === `value`) {
//             if (this[`type`] === `select` && !isMobile) {
//                 const selected = this.selected
//                 input.value = selected.label
//                 input[`selectedValue`] = selected.value
//                 return this.processValue()
//             }

//             return input.setAttribute(attr, this[`value`])
//         }

//         if (!!this[attr]) {
//             input.setAttribute(attr, this[attr])
//         } else {
//             input.removeAttribute(attr)
//         }
//     }

//     public setInputAttrs(input) {
//         const attrs = [`radio`, `checkbox`].indexOf(this[`inputType`]) > -1
//             ? InputFieldInputAttributes.bool
//             : InputFieldInputAttributes.all

//         attrs.forEach(attr => this.addRemoveInputAttr(input, attr))
//     }

//     public setInput() {
//         if (!this.$inputContainer) { return }

//         if (this.$input && this.$input.tagName.toLowerCase() === this.tag && this[`type`] !== `rotary`) {
//             return this.setInputAttrs(this.$input)
//         }

//         this.$inputContainer.innerHTML = ``

//         const input = document.createElement(this.tag)

//         this.setInputAttrs(input)
//         this.$inputContainer.appendChild(input)
//         this.setRotary()
//         this.setDateTime()
//         this.setOptions()
//         this.setEffects()

//         input.addEventListener(`input`, this.onInput)
//         input.addEventListener(`focus`, this.onFocus)
//         input.addEventListener(`blur`, this.onBlur)
//         // input.addEventListener(`keypress`, this.onKeypress)
//         input.addEventListener(`keydown`, this.onKeypress)
//     }

//     public setDateTime() {
//         if (this[`type`] !== `datetime`) { return }

//         this.$datetime = document.createElement(`date-time`) as any
//         this.$datetime.value = this[`value`]
//         this.$options.innerHTML = ``
//         this.$options.appendChild(this.$datetime)
//     }

//     public setRotary() {
//         if (this[`type`] !== `rotary`) { return }

//         this.$rotary = document.createElement(`rotary-list`) as any
//         this.$rotary.setAttribute(`lines`, `2`)
//         this.$rotary.setAttribute(`spacing`, `1.35`)
//         this.$rotary[`options`] = this[`options`]
//         this.$rotary[`value`] = this[`value`]
//         this.$rotary[`disablefilter`] = this[`disablefilter`]
//         this.$inputContainer.insertBefore(this.$rotary, this.$input)

//         this.$input.addEventListener(`keydown`, e => {
//             if (e.which === 38) {
//                 e.preventDefault()
//                 this.$rotary.previous()
//             } else if (e.which === 40) {
//                 e.preventDefault()
//                 this.$rotary.next()
//             } else if (e.which === 9) {
//                 e.preventDefault()
//                 this.$input.value = this.$rotary.value
//             }
//         })

//         this.$rotary.addEventListener(`valuechange`, e => {
//             this.$input.value = e.detail
//         })
//     }

//     public setNativeOptions() {
//         const options = this[`options`]
//         const input = this.$input
//         input.innerHTML = ``

//         const createOption = option => {
//             const optionElement = document.createElement(`option`)
//             optionElement[`value`] = option.value
//             optionElement.textContent = option.label
//             input.appendChild(optionElement)
//         }

//         if (this[`emptySelect`] !== false) {
//             createOption({
//                 value: ``,
//                 label: this[`emptySelect`]
//             })
//         }

//         options.forEach(option => createOption(option))
//     }

//     public setOptions() {
//         if (typesWithOptions.indexOf(this[`type`]) === -1) { return }

//         this.$options.innerHTML = ``

//         const options = this[`options`]

//         if (!options || !options.length) {
//             return
//         }

//         if (this[`type`] === `select` && isMobile) { return this.setNativeOptions() }

//         if (this[`type`] === `rotary` && this.$rotary) {
//             this.$rotary[`options`] = this[`options`]
//             this.$rotary[`value`] = this[`value`]
//             return
//         }

//         const createOption = option => {
//             const input = this.$input
//             const optionElement = document.createElement(`div`)
//             optionElement.className = `input-field-option${!!option.class ? ` ${option.class}` : ``}`
//             optionElement[`value`] = option.value
//             optionElement.innerHTML = ValidateHtml(option.label, [], [`script`]).sanitized || ``
//             this.$options.appendChild(optionElement)

//             /** TODO - look for class change to selected and scrollto */

//             optionElement.addEventListener(`mousedown`, () => {
//                 input.value = ValidateHtml(option.label, [], [`script`]).sanitized
//                 input[`selectedValue`] = option.value
//                 this.processValue()
//             })

//             if (this.selected.value === option.value) {
//                 optionElement.dispatchEvent(new Event(`mousedown`))
//                 optionElement.click()
//             }
//         }

//         if (this[`emptySelect`] !== false) {
//             createOption({
//                 value: ``,
//                 label: this[`emptySelect`],
//                 class: 'blank'
//             })
//         }

//         options.forEach(option => createOption(option))
//     }

//     public setLabel() {
//         const removeLabels = () => {
//             if (this.$label && this.$label.parentNode) {
//                 this.$label.parentNode.removeChild(this.$label)
//                 removeLabels()
//             }
//         }

//         removeLabels()

//         const labelContainer = this.$labelContainer

//         if (labelContainer) {
//             labelContainer.innerHTML = ``
//             const label = document.createElement(`label`)
//             label.className = `input-field-${this[`labelposition`]}-label`
//             label.innerHTML = ValidateHtml(this[`label`], [], [`script`]).sanitized || ``
//             label.addEventListener(`click`, this.onLabelClick)
//             labelContainer.appendChild(label)
//         }

//         this.$label = labelContainer.querySelector(`label`)
//     }

//     public setCount() {
//         if (!this.$count) { return }
//         this.$count.innerHTML = ``
//         this.$count.textContent = this[`count`] || ``
//     }

//     public setMax(value) {
//         if (!this.$max) { return }
//         this.$max.innerHTML = ``
//         this.$max.textContent = value || ``
//     }

//     public setIcon() {
//         if (!this.$icon) { return }
//         this.$icon[`type`] = this[`icon`]
//     }

//     public setClearButton() {
//         if (!this.$clearButton) { return }
//         this.$clearButton[`type`] = this[`clearbutton`]
//     }

//     public dispatch(type, data?) {
//         const event = new CustomEvent(type, { detail: data || this.state })
//         this.dispatchEvent(event)
//     }

//     public onInput() {
//         this.processValue()
//         this.dispatch(`input`)
//     }

//     public onFocus() {
//         cancelAnimationFrame(this.focusTimer)

//         this[`focused`] = true

//         if (this[`type`] !== `checkbox` && this[`type`] !== `radio`) {
//             this.processValue()
//         }

//         if (this[`type`] === `select` && !isMobile) { this.$input.value = `` }
//         if (typesWithOverlay.indexOf(this[`type`]) !== -1) { this.$options[`show`]() }

//         this.dispatch(`focus`)

//         this.checkVisibility(this.$input as any)
//     }

//     public onBlur() {
//         cancelAnimationFrame(this.focusTimer)

//         if (this[`type`] === `select` && !isMobile) {
//             this.$input.value = this.selected.label || ``
//         }

//         if (this[`type`] === `rotary` && this.$rotary) {
//             this.$input.value = this.$rotary.value
//         }

//         this[`focused`] = false
//         this.processValue()
//         this.dispatch(`blur`)
//         this.$options[`hide`]()
//     }

//     public onKeypress(e) {
//         if (e.key && this[`type`] === `select` && (e.key.toLowerCase() === `arrowup` || e.key.toLowerCase() === `arrowdown`)) {
//             e.preventDefault()
//             const $options = this.$optionElements.filter(o => !o.classList.contains(`filtered-out`))
//             let $previous
//             let $next
//             let $newSelected

//             for (let i = 0; i < $options.length; i++) {
//                 const $option = $options[i] as any
//                 if ($option.classList.contains(`selected`)) {
//                     $previous = $options[i - 1] ? $options[i - 1] : $options[i]
//                     $next = $options[i + 1] ? $options[i + 1] : $options[i]
//                 }

//                 $option.classList.remove(`selected`)
//             }

//             if (!$previous && !$next) {
//                 $previous = $next = $options[0]
//             }

//             if (e.key.toLowerCase() === `arrowup`) {
//                 $newSelected = $previous
//             } else if (e.key.toLowerCase() === `arrowdown`) {
//                 $newSelected = $next
//             }

//             if ($newSelected && !$newSelected.classList.contains(`selected`)) {
//                 $newSelected.classList.add(`selected`)
//                 const optionBox = $newSelected.getBoundingClientRect()
//                 const containerPosition = (this.$options as any).position
//                 const optionTop = optionBox.top - containerPosition.top
//                 const optionBottom = optionBox.height + optionTop

//                 if (optionBottom > containerPosition.height) {
//                     (this.$options as any).scrollContent(0, containerPosition.scrollTop + (optionBottom - containerPosition.height))
//                 }

//                 if (optionTop < 0) {
//                     (this.$options as any).scrollContent(0, containerPosition.scrollTop + optionTop)
//                 }

//                 const blank = this.$options.querySelector(`.blank`)
//                 if (blank && blank.classList.contains(`selected`)) {
//                     blank.classList.remove(`selected`)
//                 }
//             }
//         }

//         if (e.key && e.key.toLowerCase() === `enter`) {
//             if (this[`type`] === `select`) {
//                 const $selected = this.$options.querySelector(`.input-field-option.selected`) as any
//                 if ($selected) {
//                     $selected.dispatchEvent(new Event(`mousedown`))
//                     this.$input.blur()
//                 }
//             }
//             return this.onDone()
//         }
//     }

//     public onLabelClick(e) {
//         if (!this.$input) { return }

//         this.dispatch(`labelClick`)

//         if (this[`type`] === `checkbox` || this[`type`] === `radio`) {
//             const input = this.$input as HTMLInputElement

//             if (this.$bounceZ) {
//                 const bounce = this.$bounceZ as any
//                 bounce.trigger()
//             }

//             if (this.$ripple) {
//                 const ripple = this.$ripple as any
//                 ripple.trigger(e)
//             }

//             input.checked = !this[`value`]
//         } else {
//             this.$input.focus()
//         }
//     }

//     public onInvalid() {
//         if (!this.$input) { return }

//         this.dispatch(`invalid`, {
//             processedValue: this[`processedValue`],
//             value: this[`value`],
//             errortext: this[`errortext`]
//         })
//     }

//     public onDone() {
//         if (!this.$input) { return }

//         this.dispatch(`done`, {
//             processedValue: this[`processedValue`],
//             value: this[`value`],
//             valid: !this[`invalid`],
//             errortext: this[`errortext`]
//         })
//     }

//     public clearInput() {
//         if (!this.$input) { return }
//         this.$input.value = null
//         this.processValue()
//     }

//     public select(val) {
//         if (typesWithOptions.indexOf(this[`type`]) === -1) {
//             this[`value`] = val
//             return
//         }

//         if (!this[`options`]) { return }

//         const $options = this.$optionElements

//         for (let i = 0; i < $options.length; i++) {
//             const $option = $options[i] as any
//             if ($option.value === val && !$option.classList.contains(`blank`)) {
//                 return $option.dispatchEvent(new Event(`mousedown`))
//             }
//         }
//     }

//     /** TODO MOVE TO OVERLAY COMPONENT */
//     public checkVisibility(input: HTMLInputElement) {
//         cancelAnimationFrame(this.focusTimer)

//         this.focusTimer = requestAnimationFrame(() => {
//             const inputBox = input.getBoundingClientRect()

//             if (inputBox.top - 10 > window.innerHeight || inputBox.bottom + 10 < 0) {
//                 return input.blur()
//             }

//             this.checkVisibility(input)
//         })
//     }

//     public updateContainerClasses() {
//         clearTimeout(this.containerClassesTimer)

//         this.containerClassesTimer = setTimeout(() => {
//             this[`containerClasses`] = {
//                 clearbutton: !!this[`clearbutton`],
//                 disabled: !!this[`disabled`],
//                 focused: !!this[`focused`],
//                 icon: !!this[`icon`],
//                 invalid: !!this[`invalid`],
//                 notempty: !!this[`notempty`],
//                 ready: !!this[`ready`],
//                 showcount: !!this[`showcount`],
//                 max: !!this[`max`],
//                 maxlength: !!this[`maxlength`],
//                 hidefilteredout: !!this[`hideonfilter`]
//             }
//         }, 33)
//     }

//     public processValue() {
//         const input = this.$input

//         if (!input) { return }

//         const parsed = this[`type`] !== `select` || isMobile ? InputFieldParseValue(getValue(input), this[`type`]) : this.selected.value

//         this[`processedValue`] =
//             isEmpty(parsed)
//                 ? InputFieldValueNull()
//                 : InputFieldSanitizeValue(
//                     parsed,
//                     this[`type`],
//                     this[`allowhtml`],
//                     this[`disallowhtml`]
//                 )
//     }
// }

// if (!window.customElements.get(componentName)) {
//     window.customElements.define(componentName, InputField);
// }



// /** TODO ============
//  *
//  * DROPDOWN
//  *  TODO - check if bottom will fit
//  *  TODO - if not switch to top
//  *  TODO - filter options by typing

//  * COLOR PICKER
//  *
//  * validate
//  *  - date
//  *      - full date
//  *      - time
//  *      - year
//  *      - month
//  *      - week
//  *  - color
//  *  - url
//  *  - telephone
//  *  - bool
//  *
//  * themes
//  *  - lifted
//  *  - background color
//  *  - border color
//  *  - icon color
//  *  - error color
//  *  - error size
//  *  - fx color
//  *  - help color
//  *  - help size
//  *
//  * different types
//  *  - confirmpassword
//  *  - time
//  *  - date
//  *  - color
//  */
