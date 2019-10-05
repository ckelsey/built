import ValidateHtml from '../validate/html'
import ObserveEvent from '../observeEvent'

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

export const setOptions = (input, options, emptySelect, optionTag = `option`) => {
    if (!input || !options) { return }

    const optionElements = []

    const createOption = option => {
        const optionElement = document.createElement(optionTag)
        optionElement.className = `select-option${!!option.class ? ` ${option.class}` : ``}`
        optionElement[`value`] = option.value
        optionElement.innerHTML = ValidateHtml(option.label, [], [`script`]).sanitized || ``
        optionElements.push(optionElement)
    }

    if (emptySelect !== false) {
        createOption({
            value: ``,
            label: emptySelect,
            class: 'blank'
        })
    }

    options.forEach(option => createOption(option))

    replaceElementContents(input, optionElements)

    if (optionTag !== `option`) {
        optionElements.forEach(optionElement => {
            ObserveEvent(optionElement, `mousedown`).subscribe(() => {
                optionElements.forEach(o => o.classList.remove(`selected`))
                optionElement.classList.add(`selected`)
                input.value = optionElement.value
                input.dispatchEvent(new Event(`input`))
            })
        })
    }

    return {
        input,
        options,
        optionElements
    }
}