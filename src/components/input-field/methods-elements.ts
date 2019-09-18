import { elementSelectors } from './elements'
import { InputFieldInputAttributes } from './definitions'
import { ValidateHtml } from '../../utils/validate'
import { setAttribute, addRemoveAttr } from '../../utils/html/attr'
import { replaceElementContents } from '../../utils/html/markup'
import { findIn } from '../../utils/html/query'
import ObserveEvent from '../../utils/observeEvent'

const tagType = type =>
    type === `textarea`
        ? `textarea`
        // : type === `select`
        //     ? `dropdown-select`
        : `input`

const getInputType = (tag, type) => {
    if (tag === `input`) {
        switch (type) {
            case `checkbox`:
            case `date`:
            case `email`:
            case `file`:
            case `number`:
            case `password`:
            case `radio`:
            case `tel`:
            case `url`:
                return type
        }

        return `text`
    }

    return false
}

export const setInputValue = (input, host) => {
    setAttribute(input, `value`, host.processedValue.original)
    return input
}

export const isMultiInput = host => Array.isArray(host.type)

export const setInput = host => {
    const inputContainer = host.elements.inputContainer

    if (!inputContainer) { return }

    const currentInput = host.elements.input

    if (currentInput && typeof currentInput.dispose === `function`) {
        currentInput.dispose()
    }

    if (host.type && Array.isArray(host.type) && host.type.length) {
        const container = document.createElement(`div`) as any
        container.className = `${elementSelectors.input.split(`.`).join(``)} multi-input`
        container.inputElements = []
        container.focusedElement = null
        container.tabIndex = -1

        /**
         type: {
            type: string,
            options: any,
            emptyoption: any,
            formatlabel: function,
            formatvalue: function,
            formatvaluelabel: function,
            pattern: string,
            styles: string
         }
         */

        host.type.forEach(type => {
            const input = (type.type === `span` ? document.createElement(`span`) : createInput(type.type)) as any
            input.className = `input-field-input-input`
            container.appendChild(input)

            if (type.type !== `span`) {
                Object.keys(type).forEach(key => { if (key !== `type`) { input[key] = type[key] } })

                container.inputElements.push(input)

                input.eventSubscriptions = {
                    input: ObserveEvent(input, `input`)
                        .subscribe(() => container.dispatchEvent(new Event(`input`))),
                    focus: ObserveEvent(input, `focus`)
                        .subscribe(() => {
                            if (!container.focusedElement) {
                                container.dispatchEvent(new Event(`focus`))
                            }
                            container.focusedElement = input
                        }),
                    blur: ObserveEvent(input, `blur`)
                        .subscribe(() => {
                            if (container.focusedElement === input) {
                                container.focusedElement = null
                                container.dispatchEvent(new Event(`blur`))
                            }
                        }),
                }
            }
        })

        if (!!host.value && Array.isArray(host.value)) {
            container.inputElements.forEach((input, index) => {
                input.value = !!host.value[index] ? host.value[index] : ``
            })
        }

        Object.defineProperty(container, `value`, {
            get() {
                return this.inputElements.map(i => !!i.value ? i.value : ``)
            },
            set(values) {
                this.inputElements.forEach((inp, i) => inp.value = !!values[i] ? values[i] : ``)
            }
        })

        host.elements.input = container

        container.dispose = () => {
            container.inputElements.forEach(innerInput =>
                Object.keys(innerInput.eventSubscriptions)
                    .forEach(key => innerInput.eventSubscriptions[key]())
            )
        }

        inputContainer.appendChild(container)

        return
    }

    host.elements.input = replaceElementContents(
        findIn(
            setAttribute(
                host.elements.container,
                `input-kind`,
                host.type
            ),
            elementSelectors.inputContainer
        ),
        [createInput(host.type)]
    ).contents[0]
}

export const createInput = type => {
    const tag = tagType(type)
    const input = document.createElement(tag)
    const typeAttribute = getInputType(tag, type)

    input.className = elementSelectors.input.split(`.`).join(``)

    if (typeAttribute) { input.setAttribute(`type`, typeAttribute) }

    return input
}

export const setEffects = host => {
    if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
        host.elements.bounceZ[`targets`] = [host.elements.inputContainerOuter]
    } else {
        host.elements.bounceZ[`targets`] = [host.elements.inputContainerOuter]
        host.elements.ripple[`targets`] = host.elements.underline[`targets`] = [host.elements.input]
    }
}

export const setInputID = (host, value) => {
    setAttribute(host.elements.label, [`id`, `for`], [value, `${value}-input`])
    setAttribute(host.elements.help, `id`, `${value}-help`)
    setInputAttribute(host, [`id`, `aria-labelledby`, `aria-describedby`], [`${value}-input`, value, `${value}-help`])
}

export const inputAttributeList = host => [`radio`, `checkbox`].indexOf(host.inputType) > -1
    ? InputFieldInputAttributes.bool
    : InputFieldInputAttributes.all

export const setInputAttribute = (host, name, value) => {
    const input = host.elements.input
    const attrs = inputAttributeList(host)
    const updateAttr = (n, v) => attrs.indexOf(n) === -1
        ? undefined
        : name === `value`
            ? setInputValue(input, host)
            : addRemoveAttr(input, n, v)

    if (Array.isArray(name)) {
        name.forEach((n, i) => updateAttr(n, value[i]))
    } else {
        updateAttr(name, value)
    }
}

export const setLabel = (value, labelposition, host) => {
    const labs = replaceElementContents(
        host.labelContainer,
        [
            setAttribute(
                replaceElementContents(
                    document.createElement(`label`),
                    ValidateHtml(value, [], [`script`]).sanitized || ``
                ).element,
                [`id`, `tabIndex`, `for`, `class`],
                [host.inputID, -1, `${host.inputID}-input`, `input-field-${labelposition}-label`]
            )
        ]
    ).contents[0]

    host.elements.label = labs
}

export const textareaHeight = (resize, input) => {
    if (input.tagName.toLowerCase() !== `textarea` || resize !== `auto`) {
        return
    }

    input.style.overflow = `hidden`
    input.style.height = `inherit`
    input.style.height = `${input.scrollHeight}px`
}