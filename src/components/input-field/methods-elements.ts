import { elementSelectors } from './elements'
import { InputFieldInputAttributes } from './definitions'
import { isMobile } from '../../utils/platform'
import { ValidateHtml } from '../../utils/validate'
import { setSelectInputValue } from './methods-select';

const tagType = type =>
    type === `textarea`
        ? `textarea`
        : type === `select` && isMobile
            ? `select`
            : `input`

const getInputType = (tag, type) => {
    if (tag === `input`) {
        switch (type) {
            case `number`:
            case `password`:
            case `checkbox`:
            case `radio`:
            case `email`:
            case `tel`:
            case `date`:
                return type
        }

        return `text`
    }

    return false
}

export const createInput = (type, container) => {
    if (!container) { return }

    const tag = tagType(type)
    const input = document.createElement(tag)

    input.className = elementSelectors.input.split(`.`).join(``)

    const typeAttribute = getInputType(tag, type)
    if (typeAttribute) { input.setAttribute(`type`, typeAttribute) }

    container.innerHTML = ``
    container.appendChild(input)
    return input
}

export const setClearButton = host => iconPath => {
    host.elements.clearButton.type = iconPath
}

export const setCount = host => count => {
    if (!host.elements.$count) { return }
    host.elements.count.innerHTML = ``
    host.elements.count.textContent = count || ``
}

export const setEffects = host => () => {
    requestAnimationFrame(() => {
        if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
            host.elements.ripple[`targets`] = host.elements.underline[`targets`] = host.elements.options[`targets`] = []
            host.elements.bounceZ[`targets`] = [host.elements.inputContainer]
        } else {
            host.elements.bounceZ[`targets`] = [host.shadowRoot.querySelector(`.input-field-input-container`)]
            host.elements.options[`targets`] = host.elements.ripple[`targets`] = host.elements.underline[`targets`] = [host.elements.input]
            host.elements.options[`target`] = host.elements.input
        }
    })
}

export const setInputID = host => () => {
    host.setInputAttributes()

    if (!host.elements.label) { return }

    host.elements.label.id = host.inputID
    host.elements.label.setAttribute(`for`, `${host.inputID}-input`)
}

const setInputValue = (input, host) => {
    if (!isMobile && host.type === `select` && host.options) {
        setSelectInputValue(input, host)
    }

    input.setAttribute(`value`, host.processedValue.original)
}

const addRemoveInputAttr = (input, attr, host) => {
    if (!input) { return }

    if (attr === `value`) {
        return setInputValue(input, host)
    }

    const arias = [`disabled`, `required`]

    if (!!host[attr]) {
        if (arias.indexOf(attr) > -1) {
            host.elements.input.setAttribute(`aria-${attr}`, host[attr])
        }

        input.setAttribute(attr, host[attr])
    } else {
        if (arias.indexOf(attr) > -1) {
            host.elements.input.removeAttribute(`aria-${attr}`)
        }

        input.removeAttribute(attr)
    }
}

export const setIcon = host => () => {
    if (!host.elements.icon) { return }
    host.elements.icon.type = host.icon
}

export const setInputAttributes = host => () => {
    if (!host.elements.input) { return }

    const attrs = [`radio`, `checkbox`].indexOf(this[`inputType`]) > -1
        ? InputFieldInputAttributes.bool
        : InputFieldInputAttributes.all

    attrs.forEach(attr => addRemoveInputAttr(host.elements.input, attr, host))

    // Accessibility
    host.elements.input.id = `${host.inputID}-input`
    host.elements.input.setAttribute(`aria-labelledby`, host.inputID)
    const descBy = `${host.inputID}-help`
    host.elements.help.id = descBy
    host.elements.input.setAttribute(`aria-describedby`, descBy)
}

export const setLabel = host => () => {
    if (!host.labelContainer) { return }

    const label = document.createElement(`label`)
    label.id = host.inputID
    label.tabIndex = -1
    label.setAttribute(`for`, `${host.inputID}-input`)
    label.className = `input-field-${host.labelposition}-label`
    label.innerHTML = ValidateHtml(host.label, [], [`script`]).sanitized || ``
    host.labelContainer.appendChild(label)
    host.elements.label = label
}

export const setMax = host => value => {
    if (!host.elements.max) { return }
    host.elements.max.innerHTML = ``
    host.elements.max.textContent = value || ``
}

export const textareaHeight = (resize, input) => {
    if (input.tagName.toLowerCase() !== `textarea` || resize !== `auto`) {
        return
    }

    input.style.overflow = `hidden`
    input.style.height = `inherit`
    input.style.height = `${input.scrollHeight}px`
}