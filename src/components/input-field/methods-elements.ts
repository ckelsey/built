import { elementSelectors } from './elements'
import { InputFieldInputAttributes } from './definitions'
import { isMobile } from '../../utils/platform'
import { ValidateHtml } from '../../utils/validate'
import { setSelectInputValue } from './methods-select'

const tagType = type =>
    type === `textarea`
        ? `textarea`
        : type === `select` && isMobile
            ? `select`
            : `input`

const getInputType = (tag, type) => {
    if (tag === `input`) {
        switch (type) {
            case `checkbox`:
            case `date`:
            case `email`:
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

const setInputValue = (input, host) => {
    if (!isMobile && host.type === `select` && host.options) {
        return setSelectInputValue(input, host)
    }

    setAttribute(input, `value`, host.processedValue.original)

    return input
}

const addRemoveInputAttr = (input, attr, value) => {
    if (!input) { return }

    if (attr === `value`) {
        return setInputValue(input, value)
    }

    const arias = [`disabled`, `required`]

    if (arias.indexOf(attr) > -1) {
        setAttribute(input, `aria-${attr}`, value)
    }

    setAttribute(input, attr, value)

    return input
}

export const createInput = type => {
    const tag = tagType(type)
    const input = document.createElement(tag)
    const typeAttribute = getInputType(tag, type)

    input.className = elementSelectors.input.split(`.`).join(``)

    if (typeAttribute) { input.setAttribute(`type`, typeAttribute) }

    return input
}

export const replaceElementContents = (element, contents) => {
    const respond = () => ({ element, contents })

    if (!element) { return respond() }
    element.innerHTML = ``

    if (typeof contents === `string`) {
        element.innerHTML = contents
        return respond()
    }

    if (!Array.isArray(contents)) { return respond() }
    contents.forEach(content => element.appendChild(content))

    return respond()
}

export const findIn = (parent, selector, all = false) => !parent
    ? undefined
    : parent[all ? `querySelectorAll` : `querySelector`](selector)

export const setAttribute = (element, name, value) => {
    if (!element || !name) { return element }

    const set = (n, v) => !!v ? element.setAttribute(n, v) : element.removeAttribute(n)

    if (Array.isArray(name)) {
        name.forEach((n, i) => set(n, value[i]))
    } else {
        set(name, value)
    }

    return element
}

export const setEffects = host => {
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

export const setInputID = (host, value) => {
    setAttribute(host.elements.label, [`id`, `for`], [value, `${value}-input`])
    setAttribute(host.elements.help, `id`, `${value}-help`)
    setInputAttribute(host, [`id`, `aria-labelledby`, `aria-describedby`], [`${value}-input`, value, `${value}-help`])
}

export const setInputAttribute = (host, name, value) => {
    const input = host.elements.input
    const attrs = [`radio`, `checkbox`].indexOf(host.inputType) > -1
        ? InputFieldInputAttributes.bool
        : InputFieldInputAttributes.all

    const updateAttr = (n, v) => attrs.indexOf(n) === -1 ? undefined : addRemoveInputAttr(input, n, v)

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