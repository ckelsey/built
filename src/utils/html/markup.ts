import { ValidateHtml } from '../validate'
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

export const setStyleRules = (styleElement, ruleString) => {
    if (!styleElement || !ruleString || ruleString === `undefined` || ruleString === `null`) { return }

    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = `${!!styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : ``}${ruleString}`
    } else {                // the world
        styleElement.innerHTML = ``
        var tt1 = document.createTextNode(ruleString)
        styleElement.appendChild(tt1)
    }
}