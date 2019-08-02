import { inputTypes, isAutoFilled } from '../../utils/html'
import { ValidateHtml } from '../../utils/validate'
import { InputFieldFormatValue, InputFieldTextareaHeight, isEmpty } from './methods'

export const InputFieldSubscriptionMethods = that => {
    return {
        autocomplete: value => {
            if (value && value === `true`) {
                let key = `type`

                if (that[`name`]) { key = `name` }

                that.autocompleteSource = key
                that[`autocomplete`] = that[key]
                return
            }

            if (inputTypes.indexOf(value) === -1) {
                that.autocompleteSource = `self`
            }
        },
        class: val => !val ? undefined : that.shadowRoot.querySelector(`.input-field-container`).classList.add(val.split(` `)),
        clearbutton: () => {
            that.setClearButton()
            that.updateContainerClasses()
        },

        containerClasses: val => !that.$container ? undefined : Object.keys(val).forEach(clss => val[clss]
            ? that.$container.classList.add(clss)
            : that.$container.classList.remove(clss)),

        disabled: () => that.updateContainerClasses(),

        errortext: () => {
            if (!that.$error) { return }
            that.$error.innerHTML = ValidateHtml(that[`errortext`], [], [`script`]).sanitized || ``
        },

        focused: () => that.updateContainerClasses(),

        helptext: () => {
            if (!that.$help) { return }
            that.$help.innerHTML = ValidateHtml(that[`helptext`], [], [`script`]).sanitized || ``
        },

        icon: () => {
            that.setIcon()
            that.updateContainerClasses()
        },

        iconalign: value => {
            if (!that.$container) { return }
            that.$container.setAttribute(`icon-align`, value)
        },

        inputType: () => {
            that.setInput()
        },

        invalid: value => {
            const errortext = that[`errortext`]

            if (!value) {
                that.setAttribute(`valid`, `true`)
                that[`errortext`] = errortext
            } else {
                that.removeAttribute(`valid`)

                if (!errortext) {
                    that[`errortext`] = that.processedErrorText
                }
            }

            that.updateContainerClasses()
        },

        label: () => that.setLabel(),

        labelposition: value => {
            if (!that.$container) { return }

            that.setLabel()
            that.$container.setAttribute(`label-position`, value)
        },

        max: value => {
            that.setMax(value)
            that.updateContainerClasses()
        },

        maxlength: value => {
            that.setMax(value)
            that.updateContainerClasses()
        },

        name: () => that[`autocomplete`] && that.autocompleteSource === `name`
            ? that[`autocomplete`] = `true`
            : undefined,

        notempty: value => {
            that.setAttribute(`has-value`, `${value}`)
            that.updateContainerClasses()
        },

        options: () => that.setOptions(),

        processedValue: value => {
            if (!value) { return }

            const input = that.$input

            if (!input) { return }

            that.processedErrorText = value && value.reason ? value.reason.join(`, `) : ``
            const inputType = that[`type`]

            that[`count`] = inputType === `number` ? value.sanitized : value.sanitized ? value.sanitized.length : 0

            const valid = value.valid
            const autofilled = isAutoFilled(input)
            const stringEmpty = (isNaN(value.original) || typeof value.original === `string`) && !value.original.length
            const empty = stringEmpty && !autofilled
            const formattedValue = InputFieldFormatValue(value.sanitized, that[`format`] || that[`mask`])

            if (!!that[`format`]) {
                input.value = formattedValue
                that[`value`] = formattedValue
            } else if (inputType !== `select`) {
                input.value = formattedValue
                that[`value`] = value.sanitized
            } else {
                input[`selectedValue`] = value.sanitized
                const filter = that.selectFilter.toLowerCase()
                const options = that.$optionElements
                const emptyFilter = isEmpty(filter)
                const selected = that.selected.label
                const filtering = filter !== (selected && typeof selected === `string` ? selected.toLowerCase() : ``)

                options.forEach(o => {
                    const label = o.textContent.toLowerCase()
                    const val = o.value

                    if (!emptyFilter && filtering) {
                        if (label === filter || label.indexOf(filter) > -1) {
                            o.classList.remove('filtered-out')
                        } else {
                            o.classList.add('filtered-out')
                        }
                    } else {
                        o.classList.remove('filtered-out')
                    }

                    if (val === value.sanitized) {
                        o.classList.add('selected')
                    } else {
                        o.classList.remove('selected')
                    }
                })
            }

            InputFieldTextareaHeight(that[`resize`], input)

            that[`notempty`] = !empty

            if (that[`type`] === `rotary`) {
                requestAnimationFrame(() => {
                    const rotary = that.$inputContainer.querySelector(`rotary-list`)
                    rotary[`filter`] = that[`processedValue`].sanitized
                })
            }

            if (valid) {
                that[`invalid`] = false
                return
            }

            if (empty) {
                that[`invalid`] = false
                return
            }

            if (!that[`focused`]) {
                that[`invalid`] = true
                return
            }
        },

        ready: () => that.updateContainerClasses(),

        resize: value => {
            if (!that.$container) { return }
            that.$container.setAttribute(`resize`, value)
        },

        showcount: () => that.updateContainerClasses(),

        type: type => {
            if (!that.$input) { return }

            that.$container.setAttribute(`input-kind`, type)

            if (that[`autocomplete`] && that.autocompleteSource === `type`) {
                that[`autocomplete`] = `true`
            }

            const typeLiterals = [`select`, `textarea`, `checkbox`, `radio`, `password`]
            const newInputType = typeLiterals.indexOf(type) > -1
                ? type
                : `input`

            if (newInputType !== that[`inputType`]) {
                that[`inputType`] = newInputType
            }

            that.addRemoveInputAttr(that.$input, `type`)
        },
    }
}
