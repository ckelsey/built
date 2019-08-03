import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { observedAttributes, AllProperties } from './attributes'
import { getValue, getCSSFromSelector } from '../../utils/html'
import { InputFieldParseValue, InputFieldSanitizeValue, InputFieldValueNull, InputFieldInputAttributes, isEmpty } from './methods'
import { ValidateHtml } from '../../utils/validate'
import { InputFieldSubscriptionMethods } from './subscription-methods'

import '../effect-bounce-z'
import '../effect-ripple'
import '../effect-underline'
import '../icon-element'
import '../overlay-content'
import '../rotary-list'

export class InputField extends HTMLElement {
    public state: { [key: string]: Subject } = {}

    public $bounceZ: HTMLElement
    public $clearButton: HTMLElement
    public $container: HTMLElement
    public $count: HTMLElement
    public $error: HTMLElement
    public $help: HTMLElement
    public $hiddenInput: HTMLInputElement
    public $icon: HTMLElement
    public $inputContainer: HTMLElement
    public $label: HTMLElement
    public $max: HTMLElement
    public $options: HTMLElement
    public $ripple: HTMLElement
    public $underline: HTMLElement

    public autocompleteSource
    public processTimer
    public focusTimer
    public containerClassesTimer
    public processedErrorText = ``
    public root
    public labelClass = `input-field-top-label`

    public SubscriptionMethods = InputFieldSubscriptionMethods(this)

    public get $input(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
        if (!this.shadowRoot) { return }
        return this.shadowRoot.querySelector(`.input-field-input-container .input-field-input`)
    }

    public get $labelContainer(): HTMLElement {
        if (!this.shadowRoot) { return }
        return this.shadowRoot.querySelector(`.input-field-label-${this[`labelposition`]}`)
    }

    public get $optionElements() {
        if (!this.$options) {
            return []
        }

        return Array.from(this.$options.querySelectorAll(`.input-field-option`))
    }

    public get selected() {
        const selected = {
            value: ``,
            label: ``
        }

        const val = this.$input ? this.$input[`selectedValue`] : this.Value

        if (this[`options`] && val !== ``) {
            const option = this[`options`].filter(opt =>
                typeof opt.value === `number`
                    ? opt.value === parseFloat(val)
                    : opt.value === val)[0]

            if (option) {
                selected.label = option.label
                selected.value = option.value
            }
        }

        return selected
    }

    public get tag() {
        return this[`inputType`] === `textarea`
            ? `textarea`
            : `input`
    }

    public get Value() {
        const input = this.$input
        if (this[`type`] === `select` && input && !isEmpty(input[`selectedValue`])) {
            return input[`selectedValue`]
        }

        if (!!this[`processedValue`] && !isEmpty(this[`processedValue`].sanitized)) {
            return this[`processedValue`].sanitized
        }

        if (!!this.state.value && !isEmpty(this.state.value.value)) {
            return this.state.value.value
        }

        if (!!input) {
            return getValue(input) || ``
        }

        return ``
    }

    public get selectFilter() {
        const input = this.$input

        if (this[`type`] === `select` && input) {
            return getValue(input)
        }

        return
    }

    static get observedAttributes(): string[] { return Object.keys(observedAttributes) }

    constructor() {
        super()
        Object.keys(AllProperties).forEach((attrKey) => {
            this.state[attrKey] = new Subject(AllProperties[attrKey](this[attrKey], this))

            Object.defineProperty(this, attrKey, {
                get() {
                    if (attrKey === `value`) {
                        return this.Value
                    }

                    return this.state[attrKey].value
                },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = AllProperties[attrKey](attrValue, this)

                    if (this.state[attrKey].value !== formattedValue) {
                        this.state[attrKey].next(formattedValue)
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
        this.onInput = this.onInput.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onLabelClick = this.onLabelClick.bind(this)
        this.clearInput = this.clearInput.bind(this)

        if (!this.shadowRoot) {
            const css = getCSSFromSelector(`.input-field-container`).join(` `)
            const Template = document.createElement(`template`)
            Template.innerHTML = `${style.split(`</style>`)[0]}${css}</style>${template}`

            const clone = document.importNode(Template.content, true)
            this.attachShadow({ mode: 'open' }).appendChild(clone)

            this.setElements()
            this.setInput()
            this.setLabel()
            this.setEffects()

            Object.keys(AllProperties).forEach((attrKey) => {
                if (this.SubscriptionMethods[attrKey]) {
                    this.state[attrKey].subscribe(val => {
                        this.SubscriptionMethods[attrKey](val)
                    })
                }
            })

            this.processValue()

            requestAnimationFrame(() => {
                this[`ready`] = true
            })
        }
    }

    public setElements() {
        this.$bounceZ = this.shadowRoot.querySelector(`.input-field-input-container effect-bounce-z`)
        this.$clearButton = this.shadowRoot.querySelector(`.input-field-clear`)
        this.$container = this.shadowRoot.querySelector(`.input-field-container-inner`)
        this.$count = this.shadowRoot.querySelector(`.input-field-character-count`)
        this.$error = this.shadowRoot.querySelector(`.input-field-message-error`)
        this.$help = this.shadowRoot.querySelector(`.input-field-message-help`)
        this.$icon = this.shadowRoot.querySelector(`.input-field-icon`)
        this.$inputContainer = this.shadowRoot.querySelector(`.input-field-input-container-inner`)
        this.$label = this.shadowRoot.querySelector(`.input-field-container-inner label`)
        this.$max = this.shadowRoot.querySelector(`.input-field-character-count-max`)
        this.$options = this.shadowRoot.querySelector(`overlay-content`)
        this.$ripple = this.shadowRoot.querySelector(`.input-field-input-container effect-ripple`)
        this.$underline = this.shadowRoot.querySelector(`.input-field-input-container effect-underline`)

        this.$clearButton.addEventListener(`click`, this.clearInput)
    }

    public setEffects() {
        requestAnimationFrame(() => {
            this.$bounceZ[`targets`] = [this.shadowRoot.querySelector(`.input-field-input-container`)]
            this.$options[`targets`] = this.$ripple[`targets`] = this.$underline[`targets`] = [this.$input]
            this.$options[`target`] = this.$input
        })
    }

    public addRemoveInputAttr(input, attr) {

        if (attr === `class`) {
            return input.className = `input-field-input`
        }

        if (attr === `type`) {
            if (this[`inputType`] === `textarea`) { return }

            if ([`radio`, `checkbox`, `password`].indexOf(this[`inputType`]) > -1) {
                return input.setAttribute(attr, this[`inputType`])
            }

            return input.setAttribute(attr, `text`)
        }

        if (attr === `value`) {

            if (this[`type`] === `select`) {
                const selected = this.selected
                input.value = selected.label
                input[`selectedValue`] = selected.value
                return this.processValue()
            }

            return input.setAttribute(attr, this.Value)
        }

        if (!!this[attr]) {
            input.setAttribute(attr, this[attr])
        } else {
            input.removeAttribute(attr)
        }
    }

    public setInputAttrs(input) {
        const attrs = [`radio`, `checkbox`].indexOf(this[`inputType`]) > -1
            ? InputFieldInputAttributes.bool
            : InputFieldInputAttributes.all

        attrs.forEach(attr => this.addRemoveInputAttr(input, attr))
    }

    public setInput() {
        if (!this.$inputContainer) { return }

        if (this.$input && this.$input.tagName.toLowerCase() === this.tag && this[`type`] !== `rotary`) {
            return this.setInputAttrs(this.$input)
        }

        this.$inputContainer.innerHTML = ``

        const input = document.createElement(this.tag)

        if (this[`type`] === `rotary`) {
            const rotary = document.createElement(`rotary-list`) as any
            rotary.setAttribute(`lines`, `3`)
            rotary[`options`] = this[`options`]
            rotary[`value`] = this[`value`]
            this.$inputContainer.appendChild(rotary)

            input.addEventListener(`keydown`, e => {
                if (e.which === 38) {
                    e.preventDefault()
                    rotary.previous()
                } else if (e.which === 40) {
                    e.preventDefault()
                    rotary.next()
                } else if (e.which === 39 || e.which === 9) {
                    e.preventDefault()
                    input.value = rotary.value
                }
            })

            rotary.addEventListener(`valuechange`, e => {
                this.$input.value = e.detail
            })
        }

        this.setInputAttrs(input)
        this.$inputContainer.appendChild(input)
        this.setOptions()
        this.setEffects()

        input.addEventListener(`input`, this.onInput)
        input.addEventListener(`focus`, this.onFocus)
        input.addEventListener(`blur`, this.onBlur)
    }

    public setOptions() {
        this.$options.innerHTML = ``

        const options = this[`options`]

        if (!options || !options.length) {
            return
        }

        const createOption = option => {
            const input = this.$input
            const optionElement = document.createElement(`div`)
            optionElement.className = `input-field-option${!!option.class ? ` ${option.class}` : ``}`
            optionElement[`value`] = option.value
            optionElement.innerHTML = ValidateHtml(option.label, [], [`script`]).sanitized || ``
            this.$options.appendChild(optionElement)

            optionElement.addEventListener(`mousedown`, () => {
                input.value = ValidateHtml(option.label, [], [`script`]).sanitized
                input[`selectedValue`] = option.value
                this.processValue()
            })

            if (this.selected.value === option.value) {
                optionElement.click()
            }
        }

        if (this[`emptySelect`] !== false) {
            createOption({
                value: ``,
                label: this[`emptySelect`],
                class: 'blank'
            })
        }

        options.forEach(option => createOption(option))
    }

    public setLabel() {
        const removeLabels = () => {
            if (this.$label && this.$label.parentNode) {
                this.$label.parentNode.removeChild(this.$label)
                removeLabels()
            }
        }

        removeLabels()

        const labelContainer = this.$labelContainer

        if (labelContainer) {
            labelContainer.innerHTML = ``
            const label = document.createElement(`label`)
            label.className = `input-field-${this[`labelposition`]}-label`
            label.innerHTML = ValidateHtml(this[`label`], [], [`script`]).sanitized || ``
            label.addEventListener(`click`, this.onLabelClick)
            labelContainer.appendChild(label)
        }

        this.$label = labelContainer.querySelector(`label`)
    }

    public setCount() {
        if (!this.$count) { return }
        this.$count.innerHTML = ``
        this.$count.textContent = this[`count`] || ``
    }

    public setMax(value) {
        if (!this.$max) { return }
        this.$max.innerHTML = ``
        this.$max.textContent = value || ``
    }

    public setIcon() {
        if (!this.$icon) { return }
        this.$icon[`type`] = this[`icon`]
    }

    public setClearButton() {
        if (!this.$clearButton) { return }
        this.$clearButton[`type`] = this[`clearbutton`]
    }

    public dispatch(type, data?) {
        const event = new CustomEvent(type, { detail: data || this.state })
        this.dispatchEvent(event)
    }

    public onInput() {
        this.processValue()
        this.dispatch(`input`)
    }

    public onFocus() {
        cancelAnimationFrame(this.focusTimer)

        this[`focused`] = true
        this.processValue()

        if (this[`type`] === `select`) {
            this.$input.value = ``
            this.$options[`show`]()
        }

        this.dispatch(`focus`)

        this.checkVisibility(this.$input as any)
    }

    public onBlur() {
        cancelAnimationFrame(this.focusTimer)

        if (this[`type`] === `select`) {
            this.$input.value = this.selected.label || ``
        }

        if (this[`type`] === `rotary` && !!this.$input.value) {
            const rotary = this.$inputContainer.querySelector(`rotary-list`) as any

            if (rotary) {
                this.$input.value = rotary.filteredOptions.length ? rotary.value : ``
            }
        }

        this[`focused`] = false
        this.processValue()
        this.dispatch(`blur`)
        this.$options[`hide`]()
    }

    public onLabelClick() {
        if (!this.$input) { return }
        this.$input.focus()
        this.dispatch(`labelClick`)
    }

    public clearInput() {
        if (!this.$input) { return }
        this.$input.value = null
        this.processValue()
    }

    /** TODO MOVE TO OVERLAY COMPONENT */
    public checkVisibility(input: HTMLInputElement) {
        cancelAnimationFrame(this.focusTimer)

        this.focusTimer = requestAnimationFrame(() => {
            const inputBox = input.getBoundingClientRect()

            if (inputBox.top - 10 > window.innerHeight || inputBox.bottom + 10 < 0) {
                return input.blur()
            }

            this.checkVisibility(input)
        })
    }

    public updateContainerClasses() {
        clearTimeout(this.containerClassesTimer)

        this.containerClassesTimer = setTimeout(() => {
            this[`containerClasses`] = {
                clearbutton: !!this[`clearbutton`],
                disabled: !!this[`disabled`],
                focused: !!this[`focused`],
                icon: !!this[`icon`],
                invalid: !!this[`invalid`],
                notempty: !!this[`notempty`],
                ready: !!this[`ready`],
                showcount: !!this[`showcount`],
                max: !!this[`max`],
                maxlength: !!this[`maxlength`]
            }
        }, 33)
    }

    public processValue() {
        cancelAnimationFrame(this.processTimer)

        this.processTimer = requestAnimationFrame(() => {
            const input = this.$input

            if (!input) { return }

            const parsed = this[`type`] !== `select` ? InputFieldParseValue(getValue(input), this[`type`]) : this.selected.value

            this[`processedValue`] =
                isEmpty(parsed)
                    ? InputFieldValueNull()
                    : InputFieldSanitizeValue(
                        parsed,
                        this[`type`],
                        this[`allowhtml`],
                        this[`disallowhtml`]
                    )
        })
    }
}

if (!window.customElements.get(`input-field`)) {
    window.customElements.define(`input-field`, InputField);
}



/** TODO ============
 * TODO - TIME component
 * TODO - CAL nav component
 * TODO - MULTI INPUT
 * TODO - TIME = multi in input, time in dropdown
 * TODO - TIMERANGE = multi in input, time in dropdown
 * TODO - DATE = multi in input, cal in dropdown
 * TODO - DATERANGE = multi in input, cal in dropdown
 * TODO - DATE TIME = multi in input, cal and time in dropdown
 * TODO - DATERANGE TIME = multi in input, cal and time in dropdown
 * TODO - DATE TIMERANGE = multi in input, cal and time in dropdown
 * TODO - DATERANGE TIMERANGE = multi in input, cal and time in dropdown
 *
 * DROPDOWN
 *  TODO - check if bottom will fit
 *  TODO - if not switch to top
 *  TODO - filter options by typing

 * COLOR PICKER
 *
 * validate
 *  - date
 *      - full date
 *      - time
 *      - year
 *      - month
 *      - week
 *  - color
 *  - url
 *  - telephone
 *  - bool
 *
 * themes
 *  - lifted
 *  - background color
 *  - border color
 *  - icon color
 *  - error color
 *  - error size
 *  - fx color
 *  - help color
 *  - help size
 *
 * different types
 *  - confirmpassword
 *  - time
 *  - date
 *  - color
 */
